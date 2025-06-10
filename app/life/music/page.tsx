"use client";

import Link from "next/link";
import '../../style/link_style.css';
import Chatbot from "../../../components/chatbot";

export default function MusicPage() {
  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-fixed text-black flex flex-col items-center justify-center px-8 py-16 font-sans"
      style={{ backgroundImage: "url('/background_flower.jpg')" }}>
            {/* Page Title */}

            {/* Top Navigation - left-centered, pill-shaped background */}
      <nav className="w-full max-w-5xl mx-auto flex flex-wrap justify-start items-center gap-4 md:gap-8 py-3 px-4 bg-white bg-opacity-80 rounded-xl shadow-md mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          <Link href="/" className="hover:opacity-70 transition text-black font-semibold">Home</Link>
          <Link href="/cv" className="hover:opacity-70 transition text-black font-semibold">CV</Link>
          <Link href="/work" className="hover:opacity-70 transition text-black font-semibold">Work</Link>
          <Link href="/life" className="hover:opacity-70 transition text-black font-semibold">Life</Link>
        </div>
      </nav>
            
            <h1 className="text-6xl font-extrabold mt-8 mb-12 tracking-tight">Music Projects</h1>
      
      {/* Content Wrapper with White Background */}
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 max-w-5xl w-full">
    

        {/* Description */}
        <p className="mt-6 text-lg leading-relaxed text-black text-justify max-w-3xl mx-auto">
          Before I ever strummed a ukulele, I actually started out playing guitar. My teacher was Momčilo Sotra—a talented musician and a good friend from Novi Sad. He played in a few awesome bands like Saigon Express, Microsonic, and Prijateljska Vatra. Thanks to him, I got my first taste of making music, and I was hooked. Momčilo and I played songs by the Ramones and The Beatles, which made learning even more fun and inspiring.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-black text-justify max-w-3xl mx-auto">
          Then in 2018, I discovered Grace VanderWaal (yes, the Golden Buzzer girl from America’s Got Talent) and thought, “Wait a minute… if this amazing little human can do it, why can’t I?”
        </p>
        <p className="mt-4 text-lg leading-relaxed text-black text-center max-w-3xl mx-auto">
          So I did.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-black text-justify max-w-3xl mx-auto">
          I started learning, playing, and recording covers—some sweet, some funny, and a few that are so cringe they could qualify as musical bloopers. But hey, I keep them up on my YouTube channel because they show how far I’ve come (and they make for great blackmail material… for myself).
        </p>

        {/* Videos Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Video 1 - YouTube Embed */}
  <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200">
    <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", height: 0 }} className="rounded-lg overflow-hidden">
      <iframe
        src="https://www.youtube.com/embed/7Qb8zarrdH8"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        className="rounded-lg"
      ></iframe>
    </div>
  </div>

          {/* Video 2 - YouTube Embed */}
  <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200">
    <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", height: 0 }} className="rounded-lg overflow-hidden">
      <iframe
        src="https://www.youtube.com/embed/caqAJ4bXAqU"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        className="rounded-lg"
      ></iframe>
    </div>
  </div>

          {/* Video 3 - YouTube Embed */}
  <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200">
    <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", height: 0 }} className="rounded-lg overflow-hidden">
      <iframe
        src="https://www.youtube.com/embed/Hg9STqgvUto"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        className="rounded-lg"
      ></iframe>
    </div>
  </div>

      {/* Video 4 - YouTube Embed */}
<div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200">
  <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", height: 0 }} className="rounded-lg overflow-hidden">
    <iframe
      src="https://www.youtube.com/embed/EXcnxJFEYlY"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      className="rounded-lg"
    ></iframe>
  </div>
</div>
        </div>

        {/* Additional Text */}
        <p className="mt-8 text-lg leading-relaxed text-black text-justify max-w-3xl mx-auto">
          Almost forgot! I’ve even written two of my very own songs—all about happiness and the little joys in life. They’re my musical sunshine and make my day better—I hope they brighten yours too!
        </p>

        {/* Additional Videos Section */}
<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Video 5 - YouTube Embed */}
  <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200">
    <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", height: 0 }} className="rounded-lg overflow-hidden">
      <iframe
        src="https://www.youtube.com/embed/TXNyPd4TBEM"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        className="rounded-lg"
      ></iframe>
    </div>
  </div>


         {/* Video 6 - YouTube Embed */}
  <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200">
    <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", height: 0 }} className="rounded-lg overflow-hidden">
      <iframe
        src="https://www.youtube.com/embed/bn3YJPSBSH0"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        className="rounded-lg"
      ></iframe>
    </div>
  </div>
</div>

        <Chatbot />

        {/* Navigation Links */}
        <nav className="mt-12 w-full flex flex-wrap justify-center gap-6 text-lg font-medium">
          <Link href="/" className="hover:opacity-70 transition text-black">Home</Link>
          <Link href="/cv" className="hover:opacity-70 transition text-black">CV</Link>
          <Link href="/work" className="hover:opacity-70 transition text-black">Work</Link>
          <Link href="/life" className="hover:opacity-70 transition text-black">Life</Link>
        </nav>
      </div>
    </div>
  );
}