import Link from "next/link";
import Chatbot from "../../components/chatbot";
import { useState } from "react";

export default function LifePage() {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/background_flower.jpg')" }}
    >
      <div className="text-black flex flex-col items-center justify-center px-4 md:px-8 py-16 font-sans max-w-5xl mx-auto">

        {/* Top Navigation - with Life submenu */}
        <nav className="w-full max-w-5xl mx-auto flex flex-wrap justify-start items-center gap-4 md:gap-8 py-3 px-4 bg-white bg-opacity-80 rounded-xl shadow-md mb-8 relative z-20">
          <div className="flex flex-wrap gap-4 items-center">
            <Link href="/" className="hover:opacity-70 transition text-black font-semibold flex items-center">Home</Link>
            <Link href="/work" className="hover:opacity-70 transition text-black font-semibold flex items-center">Work</Link>
            <div
              className="relative flex items-center"
              onMouseEnter={() => setSubmenuOpen(true)}
              onMouseLeave={() => setSubmenuOpen(false)}
            >
              <Link
                href="/life"
                className="font-semibold text-white bg-green-700 px-3 py-1 rounded transition flex items-center"
                aria-current="page"
              >
                Life
              </Link>
              {/* Submenu */}
              <div
                className={`absolute left-0 top-full mt-2 bg-white bg-opacity-95 rounded-lg shadow-lg border border-gray-200 min-w-[160px] flex flex-col transition-all duration-200 ${
                  submenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
              >
                <Link href="/life/family" className="px-4 py-2 hover:bg-green-50 rounded-t-lg transition text-black">Family</Link>
                <Link href="/life/gardening" className="px-4 py-2 hover:bg-green-50 transition text-black">Gardening</Link>
                <Link href="/life/music" className="px-4 py-2 hover:bg-green-50 transition text-black">Music</Link>
                <Link href="/life/photography" className="px-4 py-2 hover:bg-green-50 rounded-b-lg transition text-black">Photography</Link>
              </div>
            </div>
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
          {/* Family */}
          <Link
            href="/life/family"
            className="p-6 md:p-8 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200 w-full h-[180px] md:w-[450px] md:h-[350px] flex items-center justify-center transition-transform transform hover:scale-105"
          >
            <h1 className="text-xl md:text-2xl font-bold text-center">Family</h1>
          </Link>

          {/* Music */}
          <Link
            href="/life/music"
            className="p-6 md:p-8 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200 w-full h-[180px] md:w-[450px] md:h-[350px] flex items-center justify-center transition-transform transform hover:scale-105"
          >
            <h1 className="text-xl md:text-2xl font-bold text-center">Music</h1>
          </Link>

          {/* Photography */}
          <Link
            href="/life/photography"
            className="p-6 md:p-8 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200 w-full h-[180px] md:w-[450px] md:h-[350px] flex items-center justify-center transition-transform transform hover:scale-105"
          >
            <h1 className="text-xl md:text-2xl font-bold text-center">Photography</h1>
          </Link>

          {/* Gardening */}
          <Link
            href="/life/gardening"
            className="p-6 md:p-8 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200 w-full h-[180px] md:w-[450px] md:h-[350px] flex items-center justify-center transition-transform transform hover:scale-105"
          >
            <h1 className="text-xl md:text-2xl font-bold text-center">Gardening</h1>
          </Link>
        </div>

        {/* Chatbot */}
        <Chatbot />

        {/* Navigation Links */}
        <nav className="mt-12 w-full flex flex-wrap justify-center gap-4 md:gap-6 text-base md:text-lg font-medium">
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
        </nav>
      </div>
    </div>
  );
}