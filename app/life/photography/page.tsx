"use client";

import '../../style/link_style.css';

export default function PhotographyPage() {
  return (
    <div className="flex flex-col items-center px-4 py-12 font-sans">

        {/* Page Title */}
        <h1 className="display text-4xl md:text-6xl mt-8 mb-12 tracking-tight">Photography</h1>
      
      {/* Content Wrapper with White Background */}
      <div className="card p-8 max-w-5xl w-full">
        

        {/* Description */}
        <p className="mt-6 text-base md:text-lg leading-relaxed text-justify max-w-3xl mx-auto">
          In 2018, my husband surprised me with a Fuji X100F camera as a birthday present. Little did he know, this compact yet powerful camera would spark a new passion in me and become my constant companion, guiding me through the vibrant world of photography.
        </p>
        <p className="mt-4 text-base md:text-lg leading-relaxed text-justify max-w-3xl mx-auto">
          With the X100F in hand, I began exploring the streets, capturing candid moments that tell stories of everyday life. I ventured into nature, seeking out serene landscapes and the subtle interplay of light and shadow. Portraits became another avenue, allowing me to connect with individuals and encapsulate their essence through my lens.
        </p>
        <p className="mt-4 text-base md:text-lg leading-relaxed text-justify max-w-3xl mx-auto">
          Photography has since become more than a hobby; it&apos;s a way for me to observe and appreciate the world around me. Each photograph is a reflection of a moment that caught my eye and stirred my curiosity.
        </p>
        <p className="mt-4 text-base md:text-lg leading-relaxed text-justify max-w-3xl mx-auto">
          This webpage offers just a glimpse of my work — you can find the full collection on 
          <a href="https://www.instagram.com/photomsky/?hl=en" target="_blank" className="ink-link"> Instagram</a> and 
          <a href="https://www.flickr.com/photos/141897629@N07/" target="_blank" className="ink-link"> Flickr</a>.
        </p>

        {/* Photos Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Photo 1 */}
          <div className="overflow-hidden rounded-2xl aspect-[4/3]" style={{ border: "1px solid var(--line)" }}>
            <img src="/images/photography/photo1.jpg" alt="Photo 1" className="w-full h-full object-cover transition duration-500 hover:scale-[1.03]" />
          </div>
          {/* Photo 2 */}
          <div className="overflow-hidden rounded-2xl aspect-[4/3]" style={{ border: "1px solid var(--line)" }}>
            <img src="/images/photography/photo2.jpg" alt="Photo 2" className="w-full h-full object-cover transition duration-500 hover:scale-[1.03]" />
          </div>
          {/* Photo 3 */}
          <div className="overflow-hidden rounded-2xl aspect-[4/3]" style={{ border: "1px solid var(--line)" }}>
            <img src="/images/photography/photo3.jpg" alt="Photo 3" className="w-full h-full object-cover transition duration-500 hover:scale-[1.03]" />
          </div>
          {/* Photo 4 */}
          <div className="overflow-hidden rounded-2xl aspect-[4/3]" style={{ border: "1px solid var(--line)" }}>
            <img src="/images/photography/photo4.jpg" alt="Photo 4" className="w-full h-full object-cover transition duration-500 hover:scale-[1.03]" />
          </div>
          {/* Photo 5 */}
          <div className="overflow-hidden rounded-2xl aspect-[4/3]" style={{ border: "1px solid var(--line)" }}>
            <img src="/images/photography/photo5.jpg" alt="Photo 5" className="w-full h-full object-cover transition duration-500 hover:scale-[1.03]" />
          </div>
          {/* Photo 6 */}
          <div className="overflow-hidden rounded-2xl aspect-[4/3]" style={{ border: "1px solid var(--line)" }}>
            <img src="/images/photography/photo6.jpg" alt="Photo 6" className="w-full h-full object-cover transition duration-500 hover:scale-[1.03]" />
          </div>
          {/* Photo 7 */}
          <div className="overflow-hidden rounded-2xl aspect-[4/3]" style={{ border: "1px solid var(--line)" }}>
            <img src="/images/photography/photo7.jpg" alt="Photo 7" className="w-full h-full object-cover transition duration-500 hover:scale-[1.03]" />
          </div>
          {/* Photo 8 */}
          <div className="overflow-hidden rounded-2xl aspect-[4/3]" style={{ border: "1px solid var(--line)" }}>
            <img src="/images/photography/photo8.jpg" alt="Photo 8" className="w-full h-full object-cover transition duration-500 hover:scale-[1.03]" />
          </div>
          {/* Photo 9 */}
          <div className="overflow-hidden rounded-2xl aspect-[4/3]" style={{ border: "1px solid var(--line)" }}>
            <img src="/images/photography/photo9.jpg" alt="Photo 9" className="w-full h-full object-cover transition duration-500 hover:scale-[1.03]" />
          </div>
          {/* Photo 10 */}
          <div className="overflow-hidden rounded-2xl aspect-[4/3]" style={{ border: "1px solid var(--line)" }}>
            <img src="/images/photography/photo10.jpg" alt="Photo 10" className="w-full h-full object-cover transition duration-500 hover:scale-[1.03]" />
          </div>
          {/* Photo 11 */}
          <div className="overflow-hidden rounded-2xl aspect-[4/3]" style={{ border: "1px solid var(--line)" }}>
            <img src="/images/photography/photo11.jpg" alt="Photo 11" className="w-full h-full object-cover transition duration-500 hover:scale-[1.03]" />
          </div>
          {/* Photo 12 */}
          <div className="overflow-hidden rounded-2xl aspect-[4/3]" style={{ border: "1px solid var(--line)" }}>
            <img src="/images/photography/photo12.jpg" alt="Photo 12" className="w-full h-full object-cover transition duration-500 hover:scale-[1.03]" />
          </div>
        </div>

      </div>

      {/* Navigation Links */}
    </div>
  );
}