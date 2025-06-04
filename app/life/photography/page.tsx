"use client";

import Link from "next/link";
import '../../style/link_style.css';
import Chatbot from "../../../components/chatbot";

export default function PhotographyPage() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed text-black flex flex-col items-center justify-center px-4 py-16 font-sans"
      style={{ backgroundImage: "url('/background_flower.jpg')" }}>

        
        {/* Page Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold mt-8 tracking-tight">Photography test</h1>
      
      {/* Content Wrapper with White Background */}
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 max-w-5xl w-full">
        

        {/* Description */}
        <p className="mt-6 text-base md:text-lg leading-relaxed text-black text-justify max-w-3xl mx-auto">
          In 2018, my husband surprised me with a Fuji X100F camera as a birthday present. Little did he know, this compact yet powerful camera would spark a new passion in me and become my constant companion, guiding me through the vibrant world of photography.
        </p>
        <p className="mt-4 text-base md:text-lg leading-relaxed text-black text-justify max-w-3xl mx-auto">
          With the X100F in hand, I began exploring the streets, capturing candid moments that tell stories of everyday life. I ventured into nature, seeking out serene landscapes and the subtle interplay of light and shadow. Portraits became another avenue, allowing me to connect with individuals and encapsulate their essence through my lens.
        </p>
        <p className="mt-4 text-base md:text-lg leading-relaxed text-black text-justify max-w-3xl mx-auto">
          Photography has since become more than a hobby; it&apos;s a way for me to observe and appreciate the world around me. Each photograph is a reflection of a moment that caught my eye and stirred my curiosity.
        </p>
        <p className="mt-4 text-base md:text-lg leading-relaxed text-black text-justify max-w-3xl mx-auto">
          This webpage offers just a glimpse of my work — you can find the full collection on 
          <a href="https://www.instagram.com/photomsky/?hl=en" target="_blank" className="text-blue-500 underline hover:text-blue-700"> Instagram</a> and 
          <a href="https://www.flickr.com/photos/141897629@N07/" target="_blank" className="text-blue-500 underline hover:text-blue-700"> Flickr</a>.
        </p>

        {/* Photos Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Photo 1 */}
          <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200">
            <img src="/images/photography/photo1.jpg" alt="Photo 1" className="w-full h-auto rounded-lg" />
          </div>
          {/* Photo 2 */}
          <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200">
            <img src="/images/photography/photo2.jpg" alt="Photo 2" className="w-full h-auto rounded-lg" />
          </div>
          {/* Photo 3 */}
          <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200">
            <img src="/images/photography/photo3.jpg" alt="Photo 3" className="w-full h-auto rounded-lg" />
          </div>
          {/* Photo 4 */}
          <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200">
            <img src="/images/photography/photo4.jpg" alt="Photo 4" className="w-full h-auto rounded-lg" />
          </div>
          {/* Photo 5 */}
          <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200">
            <img src="/images/photography/photo5.jpg" alt="Photo 5" className="w-full h-auto rounded-lg" />
          </div>
          {/* Photo 6 */}
          <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200">
            <img src="/images/photography/photo6.jpg" alt="Photo 6" className="w-full h-auto rounded-lg" />
          </div>
          {/* Photo 7 */}
          <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200">
            <img src="/images/photography/photo7.jpg" alt="Photo 7" className="w-full h-auto rounded-lg" />
          </div>
          {/* Photo 8 */}
          <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200">
            <img src="/images/photography/photo8.jpg" alt="Photo 8" className="w-full h-auto rounded-lg" />
          </div>
          {/* Photo 9 */}
          <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200">
            <img src="/images/photography/photo9.jpg" alt="Photo 9" className="w-full h-auto rounded-lg" />
          </div>
          {/* Photo 10 */}
          <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200">
            <img src="/images/photography/photo10.jpg" alt="Photo 10" className="w-full h-auto rounded-lg" />
          </div>
          {/* Photo 11 */}
          <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200">
            <img src="/images/photography/photo11.jpg" alt="Photo 11" className="w-full h-auto rounded-lg" />
          </div>
          {/* Photo 12 */}
          <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200">
            <img src="/images/photography/photo12.jpg" alt="Photo 12" className="w-full h-auto rounded-lg" />
          </div>
        </div>

        <Chatbot />
      </div>

      {/* Navigation Links */}
      <nav className="mt-12 w-full flex flex-wrap justify-center gap-6 text-lg font-medium">
        <Link href="/" className="hover:opacity-70 transition text-black">Home</Link>
        <Link href="/cv" className="hover:opacity-70 transition text-black">CV</Link>
        <Link href="/work" className="hover:opacity-70 transition text-black">Work</Link>
        <Link href="/life" className="hover:opacity-70 transition text-black">Life</Link>
      </nav>
    </div>
  );
}