"use client";

import Link from "next/link";
import posthog from "posthog-js";
import { 
  FaUsers,         // Friends (bigger group)
  FaLeaf, 
  FaMusic, 
  FaCamera, 
  FaUserFriends,   // Family (smaller group)
  FaRunning        // Sport (HIIT/running)
} from "react-icons/fa";

export default function LifePage() {
  return (
    <div
      className="pb-4"
    >
      <div className="flex flex-col items-center justify-center px-4 md:px-8 py-16 font-sans max-w-5xl mx-auto">
        {/* Page Title */}
        <h1 className="display text-5xl md:text-6xl mt-8 tracking-tight">Life</h1>
        <p className="mt-6 text-lg md:text-xl leading-relaxed text-center max-w-2xl">
          Explore my personal stories and things that excite me.
        </p>

        {/* Subsections */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full">
          {/* Family (smaller group) */}
          <Link
            href="/life/family"
            onClick={() => posthog.capture("life_category_clicked", { category: "family" })}
            className="p-6 md:p-8 card card-hover w-full h-[150px] md:h-[200px] flex flex-col items-center justify-center !p-5"
          >
            <FaUserFriends className="text-[var(--spot)] text-4xl md:text-5xl mb-4" />
            <h1 className="display text-xl md:text-2xl font-bold text-center">Family</h1>
          </Link>

          {/* Music */}
          <Link
            href="/life/music"
            onClick={() => posthog.capture("life_category_clicked", { category: "music" })}
            className="p-6 md:p-8 card card-hover w-full h-[150px] md:h-[200px] flex flex-col items-center justify-center !p-5"
          >
            <FaMusic className="text-[var(--spot)] text-4xl md:text-5xl mb-4" />
            <h1 className="display text-xl md:text-2xl font-bold text-center">Music</h1>
          </Link>

          {/* Photography */}
          <Link
            href="/life/photography"
            onClick={() => posthog.capture("life_category_clicked", { category: "photography" })}
            className="p-6 md:p-8 card card-hover w-full h-[150px] md:h-[200px] flex flex-col items-center justify-center !p-5"
          >
            <FaCamera className="text-[var(--spot)] text-4xl md:text-5xl mb-4" />
            <h1 className="display text-xl md:text-2xl font-bold text-center">Photography</h1>
          </Link>

          {/* Gardening */}
          <Link
            href="/life/gardening"
            onClick={() => posthog.capture("life_category_clicked", { category: "gardening" })}
            className="p-6 md:p-8 card card-hover w-full h-[150px] md:h-[200px] flex flex-col items-center justify-center !p-5"
          >
            <FaLeaf className="text-[var(--spot)] text-4xl md:text-5xl mb-4" />
            <h1 className="display text-xl md:text-2xl font-bold text-center">Gardening</h1>
          </Link>

          {/* Friends (bigger group) */}
          <Link
            href="/life/friends"
            onClick={() => posthog.capture("life_category_clicked", { category: "friends" })}
            className="p-6 md:p-8 card card-hover w-full h-[150px] md:h-[200px] flex flex-col items-center justify-center !p-5"
          >
            <FaUsers className="text-[var(--spot)] text-4xl md:text-5xl mb-4" />
            <h1 className="display text-xl md:text-2xl font-bold text-center">Friends</h1>
          </Link>

          {/* Sport (HIIT / running) */}
          <Link
            href="/life/sport"
            onClick={() => posthog.capture("life_category_clicked", { category: "sport" })}
            className="p-6 md:p-8 card card-hover w-full h-[150px] md:h-[200px] flex flex-col items-center justify-center !p-5"
          >
            <FaRunning className="text-[var(--spot)] text-4xl md:text-5xl mb-4" />
            <h1 className="display text-xl md:text-2xl font-bold text-center">Sport</h1>
          </Link>
        </div>

        {/* Bottom Navigation (inside the inner container like Work) */}
      </div>
    </div>
  );
}
