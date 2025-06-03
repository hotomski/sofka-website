"use client";

import Image from "next/image";
import Link from "next/link";
import About from "./about_section/about_section";
import Work from "./work/work_section";
import Life from "./life/life_section";
import Chatbot from "../components/chatbot";
import './style/link_style.css';

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/background_flower.jpg')" }}
    >
      <div className="text-black flex flex-col items-center justify-between px-4 md:px-8 py-16 font-sans max-w-6xl mx-auto">
        {/* Profile Image */}
        <Image
          src="/profile.jpg"
          width={300}
          height={300}
          alt="Your Name"
          className="rounded-full border-4 border-green-900 shadow-lg transition-transform transform hover:scale-105"
        />

        {/* Welcome Message */}
        <h1 className="text-4xl md:text-6xl font-extrabold mt-8 tracking-tight text-center">Hey, I&apos;m Sofija! 👋</h1>
        <p className="mt-6 text-lg md:text-xl leading-relaxed text-black text-center max-w-2xl">
          Sofija has survived in the IT business for fifteen years and in motherhood for four.
        </p>

        {/* Grid for sections */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* About Section spans both columns */}
          <div className="md:col-span-2 p-6 md:p-8 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105">
            <About />
          </div>

          {/* Work Section (left column) */}
          <div className="p-6 md:p-8 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105">
            <Work />
          </div>

          {/* Life Section (right column) */}
          <div className="p-6 md:p-8 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105">
            <Life />
          </div>
        </div>

        {/* Navigation Links and Chatbot */}
        <nav className="mt-12 w-full flex flex-wrap justify-center items-center gap-4 md:gap-6 text-lg font-medium">
          <Link href="/life" className="hover:opacity-70 transition text-black">Life</Link>
          <Link href="/cv" className="hover:opacity-70 transition text-black">CV</Link>
          <Link href="/work" className="hover:opacity-70 transition text-black">Work</Link>

          {/* Chatbot Icon */}
          <div className="ml-4">
            <Chatbot />
          </div>
        </nav>
      </div>
    </div>
  );
}
