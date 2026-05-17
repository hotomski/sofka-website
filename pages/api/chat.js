import OpenAI from "openai";
import { QdrantClient } from "@qdrant/js-client-rest";
import { PostHog } from "posthog-node";
import { randomUUID } from "crypto";
import dotenv from "dotenv";
dotenv.config();

const userQuestionCounts = {};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const qdrant = new QdrantClient({
  url: "https://f94c63a9-ccd0-4900-9a50-8f4a609592b3.eu-central-1-0.aws.cloud.qdrant.io:6333",
  apiKey: process.env.QDRANT_API_KEY,
});

function getPosthogClient() {
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  if (!token) return null;
  return new PostHog(token, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",
  });
}

export default async function handler(req, res) {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    "unknown";

  const today = new Date().toISOString().slice(0, 10);
  const userKey = `${ip}_${today}`;

  userQuestionCounts[userKey] = userQuestionCounts[userKey] || 0;

  if (userQuestionCounts[userKey] >= 20) {
    return res.status(429).json({
      answer: "Sorry folks, I'm not that rich. :) You reached your daily question limit (20 per day). You can ask more questions tomorrow!",
    });
  }

  userQuestionCounts[userKey]++;

  if (req.method === "GET") {
    try {
      await qdrant.getCollections();
      return res.status(200).json({ status: "Qdrant is awake!" });
    } catch (error) {
      console.error("Qdrant keep-alive error:", error);
      return res.status(500).json({ error: "Failed to wake up Qdrant." });
    }
  }

  if (req.method === "POST") {
    const { question } = req.body;
    console.log("Received question:", question);

    try {
      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: question,
      });

      const questionEmbedding = embeddingResponse.data[0].embedding;

      const queryResponse = await qdrant.search("sofka-website", {
        vector: questionEmbedding,
        limit: 5,
      });

      const relevantContent = queryResponse
        .map((match) => match.payload.content)
        .join("\n");

      const startTime = Date.now();
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: `Answer the following question based on the content below:\n\n${relevantContent}\n\nQuestion: ${question}` },
        ],
        max_tokens: 500,
        temperature: 0.7,
      });
      const latency = (Date.now() - startTime) / 1000;

      const answer = response.choices[0].message.content.trim();
      console.log("Generated answer:", answer);

      // PostHog LLM trace — must complete before res.json() in serverless
      const phToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
      console.log("PostHog token present:", !!phToken);
      try {
        const ph = getPosthogClient();
        if (ph) {
          ph.capture({
            distinctId: ip,
            event: "$ai_generation",
            properties: {
              $ai_trace_id: randomUUID(),
              $ai_provider: "openai",
              $ai_model: "gpt-4",
              $ai_input: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: `Answer the following question based on the content below:\n\n${relevantContent}\n\nQuestion: ${question}` },
              ],
              $ai_output_choices: [{ role: "assistant", content: answer }],
              $ai_input_tokens: response.usage?.prompt_tokens,
              $ai_output_tokens: response.usage?.completion_tokens,
              $ai_latency: latency,
              $ai_stop_reason: response.choices[0].finish_reason,
              question: question,
              answer: answer,
            },
          });
          await ph.shutdown();
          console.log("PostHog event flushed successfully");
        } else {
          console.log("PostHog client is null — token missing");
        }
      } catch (phErr) {
        console.error("PostHog logging error:", phErr);
      }

      res.status(200).json({ answer });

    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to generate a response." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
