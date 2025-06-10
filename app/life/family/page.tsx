"use client";

import Link from "next/link";
import '../../style/link_style.css';
import Chatbot from "../../../components/chatbot";
import { useState } from "react";

export default function FamilyPage() {
  const images = [
    { src: "/images/family/tata.jpg", alt: "Family 1" },
    { src: "/images/family/familija.jpg", alt: "Family 2" },
    { src: "/images/family/boston.jpg", alt: "Family 3" },
    { src: "/images/family/na_krovu.jpg", alt: "Family 4" },
  ];

  const newFamilyImages = [
    { src: "/images/family/porodica1.jpg", alt: "New Family 1" },
    { src: "/images/family/porodica2.jpg", alt: "New Family 2" },
    { src: "/images/family/porodica3.jpg", alt: "New Family 3" },
    { src: "/images/family/Bumi1.jpg", alt: "New Family 4" },
    { src: "/images/family/vicemo.jpg", alt: "New Family 5" },
    { src: "/images/family/crtanje.jpg", alt: "New Family 6" },
    { src: "/images/family/Mama_i_Peki.jpg", alt: "New Family 7" },
    { src: "/images/family/dinos.jpg", alt: "New Family 8" },
    { src: "/images/family/Babe_i_deda.jpg", alt: "New Family 9" },
    { src: "/images/family/bumi2.jpg", alt: "New Family 10" },
    { src: "/images/family/Peki_i_Sloba.jpg", alt: "New Family 11" },
    { src: "/images/family/Nina2.jpg", alt: "New Family 12" },
    { src: "/images/family/Baba_i_deda.jpg", alt: "New Family 13" },
    { src: "/images/family/kiflice.jpg", alt: "New Family 14" },
    { src: "/images/family/Nina.jpg", alt: "New Family 15" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [newFamilyIndex, setNewFamilyIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleNewFamilyPrev = () => {
    setNewFamilyIndex((prevIndex) => (prevIndex === 0 ? newFamilyImages.length - 1 : prevIndex - 1));
  };

  const handleNewFamilyNext = () => {
    setNewFamilyIndex((prevIndex) => (prevIndex === newFamilyImages.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-fixed text-black flex flex-col items-center justify-center px-8 py-16 font-sans"
      style={{ backgroundImage: "url('/background_flower.jpg')" }}>

      <h1 className="text-6xl font-extrabold mt-8 tracking-tight">My family story</h1>

      <div className="mt-8 flex flex-wrap gap-8 justify-center max-w-5xl">
        <div className="p-8 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200 flex-1 min-w-[300px] transition-transform transform">

          <h2 className="text-xl font-semibold mb-3">Where I Come From — and Where We Are Now</h2>
          <p className="text-lg leading-relaxed">
            I come from a family where thinking deeply and caring deeply went hand in hand.
          </p>
          <p className="text-lg leading-relaxed">
            My dad was a university professor and mathematician who taught artificial intelligence, mathematical logic, and principles of programming—long before those fields were fashionable. He shaped not only generations of students, but also us—his four daughters. Yes, all girls. Yes, all engineers. I’m the youngest of the bunch, and we’re now scattered across three continents and four countries: Novi Sad, Boston, Sydney, and Zurich.
          </p>
          <p className="text-lg leading-relaxed">
            My mum, on the other hand, was a primary school teacher with a heart full of love for children—and that heart hasn&apos;t changed a bit. While my dad taught us to think critically, she taught us to care deeply. Together, they created a home where curiosity and kindness were part of everyday life.
          </p>
          <p className="text-lg leading-relaxed">
            In 2011, life reminded us how fragile it can be. We lost my dad to a lung condition. That same year, my mum was diagnosed with breast cancer. She went through surgery, chemo, and radiation—and survived. She&apos;s a fighter, and one of my greatest inspirations to this day.
          </p>

          <div className="relative my-8">
            <div className="relative w-full h-[250px] flex items-center justify-center overflow-hidden">
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                className="max-h-[200px] max-w-[300px] object-contain"
              />
            </div>
            <button onClick={handlePrev} className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-full shadow-md hover:bg-gray-700 text-xs md:px-4 md:py-2 md:text-sm">
              Prev
            </button>
            <button onClick={handleNext} className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-full shadow-md hover:bg-gray-700 text-xs md:px-4 md:py-2 md:text-sm">
              Next
            </button>
          </div>

          <h2 className="text-xl font-semibold mb-3">And Then Came Us</h2>
          <p className="text-lg leading-relaxed">
            I met my husband at work back in 2012 (I think! My memory’s better with people than with dates 😊). We started dating in December 2013, moved to Switzerland, and got married in May 2015—ten years ago now. He’s been my biggest support ever since: a calm, steady presence, full of positive energy, and my personal anchor when life gets stormy.
          </p>
          <p className="text-lg leading-relaxed">
            Although I’m the one who plays the ukulele and guitar, he’s the true music curator at home. He’s introduced me to some of my all-time favorite artists, and our home always has a soundtrack—thanks to his impeccable taste and very enthusiastic playlist management.
          </p>
          <p className="text-lg leading-relaxed">
            In January 2020, we got a cat—a total diva who quickly took charge of household dynamics. Then came our son Petar in 2021, named after my dad, and our daughter Nina in 2023. Life hasn’t been the same since—and I mean that in the most beautiful, overwhelming, transformative way.
          </p>
          <p className="text-lg leading-relaxed">
            Parenthood has stretched us, humbled us, and changed us for good. It tests our limits daily, yet somehow makes us stronger and more grounded than ever. After five long years, we finally sleep through the night (most nights). Ironically, it all started with the cat, who managed to wake us more than both kids combined.
          </p>
          <p className="text-lg leading-relaxed">
            This is our story. It’s full of love, math, music, chaos, and cats—and I wouldn’t trade it for anything.
          </p>

          <div className="relative my-8">
            <div className="relative w-full h-[250px] flex items-center justify-center overflow-hidden">
              <img
                src={newFamilyImages[newFamilyIndex].src}
                alt={newFamilyImages[newFamilyIndex].alt}
                className="max-h-[200px] max-w-[300px] object-contain"
              />
            </div>
            <button onClick={handleNewFamilyPrev} className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-full shadow-md hover:bg-gray-700 text-xs md:px-4 md:py-2 md:text-sm">
              Prev
            </button>
            <button onClick={handleNewFamilyNext} className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-full shadow-md hover:bg-gray-700 text-xs md:px-4 md:py-2 md:text-sm">
              Next
            </button>
          </div>
        </div>

        <Chatbot />
      </div>

      <nav className="mt-12 w-full flex flex-wrap justify-center gap-6 text-lg font-medium">
        <Link href="/" className="hover:opacity-70 transition text-black">Home</Link>
        <Link href="/cv" className="hover:opacity-70 transition text-black">CV</Link>
        <Link href="/work" className="hover:opacity-70 transition text-black">Work</Link>
        <Link href="/life" className="hover:opacity-70 transition text-black">Life</Link>
      </nav>
    </div>
  );
}
