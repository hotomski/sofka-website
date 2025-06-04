import { FaDownload } from "react-icons/fa";
import Link from "next/link";
import Chatbot from "../../components/chatbot";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

// Set workerSrc for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function CV() {
  const [numPages, setNumPages] = useState<number | null>(null);

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

        {/* Embedded PDF with react-pdf */}
        <div className="mt-12 w-full flex flex-col items-center">
          <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200 w-full max-w-5xl">
            <h2 className="text-xl font-semibold mb-2 text-center">View CV as PDF</h2>
            <div className="rounded-lg flex flex-col items-center" style={{ background: "#fff" }}>
              <Document
                file="/images/cv/cv.pdf"
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                loading="Loading CV..."
                className="w-full flex flex-col items-center"
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    width={800}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    className="my-4 shadow"
                  />
                ))}
              </Document>
            </div>
          </div>
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