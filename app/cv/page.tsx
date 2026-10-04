"use client";

import { FaDownload } from "react-icons/fa";
import Image from "next/image";
import posthog from "posthog-js";

export default function CV() {
  return (
    <div
      className="pb-4"
    >
      
      <div className="flex flex-col items-center justify-center px-4 md:px-8 py-16 font-sans max-w-5xl mx-auto">

        {/* Page Title */}
        <h1 className="display text-4xl md:text-6xl mt-8 tracking-tight text-center">
          Curriculum Vitae
        </h1>
        <p className="mt-6 text-lg md:text-xl leading-relaxed text-center max-w-2xl">
          View my professional experience, achievements, and academic journey below.
        </p>

        {/* Download Button */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <a
            href="/images/cv/cv.pdf"
            download
            onClick={() => posthog.capture("cv_downloaded")}
            className="inline-flex items-center justify-center px-6 py-3 text-white rounded-lg shadow-md card-hover"
            style={{ backgroundColor: "var(--spot)" }}
            title="Download CV"
          >
            <FaDownload className="w-5 h-5 mr-2" />
            Download CV
          </a>
        </div>

        {/* CV Images, one per page of cv.pdf */}
        <div className="mt-12 flex flex-col gap-8 items-center w-full">
          {[1, 2, 3].map((page) => (
            <Image
              key={page}
              src={`/images/cv/page-${page}.jpg`}
              alt={`CV page ${page}`}
              width={800}
              height={1132}
              quality={100}
              className="rounded-lg shadow-lg w-full md:w-auto"
              priority={page === 1}
            />
          ))}
        </div>

        {/* Navigation Links */}
      </div>
    </div>
  );
}