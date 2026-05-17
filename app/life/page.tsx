"use client";

import Link from "next/link";
import Chatbot from "../../components/chatbot";
import posthog from "posthog-js";
import { 
  FaUsers,         // Friends (bigger group)
  FaLeaf, 
  FaMusic, 
  FaCamera, 
  FaUserFriends,   // Family (smaller group)
  FaRunning        // Sport (HIIT/running)
} from "react-icons/fa";

export default function LifePage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/background_flower.jpg')" }}
    >
      <div className="text-black flex flex-col items-center justify-center px-4 md:px-8 py-16 font-sans max-w-5xl mx-auto">
        {/* Top Navigation - left-centered, pill-shaped background */}
        <nav className="w-full max-w-5xl mx-auto flex flex-wrap justify-start items-center gap-4 md:gap-8 py-3 px-4 bg-white bg-opacity-80 rounded-xl shadow-md mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <Link href="/" className="hover:opacity-70 transition text-black font-semibold flex items-center">Home</Link>
            <Link href="/work" className="hover:opacity-70 transition text-black font-semibold flex items-center">Work</Link>
            <Link
              href="/life"
              className="font-semibold text-white bg-green-700 px-3 py-1 rounded transition"
              aria-current="page"
            >
              Life
            </Link>
            <Link href="/cv" className="hover:opacity-70 transition text-black font-semibold flex items-center">CV</Link>
          </div>
        </nav>

        {/* Page Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold mt-8 tracking-tight">Life</h1>
        <p className="mt-6 text-lg md:text-xl leading-relaxed text-black text-center max-w-2xl">
          Explore my personal stories and things that excite me.
        </p>

        {/* Subsections */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full justify-center">
          {/* Family (smaller group) */}
          <Link
            href="/life/family"
            onClick={() => posthog.capture("life_category_clicked", { category: "family" })}
            className="p-6 md:p-8 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200 w-full h-[180px] md:w-[450px] md:h-[350px] flex flex-col items-center justify-center transition-transform transform hover:scale-105"
          >
            <FaUserFriends className="text-green-700 text-4xl md:text-5xl mb-4" />
            <h1 className="text-xl md:text-2xl font-bold text-center">Family</h1>
          </Link>

          {/* Music */}
          <Link
            href="/life/music"
            onClick={() => posthog.capture("life_category_clicked", { category: "music" })}
            className="p-6 md:p-8 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200 w-full h-[180px] md:w-[450px] md:h-[350px] flex flex-col items-center justify-center transition-transform transform hover:scale-105"
          >
            <FaMusic className="text-green-700 text-4xl md:text-5xl mb-4" />
            <h1 className="text-xl md:text-2xl font-bold text-center">Music</h1>
          </Link>

          {/* Photography */}
          <Link
            href="/life/photography"
            onClick={() => posthog.capture("life_category_clicked", { category: "photography" })}
            className="p-6 md:p-8 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200 w-full h-[180px] md:w-[450px] md:h-[350px] flex flex-col items-center justify-center transition-transform transform hover:scale-105"
          >
            <FaCamera className="text-green-700 text-4xl md:text-5xl mb-4" />
            <h1 className="text-xl md:text-2xl font-bold text-center">Photography</h1>
          </Link>

          {/* Gardening */}
          <Link
            href="/life/gardening"
            onClick={() => posthog.capture("life_category_clicked", { category: "gardening" })}
            className="p-6 md:p-8 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200 w-full h-[180px] md:w-[450px] md:h-[350px] flex flex-col items-center justify-center transition-transform transform hover:scale-105"
          >
            <FaLeaf className="text-green-700 text-4xl md:text-5xl mb-4" />
            <h1 className="text-xl md:text-2xl font-bold text-center">Gardening</h1>
          </Link>

          {/* Friends (bigger group) */}
          <Link
            href="/life/friends"
            onClick={() => posthog.capture("life_category_clicked", { category: "friends" })}
            className="p-6 md:p-8 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200 w-full h-[180px] md:w-[450px] md:h-[350px] flex flex-col items-center justify-center transition-transform transform hover:scale-105"
          >
            <FaUsers className="text-green-700 text-4xl md:text-5xl mb-4" />
            <h1 className="text-xl md:text-2xl font-bold text-center">Friends</h1>
          </Link>

          {/* Sport (HIIT / running) */}
          <Link
            href="/life/sport"
            onClick={() => posthog.capture("life_category_clicked", { category: "sport" })}
            className="p-6 md:p-8 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200 w-full h-[180px] md:w-[450px] md:h-[350px] flex flex-col items-center justify-center transition-transform transform hover:scale-105"
          >
            <FaRunning className="text-green-700 text-4xl md:text-5xl mb-4" />
            <h1 className="text-xl md:text-2xl font-bold text-center">Sport</h1>
          </Link>
        </div>

        {/* Chatbot (inside the inner container like Work) */}
        <Chatbot />

        {/* Bottom Navigation (inside the inner container like Work) */}
        <nav className="mt-12 w-full flex flex-wrap justify-center gap-6 text-sm md:text-lg font-medium">
          <Link href="/" className="hover:opacity-70 transition text-black">Home</Link>
          <Link href="/work" className="hover:opacity-70 transition text-black">Work</Link>
          <Link
            href="/life"
            className="font-semibold text-white bg-green-700 px-3 py-1 rounded transition"
            aria-current="page"
          >
            Life
          </Link>
          <Link href="/cv" className="hover:opacity-70 transition text-black">CV</Link>
          <a href="https://www.strongme.pro" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition text-black">StrongME</a>
        </nav>
      </div>
    </div>
  );
}
