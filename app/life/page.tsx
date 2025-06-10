import Link from "next/link";
import Chatbot from "../../components/chatbot";

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
          <Link href="/" className="hover:opacity-70 transition text-black font-semibold">Home</Link>
          <Link href="/cv" className="hover:opacity-70 transition text-black font-semibold">CV</Link>
          <Link href="/work" className="hover:opacity-70 transition text-black font-semibold">Work</Link>
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
          <Link href="/cv" className="hover:opacity-70 transition text-black">CV</Link>
          <Link href="/work" className="hover:opacity-70 transition text-black">Work</Link>
          <Link href="/life" className="hover:opacity-70 transition text-black">Life</Link>
        </nav>
      </div>
    </div>
  );
}
