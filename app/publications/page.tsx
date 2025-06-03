"use client";

import Link from "next/link";
import '../style/link_style.css';
import Chatbot from "../../components/chatbot";

export default function PublicationsPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/background_flower.jpg')" }}
    >
      <div className="text-black flex flex-col items-center justify-center px-4 md:px-8 py-16 font-sans max-w-5xl mx-auto">
        {/* Page Title */}
        <h1 className="text-6xl font-extrabold mt-8 tracking-tight">Publications</h1>
        <p className="mt-6 text-xl leading-relaxed text-black text-center max-w-2xl">
          Below is a list of my publications. You can also find the full list on my{" "}
          <a
            href="https://dblp.org/pid/191/1101.html"
            target="_blank"
            className="custom-link hover:opacity-70 transition"
          >
            DBLP profile
          </a>.
        </p>

        {/* Publications List */}
        <div className="mt-8 flex flex-col gap-6 w-full">
          {[
            {
              title: "My REvelation: Unveiling an Unseen Career in Requirements",
              venue: "IEEE Software, 2023",
            },
            {
              title: "Caveats in Eliciting Mobile App Requirements",
              venue: "EASE 2020",
            },
            {
              title:
                "GuideGen: An Approach for Keeping Requirements and Acceptance Tests Aligned",
              venue: "SE 2020",
            },
            {
              title: "Caveats in Eliciting Mobile App Requirements",
              venue: "CoRR abs/2002.08458, 2020",
            },
            {
              title:
                "GuideGen: An Approach for Keeping Requirements and Acceptance Tests Aligned via Automatically Generated Guidance",
              venue: "Information and Software Technology, 2019",
            },
            {
              title: "GuideGen: A Tool for Keeping Requirements and Acceptance Tests Aligned",
              venue: "ICSE Companion Volume, 2018",
            },
            {
              title:
                "A Qualitative Study on Using GuideGen to Keep Requirements and Acceptance Tests Aligned",
              venue: "RE 2018",
            },
            {
              title:
                "Keeping Evolving Requirements and Acceptance Tests Aligned with Automatically Generated Guidance",
              venue: "REFSQ 2018",
            },
            {
              title:
                "Aligning Requirements and Acceptance Tests via Automatically Generated Guidance",
              venue: "RE Workshops, 2017",
            },
            {
              title:
                "An Exploratory Study on Handling Requirements and Acceptance Test Documentation in Industry",
              venue: "RE 2016",
            },
          ].map((pub, index) => (
            <div
              key={index}
              className="p-6 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200"
            >
              <h2 className="text-lg font-bold">{pub.title}</h2>
              <p className="text-sm text-gray-700 mt-2">
                <em>{pub.venue}</em>
              </p>
            </div>
          ))}
        </div>

        <Chatbot />

        {/* Navigation Links */}
        <nav className="mt-12 w-full flex flex-wrap justify-center gap-6 text-lg font-medium">
          <Link href="/" className="hover:opacity-70 transition text-black">Home</Link>
          <Link href="/work" className="hover:opacity-70 transition text-black">Work</Link>
          <Link href="/cv" className="hover:opacity-70 transition text-black">CV</Link>
          <Link href="/life" className="hover:opacity-70 transition text-black">Life</Link>
        </nav>
      </div>
    </div>
  );
}
