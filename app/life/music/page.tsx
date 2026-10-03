"use client";

import '../../style/link_style.css';

export default function MusicPage() {
  return (
    <div className="w-full flex flex-col items-center px-5 py-12 font-sans">
            {/* Page Title */}

            <h1 className="display text-6xl mt-8 mb-12 tracking-tight">Music Projects</h1>
      
      {/* Content Wrapper with White Background */}
      <div className="card p-8 max-w-5xl w-full">
    

        {/* Description */}
        <p className="mt-6 text-lg leading-relaxed text-justify max-w-3xl mx-auto">
          Before I ever strummed a ukulele, I actually started out playing guitar. My teacher was Momčilo Sotra—a talented musician and a good friend from Novi Sad. He played in a few awesome bands like Saigon Express, Microsonic, and Prijateljska Vatra. Thanks to him, I got my first taste of making music, and I was hooked. Momčilo and I played songs by the Ramones and The Beatles, which made learning even more fun and inspiring.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-justify max-w-3xl mx-auto">
          Then in 2018, I discovered Grace VanderWaal (yes, the Golden Buzzer girl from America’s Got Talent) and thought, “Wait a minute… if this amazing little human can do it, why can’t I?”
        </p>
        <p className="mt-4 text-lg leading-relaxed text-center max-w-3xl mx-auto">
          So I did.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-justify max-w-3xl mx-auto">
          I started learning, playing, and recording covers—some sweet, some funny, and a few that are so cringe they could qualify as musical bloopers. But hey, I keep them up on my YouTube channel because they show how far I’ve come (and they make for great blackmail material… for myself).
        </p>

     {/* Videos Section */}
<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* New Video - YouTube Embed */}
  <div className="p-4 card">
    <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", height: 0 }} className="rounded-lg overflow-hidden">
      <iframe
        src="https://www.youtube.com/embed/naUGXIaxnY8"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        className="rounded-lg"
      ></iframe>
    </div>
  </div>

  {/* Video 1 - YouTube Embed */}
  <div className="p-4 card">
    <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", height: 0 }} className="rounded-lg overflow-hidden">
      <iframe
        src="https://www.youtube.com/embed/7Qb8zarrdH8"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        className="rounded-lg"
      ></iframe>
    </div>
  </div>

  {/* Video 2 - YouTube Embed */}
  <div className="p-4 card">
    <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", height: 0 }} className="rounded-lg overflow-hidden">
      <iframe
        src="https://www.youtube.com/embed/caqAJ4bXAqU"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        className="rounded-lg"
      ></iframe>
    </div>
  </div>

  {/* Video 3 - YouTube Embed */}
  <div className="p-4 card">
    <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", height: 0 }} className="rounded-lg overflow-hidden">
      <iframe
        src="https://www.youtube.com/embed/Hg9STqgvUto"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        className="rounded-lg"
      ></iframe>
    </div>
  </div>

  {/* Video 4 - YouTube Embed */}
  <div className="p-4 card">
    <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", height: 0 }} className="rounded-lg overflow-hidden">
      <iframe
        src="https://www.youtube.com/embed/EXcnxJFEYlY"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        className="rounded-lg"
      ></iframe>
    </div>
  </div>

 {/* Video 5 - YouTube Embed */}
 <div className="p-4 card">
    <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", height: 0 }} className="rounded-lg overflow-hidden">
      <iframe
        src="https://www.youtube.com/embed/zrstXJhF-wY"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        className="rounded-lg"
      ></iframe>
    </div>
  </div>
  
</div>

        {/* Navigation Links */}
      </div>
    </div>
  );
}