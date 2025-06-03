// filepath: /Users/sofka/Documents/sofka-website/scripts/deleteCollection.js
import { QdrantClient } from "@qdrant/js-client-rest";
import dotenv from "dotenv";

dotenv.config();

// Initialize Qdrant client
const qdrant = new QdrantClient({
  url: "http://localhost:6333", // Replace with your Qdrant Cloud URL if using the cloud
  apiKey: process.env.QDRANT_API_KEY, // Add this to your .env if using Qdrant Cloud
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