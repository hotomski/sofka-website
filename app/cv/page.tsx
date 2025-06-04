"use client";

import { FaDownload } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Chatbot from "../../components/chatbot";

export default function CV() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/background_flower.jpg')" }}
    >
      <div className="text-black flex flex-col items-center justify-center px-4 md:px-8 py-16 font-sans max-w-6xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold mt-8 tracking-tight text-center">
          Curriculum Vitae
        </h1>
        <p className="mt-6 text-lg md:text-xl leading-relaxed text-black text-center max-w-2xl">
          View my professional experience, achievements, and academic journey below.
        </p>

        {/* Download Button */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <a
            href="/images/cv/cv.pdf"
            download
            className="inline-flex items-center justify-center px-6 py-3 text-white rounded-lg shadow-md transition-transform transform hover:scale-105"
            style={{ backgroundColor: "#317773" }}
            title="Download CV"
          >
            <FaDownload className="w-5 h-5 mr-2" />
            Download CV
          </a>
        </div>

        {/* CV Images */}
        <div className="mt-12 flex flex-col gap-8 items-center w-full">
          <Image
            src="/images/cv/cv_page1.jpg"
            alt="CV Page 1"
            width={800}
            height={1131}
            quality={100}
            className="rounded-lg shadow-lg w-full md:w-auto"
            priority
          />
          <Image
            src="/images/cv/cv_page2.jpg"
            alt="CV Page 2"
            width={800}
            height={1131}
            quality={100}
            className="rounded-lg shadow-lg w-full md:w-auto"
            priority
          />
        </div>

        {/* Chatbot */}
        <Chatbot />

        {/* Navigation Links */}
        <nav className="mt-12 w-full flex flex-wrap justify-center gap-6 text-lg font-medium">
          <Link href="/" className="hover:opacity-70 transition text-black">Home</Link>
          <Link href="/work" className="hover:opacity-70 transition text-black">Work</Link>
          <Link href="/life" className="hover:opacity-70 transition text-black">Life</Link>
        </nav>
      </div>
    </div>
  );
}