// Builds the corpus the digital self answers from.
//
// Crawls the site's own pages and reads the CV out of the PDF, then writes
// content/site-corpus.json. No embeddings, no vector database: the site is
// small enough to hand Claude in full on every question, which means the
// answers can never drift out of date the way a stale index does.
//
//   npm run build-corpus                  # against the dev server
//   SITE_BASE_URL=https://hotomski.com npm run build-corpus
import fs from "node:fs";
import path from "node:path";
import { load } from "cheerio";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const BASE = process.env.SITE_BASE_URL || "http://localhost:3077";

const PAGES = [
  { id: "home", url: "/", title: "Home" },
  { id: "work", url: "/work", title: "Work" },
  { id: "phd", url: "/PhD", title: "PhD project (GuideGen)" },
  { id: "publications", url: "/publications", title: "Publications" },
  { id: "life", url: "/life", title: "Life" },
  { id: "life_family", url: "/life/family", title: "Life — family" },
  { id: "life_friends", url: "/life/friends", title: "Life — friends" },
  { id: "life_gardening", url: "/life/gardening", title: "Life — gardening" },
  { id: "life_music", url: "/life/music", title: "Life — music" },
  { id: "life_photography", url: "/life/photography", title: "Life — photography" },
  { id: "life_sport", url: "/life/sport", title: "Life — sport" },
];

// The header and footer repeat on every page; keeping them would tell the
// model the same nav links eleven times and crowd out the real content.
function pageText(html) {
  const $ = load(html);
  $("script, style, noscript, header, footer, nav").remove();
  return $("body").text().replace(/\s+/g, " ").trim();
}

async function fetchPage(p) {
  const res = await fetch(BASE + p.url, { headers: { "User-Agent": "corpus-builder" } });
  if (!res.ok) throw new Error(`${p.url} -> ${res.status}`);
  return { ...p, text: pageText(await res.text()) };
}

async function cvSection() {
  // The CV page shows images, so its text exists only inside the PDF. Without
  // this the digital self cannot answer a single question about dates, roles
  // or employers.
  const pdfParse = require("pdf-parse");
  const file = path.join(process.cwd(), "public/images/cv/cv.pdf");
  if (!fs.existsSync(file)) return null;
  const parsed = await pdfParse(fs.readFileSync(file));
  return {
    id: "cv",
    url: "/cv",
    title: "CV (full text of the downloadable PDF)",
    text: parsed.text.replace(/\s+/g, " ").trim(),
  };
}

const sections = [];
const failed = [];
for (const p of PAGES) {
  try {
    const s = await fetchPage(p);
    sections.push(s);
    console.log(`  ${p.url.padEnd(22)} ${s.text.length} chars`);
  } catch (err) {
    failed.push(`${p.url} (${err.message})`);
    console.warn(`  ${p.url.padEnd(22)} FAILED — ${err.message}`);
  }
}

// A page that fails to load is not an empty page: writing the corpus anyway
// would quietly delete whole sections of her life from what the digital self
// knows, and the only symptom would be her saying she has nothing about it.
if (failed.length) {
  console.error(`\nRefusing to write the corpus: ${failed.length} page(s) did not load.\n  ${failed.join("\n  ")}\n\nStart the site first (npm run dev -- -p 3077), or point SITE_BASE_URL at the live site.`);
  process.exit(1);
}
const cv = await cvSection();
if (cv) {
  sections.push(cv);
  console.log(`  ${"/cv (pdf)".padEnd(22)} ${cv.text.length} chars`);
}

// Losing sections between builds means something broke upstream, not that she
// deleted half her website.
if (fs.existsSync("content/site-corpus.json")) {
  const before = JSON.parse(fs.readFileSync("content/site-corpus.json", "utf8")).sections?.length ?? 0;
  if (before && sections.length < before) {
    console.error(`\nRefusing to write the corpus: it would drop from ${before} sections to ${sections.length}.`);
    process.exit(1);
  }
}

const out = {
  builtAt: new Date().toISOString(),
  source: BASE,
  sections,
};
fs.writeFileSync("content/site-corpus.json", JSON.stringify(out, null, 1));
const total = sections.reduce((n, s) => n + s.text.length, 0);
console.log(`\nwrote content/site-corpus.json — ${sections.length} sections, ${total} chars (~${Math.round(total / 3.7)} tokens)`);
