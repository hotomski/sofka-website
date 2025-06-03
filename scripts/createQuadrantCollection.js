import { QdrantClient } from "@qdrant/js-client-rest";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
console.log("qdrant apiKey after config:", process.env.QDRANT_API_KEY);

// Initialize Qdrant client
const qdrant = new QdrantClient({
  url: "https://f94c63a9-ccd0-4900-9a50-8f4a609592b3.eu-central-1-0.aws.cloud.qdrant.io:6333", // Replace with your Qdrant Cloud URL if using the cloud
  apiKey: process.env.QDRANT_API_KEY, // Add this to your .env if using Qdrant Cloud
});

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: "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",
  });

async function createCollection() {
  try {
    await qdrant.createCollection("sofka-website", {
      vectors: {
        size: 1536, // Dimension of OpenAI embeddings
        distance: "Cosine", // Similarity metric
      },
    });
    console.log("Collection 'sofka-website' created successfully.");
  } catch (error) {
    console.error("Error creating collection:", error);
  }
}

createCollection();