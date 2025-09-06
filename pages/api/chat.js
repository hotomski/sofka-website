import OpenAI from "openai";
import { QdrantClient } from "@qdrant/js-client-rest";
import { Client as ElasticsearchClient } from "@elastic/elasticsearch";

import dotenv from "dotenv";
dotenv.config();

// 🚫 Don't print full keys to logs
const mask = (v) => (v ? `${v.slice(0, 6)}…${v.slice(-4)}` : "(empty)");
console.log("OPENAI_API_KEY present?", !!process.env.OPENAI_API_KEY, mask(process.env.OPENAI_API_KEY || ""));

const userQuestionCounts = {};

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: (process.env.OPENAI_API_KEY || "").trim(),
});

/// Initialize Qdrant client
const qdrant = new QdrantClient({
  url: "https://f94c63a9-ccd0-4900-9a50-8f4a609592b3.eu-central-1-0.aws.cloud.qdrant.io:6333",
  apiKey: process.env.QDRANT_API_KEY,
});

// Initialize Elasticsearch client
const esClient = new ElasticsearchClient({
  node: process.env.ELASTICSEARCH_URL || "https://07df9a32f08e40eb9412b55933b695fa.westeurope.azure.elastic-cloud.com:443",
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME || "elastic",
    // ⚠️ Move this password to ENV if you haven’t already
    password: (process.env.ELASTICSEARCH_PASSWORD || "Nt9ArBl2ltdnZce7DfeeCUUW").trim(),
  },
});

export default async function handler(req, res) {
  // Basic env guardrails
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "OPENAI_API_KEY missing on server." });
  }

  // Simple in-memory rate limit (per-IP-per-day)
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    "unknown";
  const today = new Date().toISOString().slice(0, 10);
  const userKey = `${ip}_${today}`;

  userQuestionCounts[userKey] = userQuestionCounts[userKey] || 0;
  if (userQuestionCounts[userKey] >= 20) {
    return res.status(429).json({
      answer:
        "Sorry folks, I'm not that rich. :) You reached your daily question limit (20 per day). You can ask more questions tomorrow!",
    });
  }
  userQuestionCounts[userKey]++;

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { question, userName: rawUserName } = req.body || {};
  const userName = (rawUserName || "Sofija").trim();

  if (!question || typeof question !== "string") {
    return res.status(400).json({ error: "Missing 'question' in request body." });
  }

  console.log("Received question:", question);

  try {
    // 1) Embed the question (use current model)
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: question,
    });
    const questionEmbedding = embeddingResponse.data[0].embedding;

    // 2) Query Qdrant for relevant context
    const queryResponse = await qdrant.search("sofka-website", {
      vector: questionEmbedding,
      limit: 5,
    });

    const relevantContent = (queryResponse || [])
      .map((match) => match?.payload?.content || "")
      .filter(Boolean)
      .join("\n");

    // 3) Build prompts to force name usage and avoid “the person”
    const systemPrompt = `
You are a helpful assistant for Sofija's website.
The user's name is ${userName}. Always address the user directly as "${userName}".
Never refer to them as "the person" or "the user". If source text contains such phrasing, rewrite it using the name "${userName}".
Be warm and concise unless asked for more detail.
`.trim();

    const userPrompt = `
Answer the question using ONLY the content below.
When referring to the asker, use the name "${userName}" — never "the person" or "the user".

Content:
<<<
${relevantContent || "(no matching context found)"}
>>>

Question: ${question}
`.trim();

    // 4) Chat completion
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const answer =
      completion.choices?.[0]?.message?.content?.trim() ||
      "Sorry, I couldn't generate a response.";

    console.log("Generated answer:", answer);

    // 5) Log to Elasticsearch (best-effort)
    try {
      await esClient.index({
        index: "chat-logs",
        document: {
          timestamp: new Date().toISOString(),
          userName,
          question,
          answer,
        },
      });
    } catch (e) {
      console.warn("Elasticsearch logging failed:", e?.message || e);
    }

    return res.status(200).json({ answer });
  } catch (error) {
    console.error("Error:", error?.message || error);

    // Log error to Elasticsearch
    try {
      await esClient.index({
        index: "chat-logs",
        document: {
          timestamp: new Date().toISOString(),
          question,
          error: error?.message || "Unknown error",
        },
      });
    } catch (e) {
      console.warn("Elasticsearch error logging failed:", e?.message || e);
    }

    return res.status(500).json({ error: "Failed to generate a response." });
  }
}
