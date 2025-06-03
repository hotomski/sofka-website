"use client";

import Link from "next/link";
import Chatbot from "../../components/chatbot";

export default function WorkPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/background_flower.jpg')" }}
    >
      <div className="text-black flex flex-col items-center justify-center px-4 md:px-8 py-16 font-sans max-w-5xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold mt-8 tracking-tight text-center">Work Experience</h1>
        <p className="mt-6 text-base md:text-xl leading-relaxed text-black text-center max-w-2xl">
          Explore my professional journey and achievements.
        </p>

        {/* Subsections */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subsection 1: Industry */}
          <div className="p-6 md:p-8 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Work in industry</h2>
            <p className="text-sm md:text-lg leading-relaxed">
              From global enterprises like Siemens and Schneider Electric to the fast-paced world of a medium-sized startup like ASMIQ, and then back to Siemens again — my career has been a journey across diverse tech ecosystems. Along the way, I’ve built up a unique blend of deep technical know-how, product strategy chops, and cross-functional leadership skills. These roles didn’t just shape the professional I am today — they taught me how to speak both “engineer” and “executive,” drive innovation, and keep my sense of humor intact during deadline week. If you're curious about what I’ve been up to in the serious grown-up world of industry, check out my CV <Link href="/cv" className="custom-link hover:opacity-70 transition">here</Link>.
            </p>
          </div>

          {/* Subsection 2: PhD */}
          <div className="p-6 md:p-8 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105">
            <h2 className="text-xl md:text-2xl font-bold mb-4">PhD</h2>
            <p className="text-sm md:text-lg leading-relaxed">
              I earned my PhD in Computer Science at the University of Zurich, in the Requirements Engineering Research Group (RERG), under the brilliant guidance of Prof. Martin Glinz (truly the best — and not just because he’s probably reading this). I kicked off my PhD journey in April 2015, fueled by curiosity (and coffee ☕). I successfully defended my dissertation on March 4, 2019, a date forever etched in my memory — along with the nervous sweats that came with it. <Link href="/PhD" className="custom-link hover:opacity-70 transition">Here</Link> you can read more about my PhD work and <Link href="/publications" className="custom-link hover:opacity-70 transition">here</Link> you can check out the full list of publications.
            </p>
          </div>

          {/* Subsection 3: Publications */}
          <div className="p-6 md:p-8 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Publications</h2>
            <p className="text-sm md:text-lg leading-relaxed">
              During my PhD, I published four conference papers, one workshop paper, and one journal article. My research was featured at top international venues, including the Requirements Engineering Conference (RE) and the International Conference on Software Engineering (ICSE).
            </p>
            <p className="text-sm md:text-lg leading-relaxed mt-4">
              After completing my PhD, I continued publishing and contributed one journal paper, two additional conference papers, and an article for IEEE Software magazine. In this article I share how I found my way into requirements engineering, the challenge of siloed processes, and a collaborative approach with UX designers that’s helped me define clearer, more user-friendly requirements.
            </p>
            <p className="text-sm md:text-lg leading-relaxed mt-4">
              You can find the full list of my publications <Link href="/publications" className="custom-link hover:opacity-70 transition">here</Link>.
            </p>
          </div>

          {/* Subsection 4: Sabbatical */}
          <div className="p-6 md:p-8 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Sabbatical 2025</h2>
            <p className="text-sm md:text-lg leading-relaxed">
              I hit pause on my usual PM life (meetings, roadmaps, coffee... repeat) and dove headfirst into the world of shiny new tech! 🌊✨ I decided it was time to do something different, like building this very website you’re looking at 😎 Armed with Gen AI powers, I sprinkled some OpenAI magic ✨ into this site to create the chat feature you're chatting with (or about to). Then, I added a vector database to keep things zippy and wallet-friendly in case y’all bring in a tsunami of questions 🌪️📉. And because I love to <del>spy</del> observe things like a data detective 🕵️‍♀️, I plugged in Elasticsearch and Kibana to track what’s being asked the most (yes, I saw your question 👀 and no, I won’t judge).
            </p>
          </div>
        </div>

        <Chatbot />

        {/* Navigation Links */}
        <nav className="mt-12 w-full flex flex-wrap justify-center gap-6 text-sm md:text-lg font-medium">
          <Link href="/" className="hover:opacity-70 transition text-black">Home</Link>
          <Link href="/cv" className="hover:opacity-70 transition text-black">CV</Link>
          <Link href="/life" className="hover:opacity-70 transition text-black">Life</Link>
        </nav>
      </div>
    </div>
  );
}
