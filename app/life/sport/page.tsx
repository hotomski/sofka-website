"use client";

import Link from "next/link";
import Image from "next/image";
import '../../style/link_style.css';
import Chatbot from "../../../components/chatbot";
import { useState } from "react";

export default function SportPage() {
  const images = [
    ...Array.from({ length: 4 }, (_, i) => ({
      src: `/images/sport/Foto${i + 1}.jpg`,
      alt: `Sport ${i + 1}`,
    }))
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

      {/* Top Navigation */}
      <nav className="w-full max-w-5xl mx-auto flex flex-wrap justify-start items-center gap-4 md:gap-8 py-3 px-4 bg-white bg-opacity-80 rounded-xl shadow-md mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          <Link href="/" className="hover:opacity-70 transition text-black font-semibold">Home</Link>
          <Link href="/work" className="hover:opacity-70 transition text-black font-semibold">Work</Link>
          <Link href="/life" className="hover:opacity-70 transition text-black font-semibold">Life</Link>
          <Link href="/cv" className="hover:opacity-70 transition text-black font-semibold">CV</Link>
        </div>
      </nav>

      <h1 className="text-6xl font-extrabold mt-8 mb-12 tracking-tight text-center">The sport side of the story</h1>

      <div className="mt-8 flex flex-col gap-8 max-w-5xl w-full">

        {/* Chapter 1: The origin */}
        <div className="p-8 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Sport saved me. Then I had to learn to listen to my body.</h2>
          <p className="text-lg leading-relaxed">
            A few years ago, burnout and a series of health issues brought me to my knees. I was depleted — physically,
            mentally, emotionally. The one thing that kept me going, that made me feel human again, was sport.
            Moving my body was the only anchor I had.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            So I went all in. My weapon of choice was <span className="font-bold">Insanity</span> — the intense program
            from Shaun T that I had done for years. It delivers results. These photos were taken after my second
            pregnancy, when my youngest was about 9 months old — proof that it works.
          </p>

          {/* Photo carousel */}
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

          <p className="text-lg leading-relaxed">
            But I overdid it. My body started sending signals I couldn&apos;t ignore. The intensity that once felt
            empowering started to feel like another form of pressure — and I was already carrying enough of that.
            I realised that what I needed wasn&apos;t more. I needed <span className="font-bold italic">different</span>.
          </p>
        </div>

        {/* Chapter 2: StrongME */}
        <div className="p-8 bg-white bg-opacity-95 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">So I built something new.</h2>
          <p className="text-lg leading-relaxed">
            I wanted movement that rebuilds rather than depletes. Something joyful, not punishing. Structured enough
            to build real strength, but with space for breath, play, and recovery. A program that treats the body
            as something to nourish — not conquer.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            I built it for myself first. It worked. I felt strong again — genuinely strong, not just physically fit.
            My energy stabilized. My nervous system calmed down. I started to feel like myself again.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            Then I decided to share it.
          </p>

          {/* StrongME call-out card */}
          <div className="mt-8 p-6 rounded-xl border text-black flex flex-col gap-6"
            style={{ backgroundColor: "#f6f2ec", borderColor: "#ddd4ca" }}>
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#6d675f" }}>My concept</p>
              <h3 className="text-3xl font-extrabold tracking-tight mb-3" style={{ color: "#111111" }}>Strong body. Strong mind. Strong ME.</h3>
              <p className="leading-relaxed" style={{ color: "#5f5a55" }}>
                StrongME is a group movement class that combines rhythmic cardio, functional strength, dance,
                and a guided mindfulness close. It is designed for people navigating burnout, life transitions,
                and ongoing stress — who need to rebuild, not just push harder.
              </p>
            </div>

            {/* Class photo grid */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { src: "/images/sport/strongme/PompomsFixedLightning.png", alt: "StrongME pompoms" },
                { src: "/images/sport/strongme/Connect_end.png", alt: "StrongME class connection" },
                { src: "/images/sport/strongme/Fly.png", alt: "StrongME class" },
                { src: "/images/sport/strongme/high five.png", alt: "StrongME high five" },
              ].map((img) => (
                <div key={img.src} className="relative w-full h-36 overflow-hidden rounded-lg">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="256px"
                  />
                </div>
              ))}
            </div>

            <a
              href="https://www.strongme.pro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block self-start font-bold px-6 py-3 rounded-full transition hover:opacity-80"
              style={{ backgroundColor: "#111111", color: "#ffffff" }}
            >
              Visit StrongME &rarr;
            </a>
          </div>
        </div>

        <Chatbot />
      </div>

      {/* Bottom Navigation */}
      <nav className="mt-12 w-full flex flex-wrap justify-center gap-6 text-lg font-medium mb-8">
        <Link href="/" className="hover:opacity-70 transition text-black">Home</Link>
        <Link href="/work" className="hover:opacity-70 transition text-black">Work</Link>
        <Link href="/life" className="hover:opacity-70 transition text-black">Life</Link>
        <Link href="/cv" className="hover:opacity-70 transition text-black">CV</Link>
        <a href="https://www.strongme.pro" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition text-black">StrongME</a>
      </nav>
    </div>
  );
}
