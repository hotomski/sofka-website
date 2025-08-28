"use client";

import Link from "next/link";
import '../../style/link_style.css';
import Chatbot from "../../../components/chatbot";

export default function GardeningPage() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed text-black flex flex-col items-center justify-center px-8 py-16 font-sans"
      style={{ backgroundImage: "url('/background_flower.jpg')" }}>

        {/* Top Navigation - left-centered, pill-shaped background */}
      <nav className="w-full max-w-5xl mx-auto flex flex-wrap justify-start items-center gap-4 md:gap-8 py-3 px-4 bg-white bg-opacity-80 rounded-xl shadow-md mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          <Link href="/" className="hover:opacity-70 transition text-black font-semibold">Home</Link>
          <Link href="/cv" className="hover:opacity-70 transition text-black font-semibold">CV</Link>
          <Link href="/work" className="hover:opacity-70 transition text-black font-semibold">Work</Link>
          <Link href="/life" className="hover:opacity-70 transition text-black font-semibold">Life</Link>
        </div>
      </nav>
      
         {/* Page Title */}
         <h1 className="text-6xl font-extrabold mt-8 mb-12 tracking-tight">Gardening</h1>
     

      {/* Content Wrapper with White Background */}
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 max-w-5xl w-full">

        {/* Description */}
        <p className="mt-6 text-lg leading-relaxed text-black text-justify max-w-3xl mx-auto">
          Since March 2025, I&apos;ve been on garden leave — and I decided to take it quite literally! I rolled up my sleeves, grabbed some seeds, and started my first real gardening adventure.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-black text-justify max-w-3xl mx-auto">
          With a mix of excitement and beginner&apos;s optimism, I planted tomatoes, cucumbers, zucchini, carrots, spring onions, radishes, and spinach — all from seed. It’s been a rewarding (and slightly muddy) journey that involves a lot of watering, nurturing, and hoping the plants read the manual on how to grow.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-black text-justify max-w-3xl mx-auto">
          So far, we tasted all of our beautiful veggies – radishes, spring onions, carrots and tomatoes. The rest – sorry! Here are the short sad stories:
          <br /><br />
          <span className="font-semibold">Spinach:</span> I didn't know when is the right time to pick it, so it started to bloom and didn't look like spinach at all. Or they sold me seeds of something that wasn't spinach at all – we'll never know. 🙂
          <br /><br />
          <span className="font-semibold">Zucchini:</span> they just died. Not sure why but not even one zucchini survived although I gave the water regularly. Sorry zucchini!
          <br /><br />
          <span className="font-semibold">Cucumbers:</span> drama queens. I gave my best but nope. The last two were eaten by some bugs in the soil. 🤷‍♀️
        </p>

        {/* Photos Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Photo 1 */}
          <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200">
            <img src="/images/gardening/photo1.jpg" alt="Gardening Photo 1" className="w-full h-[32rem] object-cover rounded-lg" />
          </div>

          {/* Photo 2 */}
          <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200">
            <img src="/images/gardening/photo4.jpg" alt="Gardening Photo 4" className="w-full h-[32rem] object-cover rounded-lg" />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Photo 3 */}
          <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200">
            <img src="/images/gardening/photo2.jpg" alt="Gardening Photo 2" className="w-full rounded-lg" />
          </div>

          {/* Photo 4 */}
          <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200">
            <img src="/images/gardening/photo3.jpg" alt="Gardening Photo 3" className="w-full rounded-lg" />
          </div>
             {/* Photo 5 */}
             <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200">
            <img src="/images/gardening/photo5.jpg" alt="Gardening Photo 3" className="w-full rounded-lg" />
          </div>
             {/* Photo 6 */}
             <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg border border-gray-200">
            <img src="/images/gardening/photo6.jpg" alt="Gardening Photo 3" className="w-full rounded-lg" />
          </div>
        </div>

        <Chatbot />
      </div>

      {/* Navigation Links BELOW the white rectangle */}
      <nav className="mt-12 w-full flex flex-wrap justify-center gap-6 text-lg font-medium">
        <Link href="/" className="hover:opacity-70 transition text-black">Home</Link>
        <Link href="/cv" className="hover:opacity-70 transition text-black">CV</Link>
        <Link href="/work" className="hover:opacity-70 transition text-black">Work</Link>
        <Link href="/life" className="hover:opacity-70 transition text-black">Life</Link>
      </nav>
    </div>
  );
}