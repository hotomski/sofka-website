// filepath: /Users/sofka/Documents/sofka-website/scripts/deleteCollection.js
import { QdrantClient } from "@qdrant/js-client-rest";
import dotenv from "dotenv";

dotenv.config();

// Initialize Qdrant client
const qdrant = new QdrantClient({
  url: "https://f94c63a9-ccd0-4900-9a50-8f4a609592b3.eu-central-1-0.aws.cloud.qdrant.io", // Replace with your Qdrant Cloud URL if using the cloud
  apiKey: process.env.QDRANT_API_KEY, // Add this to your .env if using Qdrant Cloud
  checkCompatibility: false,
});

async function deleteCollection() {
  const collectionName = "sofka-website"; // Replace with your collection name

  try {
    console.log(`Deleting collection: ${collectionName}`);
    await qdrant.deleteCollection(collectionName);
    console.log(`Collection "${collectionName}" deleted successfully.`);
  } catch (error) {
    console.error(`Failed to delete collection "${collectionName}":`, error.message);
  }
}

deleteCollection();