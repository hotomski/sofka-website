"use client";

import Image from "next/image";
import "../../style/link_style.css";
import { useState } from "react";

export default function FriendsPage() {
  const images = [
    ...Array.from({ length: 25 }, (_, i) => ({
      src: `/images/friends/Foto${i + 1}.jpg`,
      alt: `Friends ${i + 1}`,
    })),
    { src: "/images/friends/Foto9a.jpg", alt: "Friends 9a" },
    { src: "/images/friends/Foto11a.jpg", alt: "Friends 11a" },
    { src: "/images/friends/Foto12a.jpg", alt: "Friends 12a" },
    { src: "/images/friends/Foto14a.jpg", alt: "Friends 14a" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div
      className="w-full flex flex-col items-center px-4 md:px-8 py-10 md:py-14 font-sans"
    >
      <h1 className="display text-6xl mt-8 mb-12 tracking-tight text-center">
        My friends
      </h1>

      <div className="mt-8 flex flex-wrap gap-8 justify-center max-w-5xl">
        <div className="p-8 card flex-1 min-w-[300px]">
          <h2 className="display-sm text-xl font-semibold mb-3">
            Friendships teach us who we are
          </h2>

          <p className="text-lg leading-relaxed">
            OK, so I am that supersocial person, as my sister would say &quot;a
            social butterfly&quot;.
          </p>

          <p className="text-lg leading-relaxed">
            I keep in touch with people from my highschool and university days
            and I am so grateful for all the experiences we&apos;ve been
            through. Those people are an integral part of me and I miss them
            deeply now when we see each other so rarely.
          </p>

          <p className="text-lg leading-relaxed">
            Life brings also new friendships and I am one of those who really
            loves meeting new people, hearing new stories and sharing mine. I am
            so grateful for all the friends I met in my new life, once I moved
            to Zurich.
          </p>

          <p className="text-lg leading-relaxed">
            In the gallery below, you can see some of my dearest friends and I
            am sure the images are not complete &mdash; there are so many more
            who hate being pictured.
          </p>

          <div className="relative my-8">
            <div className="relative w-full h-[260px] md:h-[370px] flex items-center justify-center overflow-hidden">
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                width={600}
                height={400}
                className="max-h-[220px] md:max-h-[340px] w-auto max-w-full object-contain rounded-lg shadow"
                priority
              />
            </div>

            <button
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 text-white bg-[var(--deep)] px-2 py-1 rounded-full shadow-md hover:opacity-80 text-xs md:px-4 md:py-2 md:text-sm"
            >
              Prev
            </button>

            <button
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 text-white bg-[var(--deep)] px-2 py-1 rounded-full shadow-md hover:opacity-80 text-xs md:px-4 md:py-2 md:text-sm"
            >
              Next
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Navigation - simple, no background */}
    </div>
  );
}
