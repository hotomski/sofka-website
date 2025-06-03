// filepath: /Users/sofka/Documents/sofka-website/scripts/indexContent.js
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");
const pdfParse = require("pdf-parse"); // Import pdf-parse for PDF text extraction
const { Console } = require("console");

// Define the pages to scrape
const pages = [
  { name: "home", url: "http://localhost:3000" },
  { name: "cv", url: "http://localhost:3000/cv" },
  { name: "work", url: "http://localhost:3000/work" },
  { name: "life", url: "http://localhost:3000/life" },
];

async function fetchContent() {
  const content = {};

  // Fetch content from web pages
  for (const page of pages) {
    try {
      const response = await axios.get(page.url);
      const $ = cheerio.load(response.data);

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
    const pdfPath = path.join(process.cwd(), "../public/cv.pdf"); // Path to the CV PDF
    const pdfData = fs.readFileSync(pdfPath); // Read the PDF file
    const pdfText = await pdfParse(pdfData); // Extract text from the PDF

    content["cv_pdf"] = pdfText.text.replace(/\s+/g, " ").trim(); // Clean up the extracted text
  } catch (error) {
    console.error("Failed to extract text from CV PDF:", error.message);
  }

  // Save the cleaned content to content.json
  fs.writeFileSync("content.json", JSON.stringify(content, null, 2));
  console.log("Content indexed and saved to content.json");
}

fetchContent();