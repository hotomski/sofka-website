import { readFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import OpenAI from "openai";
import dotenv from "dotenv";
import { QdrantClient } from "@qdrant/js-client-rest";
import { v4 as uuidv4 } from "uuid"; // Import the UUID library

dotenv.config(); // Load environment variables from .env

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: "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",
});

// Initialize Qdrant client
const qdrant = new QdrantClient({
  url: "https://f94c63a9-ccd0-4900-9a50-8f4a609592b3.eu-central-1-0.aws.cloud.qdrant.io:6333", // Replace with your Qdrant Cloud URL if using the cloud
  apiKey: process.env.QDRANT_API_KEY, // Add this to your .env if using Qdrant Cloud
});


async function generateAndStoreEmbeddings() {
  try {
    // Load website content
    const contentPath = join(__dirname, "../scripts/cleaned_content_by_script.json");
    const websiteContent = JSON.parse(readFileSync(contentPath, "utf-8"));

    const points = [];

    for (const [key, value] of Object.entries(websiteContent)) {
      console.log(`Generating embedding for: ${key}`);
      const response = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: value,
      });

      const embedding = response.data[0].embedding;

      // Prepare the point for Qdrant
      points.push({
        id: uuidv4(), // Generate a UUID for the point ID
        vector: embedding,
        payload: { content: value, page: key }, // Store the content and page name as metadata
      });
    }

    // Upsert points into Qdrant
    await qdrant.upsert("sofka-website", { points });
    console.log("All embeddings stored in Qdrant.");
  } catch (error) {
    console.error("Error generating or storing embeddings:", error);
  }
}

generateAndStoreEmbeddings();