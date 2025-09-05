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
  url: "https://f94c63a9-ccd0-4900-9a50-8f4a609592b3.eu-central-1-0.aws.cloud.qdrant.io", // Replace with your Qdrant Cloud URL if using the cloud
  apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.fsdb4vJwSkPICaeob_bMBpwAoxGaApEpoyQED0CZXJU", // Add this to your .env if using Qdrant Cloud
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