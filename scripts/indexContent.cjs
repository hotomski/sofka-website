// filepath: /Users/sofka/Documents/sofka-website/scripts/indexContent.js
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");
const pdfParse = require("pdf-parse"); // Import pdf-parse for PDF text extraction
const { Console } = require("console");

const BASE_URL = process.env.SITE_BASE_URL || "http://localhost:3000";

// Define the pages to scrape — keep this in sync with app/**/page.tsx routes
const pages = [
  { name: "home", url: `${BASE_URL}/` },
  { name: "cv", url: `${BASE_URL}/cv` },
  { name: "work", url: `${BASE_URL}/work` },
  { name: "life", url: `${BASE_URL}/life` },
  { name: "life_family", url: `${BASE_URL}/life/family` },
  { name: "life_friends", url: `${BASE_URL}/life/friends` },
  { name: "life_gardening", url: `${BASE_URL}/life/gardening` },
  { name: "life_sport", url: `${BASE_URL}/life/sport` },
  { name: "life_music", url: `${BASE_URL}/life/music` },
  { name: "life_photography", url: `${BASE_URL}/life/photography` },
  { name: "PhD", url: `${BASE_URL}/PhD` },
  { name: "publications", url: `${BASE_URL}/publications` },
  // Sofija co-founded HoloMost; its mission/product content lives on its own site, not hotomski.com
  { name: "holomost", url: process.env.HOLOMOST_URL || "https://holomost.com" },
];

async function fetchContent() {
  const content = {};

  // Fetch content from web pages
  for (const page of pages) {
    try {
      const response = await axios.get(page.url);
      const $ = cheerio.load(response.data);

      // Drop scripts/styles (Next.js embeds RSC payload JS inside <body>)
      $("script, style, noscript").remove();

      // Extract visible text from the <body> tag
      const text = $("body")
        .text()
        .replace(/\s+/g, " ") // Replace multiple spaces with a single space
        .trim(); // Trim leading and trailing spaces

      content[page.name] = text;
      console.log('Content', text);
    } catch (error) {
      console.error(`Failed to fetch ${page.url}:`, error.message);
    }
  }

  // Extract content from the CV PDF
  try {
    const pdfPath = path.join(__dirname, "../public/images/cv/cv.pdf"); // Path to the CV PDF
    const pdfData = fs.readFileSync(pdfPath); // Read the PDF file
    const pdfText = await pdfParse(pdfData); // Extract text from the PDF

    content["cv_pdf"] = pdfText.text.replace(/\s+/g, " ").trim(); // Clean up the extracted text
  } catch (error) {
    console.error("Failed to extract text from CV PDF:", error.message);
  }

  // Save the scraped content to content.json
  const outputPath = path.join(__dirname, "content.json");
  fs.writeFileSync(outputPath, JSON.stringify(content, null, 2));
  console.log(`Content indexed and saved to ${outputPath}`);
}

fetchContent();