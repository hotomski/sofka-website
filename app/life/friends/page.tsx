"use client";

import Link from "next/link";
import Image from "next/image";
import '../../style/link_style.css';
import Chatbot from "../../../components/chatbot";
import { useState } from "react";

export default function FriendsPage() {
  const images = [
    ...Array.from({ length: 20 }, (_, i) => ({
      src: `/images/friends/Foto${i + 1}.jpg`,
      alt: `Friends ${i + 1}`,
    })),
    { src: "/images/friends/Foto9a.jpg", alt: "Friends 9a" },
    { src: "/images/friends/Foto11a.jpg", alt: "Friends 11a" },
    { src: "/images/friends/Foto12a.jpg", alt: "Friends 12a" },
    { src: "/images/friends/Foto14a.jpg", alt: "Friends 14a" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-fixed text-black flex flex-col items-center justify-center px-4 md:px-8 py-8 md:py-16 font-sans"
      style={{ backgroundImage: "url('/background_flower.jpg')" }}>
      
      {/* Top Navigation - left-centered, pill-shaped background */}
      <nav className="w-full max-w-5xl mx-auto flex flex-wrap justify-start items-center gap-4 md:gap-8 py-3 px-4 bg-white bg-opacity-80 rounded-xl shadow-md mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          <Link href="/" className="hover:opacity-70 transition text-black font-semibold">Home</Link>  
          <Link href="/work" className="hover:opacity-70 transition text-black font-semibold">Work</Link>
          <Link href="/life" className="hover:opacity-70 transition text-black font-semibold">Life</Link>
          <Link href="/cv" className="hover:opacity-70 transition text-black font-semibold">CV</Link>
        </div>
      </nav>

      <h1 className="text-6xl font-extrabold mt-8 mb-12 tracking-tight text-center">My friends</h1>

      <div className="mt-8 flex flex-wrap gap-8 justify-center max-w-5xl">
        <div className="p-8 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200 flex-1 min-w-[300px] transition-transform transform">

          <h2 className="text-xl font-semibold mb-3">Friendships teach us who we are</h2>
          <p className="text-lg leading-relaxed">
            OK, so I am that supersocial person, as my sister would say &quot;a social butterfly&quot;.
          </p>
          <p className="text-lg leading-relaxed">
             I keep in touch with people from my highschool and university days and I am so grateful for all the experiences we&apos;ve been through. Those people are an integral part of me and I miss them deeply now when we see each other so rarely.
          </p>
          <p className="text-lg leading-relaxed">
            Life brings also new friendships and I am one of those who really loves meeting new people, hearing new stories and sharing mine. I am so grateful for all the friends I met in my new life, once I moved to Zurich.
          </p>
          <p className="text-lg leading-relaxed">
            In the gallery below, you can see some of my dearest friends and I am sure the images are not complete - there are so many more who hate being pictured.
          </p>
          <div className="relative my-8">
            <div className="relative w-full h-[260px] md:h-[370px] flex items-center justify-center overflow-hidden">
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                width={600}
                height={400}
                className="max-h-[220px] md:max-h-[340px] w-auto max-w-full object-contain rounded-lg shadow"
                priority
              />
            </div>
            <button onClick={handlePrev} className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-full shadow-md hover:bg-gray-700 text-xs md:px-4 md:py-2 md:text-sm">
              Prev
            </button>
            <button onClick={handleNext} className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-full shadow-md hover:bg-gray-700 text-xs md:px-4 md:py-2 md:text-sm">
              Next
            </button>
          </div>
        </div>

        <Chatbot />
      </div>

      {/* Bottom Navigation - simple, no background */}
      <nav className="mt-12 w-full flex flex-wrap justify-center gap-6 text-lg font-medium mb-8">
        <Link href="/" className="hover:opacity-70 transition text-black">Home</Link>
        <Link href="/work" className="hover:opacity-70 transition text-black">Work</Link>
        <Link href="/life" className="hover:opacity-70 transition text-black">Life</Link>
        <Link href="/cv" className="hover:opacity-70 transition text-black">CV</Link>
      </nav>
    </div>
  );
}