"use client";

import '../../style/link_style.css';

export default function GardeningPage() {
  return (
    <div className="flex flex-col items-center px-5 py-12 font-sans">

         {/* Page Title */}
         <h1 className="display text-6xl mt-8 mb-12 tracking-tight">Gardening</h1>
     

      {/* Content Wrapper with White Background */}
      <div className="card p-8 max-w-5xl w-full">

        {/* Description */}
        <p className="mt-6 text-lg leading-relaxed text-justify max-w-3xl mx-auto">
           Here&apos;s a short story about my first real gardening adventure. It all started in March 2025 when I decided to roll up my sleeves and dive into the world of gardening.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-justify max-w-3xl mx-auto">
          With a mix of excitement and beginner&apos;s optimism, I planted tomatoes, cucumbers, zucchini, carrots, spring onions, radishes, and spinach — all from seed. It’s been a rewarding (and slightly muddy) journey that involves a lot of watering, nurturing, and hoping the plants read the manual on how to grow.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-justify max-w-3xl mx-auto">
          So far, we tasted all of our beautiful veggies – radishes, spring onions, carrots and tomatoes. The rest – sorry! Here are the short sad stories:
          <br /><br />
          <span className="font-semibold">Spinach:</span> I didn&apos;t know when is the right time to pick it, so it started to bloom and didn&apos;t look like spinach at all. Or they sold me seeds of something that wasn&apos;t spinach at all – we&apos;ll never know.
          <br /><br />
          <span className="font-semibold">Zucchini:</span> they just died. Not sure why but not even one zucchini survived although I gave the water regularly. Sorry zucchini!
          <br /><br />
          <span className="font-semibold">Cucumbers:</span> drama queens. I gave my best but nope. The last two were eaten by some bugs in the soil. 🤷‍♀️
        </p>

        {/* Photos Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

           {/* Photo 1 */}
           <div className="overflow-hidden rounded-2xl aspect-[4/3]" style={{ border: "1px solid var(--line)" }}>
            <img src="/images/gardening/photo5.jpg" alt="Gardening Photo 5" className="w-full h-full object-cover transition duration-500 hover:scale-[1.03]" />
          </div>
          {/* Photo 2 */}
          <div className="overflow-hidden rounded-2xl aspect-[4/3]" style={{ border: "1px solid var(--line)" }}>
            <img src="/images/gardening/photo6.jpg" alt="Gardening Photo 6" className="w-full h-full object-cover transition duration-500 hover:scale-[1.03]" />
          </div>
          {/* Photo 3 */}
          <div className="overflow-hidden rounded-2xl aspect-[4/3]" style={{ border: "1px solid var(--line)" }}>
            <img src="/images/gardening/photo1.jpg" alt="Gardening Photo 1" className="w-full h-full object-cover transition duration-500 hover:scale-[1.03]" />
          </div>

          {/* Photo 4 */}
          <div className="overflow-hidden rounded-2xl aspect-[4/3]" style={{ border: "1px solid var(--line)" }}>
            <img src="/images/gardening/photo4.jpg" alt="Gardening Photo 4" className="w-full h-full object-cover transition duration-500 hover:scale-[1.03]" />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Photo 5 */}
          <div className="overflow-hidden rounded-2xl aspect-[4/3]" style={{ border: "1px solid var(--line)" }}>
            <img src="/images/gardening/photo2.jpg" alt="Gardening Photo 2" className="w-full h-full object-cover transition duration-500 hover:scale-[1.03]" />
          </div>

          {/* Photo 6 */}
          <div className="overflow-hidden rounded-2xl aspect-[4/3]" style={{ border: "1px solid var(--line)" }}>
            <img src="/images/gardening/photo3.jpg" alt="Gardening Photo 3" className="w-full h-full object-cover transition duration-500 hover:scale-[1.03]" />
          </div>
             
        </div>

      </div>

      {/* Navigation Links BELOW the white rectangle */}
    </div>
  );
}