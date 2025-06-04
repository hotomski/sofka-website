import OpenAI from "openai";
import { QdrantClient } from "@qdrant/js-client-rest";
import { Client as ElasticsearchClient } from "@elastic/elasticsearch";

//dotenv.config();

const userQuestionCounts = {};

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/// Initialize Qdrant client
const qdrant = new QdrantClient({
  url: "https://f94c63a9-ccd0-4900-9a50-8f4a609592b3.eu-central-1-0.aws.cloud.qdrant.io:6333", // Replace with your Qdrant Cloud URL if using the cloud
  apiKey: process.env.QDRANT_API_KEY, // Add this to your .env if using Qdrant Cloud
});

// Initialize Elasticsearch client
const esClient = new ElasticsearchClient({
  node: process.env.ELASTICSEARCH_URL || "https://07df9a32f08e40eb9412b55933b695fa.westeurope.azure.elastic-cloud.com:443",

  auth: {
    username: process.env.ELASTICSEARCH_USERNAME || "elastic", // Replace with your username
    password: process.env.ELASTICSEARCH_PASSWORD || "Nt9ArBl2ltdnZce7DfeeCUUW", // Replace with your password
  },
});

export default async function handler(req, res) {

    // Get user IP (works for Vercel/Next.js API routes)
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket?.remoteAddress ||
      "unknown";
  
    // Get today's date as a string
    const today = new Date().toISOString().slice(0, 10);
  
    // Create a unique key for this IP and day
    const userKey = `${ip}_${today}`;
  
    // Initialize or increment the count
    userQuestionCounts[userKey] = userQuestionCounts[userKey] || 0;
  
    if (userQuestionCounts[userKey] >= 20) {
      return res
        .status(429)
        .json({ answer: "Sorry folks, I'm not that rich. :) You reached your daily question limit (20 per day). You can ask more questions tomorrow!" });
    }
  
    userQuestionCounts[userKey]++;

  if (req.method === "POST") {
    const { question } = req.body;

    console.log("Received question:", question);

    try {
      // Generate embedding for the user's question
      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: question,
      });

      const questionEmbedding = embeddingResponse.data[0].embedding;
      console.log("Question embedding:", questionEmbedding);

      // Query Qdrant for the most relevant content
      const queryResponse = await qdrant.search("sofka-website", {
        vector: questionEmbedding,
        limit: 5, // Retrieve the top 5 most relevant results
      });

      const relevantContent = queryResponse
        .map((match) => match.payload.content) // Extract content from the payload
        .join("\n");

      console.log("Relevant content:", relevantContent);

      // Use OpenAI to generate a response
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: `Answer the following question based on the content below:\n\n${relevantContent}\n\nQuestion: ${question}` },
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      const answer = response.choices[0].message.content.trim();
      console.log("Generated answer:", answer);
 // Log the question and answer to Elasticsearch
 await esClient.index({
  index: "chat-logs", // Name of the Elasticsearch index
  document: {
    timestamp: new Date().toISOString(), // Add a timestamp
    question: question, // User's question
    answer: answer, // Chatbot's response
  },
});

// Send the response back to the frontend
      res.status(200).json({ answer });
    } catch (error) {
      console.error("Error:", error);

      // Log the error to Elasticsearch
      await esClient.index({
        index: "chat-logs",
        document: {
          timestamp: new Date().toISOString(),
          question: question,
          error: error.message || "Unknown error",
        },
      });

      res.status(500).json({ error: "Failed to generate a response." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}