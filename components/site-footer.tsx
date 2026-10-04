"use client";

import Link from "next/link";
import Image from "next/image";
import posthog from "posthog-js";
import { openDigitalSelf } from "./site-header";

const ELSEWHERE = [
  { href: "https://www.strongme.pro", label: "StrongME", event: "strongme_link_clicked" },
  { href: "https://holomost.com", label: "HoloMost", event: "holomost_link_clicked" },
  { href: "https://holopal.app", label: "HoloPal", event: "holopal_link_clicked" },
];

const FIND_ME = [
  { href: "https://www.linkedin.com/in/sofija-hotomski", label: "LinkedIn" },
  { href: "https://github.com/hotomski", label: "GitHub" },
  { href: "https://www.instagram.com/photomsky/?hl=en", label: "Instagram" },
  { href: "https://www.flickr.com/photos/141897629@N07/", label: "Flickr" },
];

export default function SiteFooter() {
  return (
    <footer className="hairline mt-8">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/profile/avatar.jpg"
              alt=""
              width={88}
              height={88}
              className="h-11 w-11 rounded-full object-cover"
              style={{ border: "1px solid var(--line)" }}
            />
            <span className="display-sm text-lg">Sofija Hotomski</span>
          </div>
          <p className="mt-4 max-w-xs text-sm" style={{ color: "var(--ink-2)" }}>
            Product, AI and a PhD in computer science. Based in Zurich, at my best at the top of a
            mountain.
          </p>
          <button onClick={() => openDigitalSelf("footer")} className="btn-ghost mt-5 !py-2 !text-sm">
            Ask my digital self
          </button>
        </div>

        <nav className="flex flex-col gap-3 text-sm">
          <span className="eyebrow">This site</span>
          {[
            { href: "/", label: "Home" },
            { href: "/work", label: "Work" },
            { href: "/PhD", label: "Research" },
            { href: "/publications", label: "Publications" },
            { href: "/life", label: "Life" },
            { href: "/cv", label: "CV" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:opacity-70" style={{ color: "var(--ink-2)" }}>
              {l.label}
            </Link>
          ))}
        </nav>

        <nav className="flex flex-col gap-3 text-sm">
          <span className="eyebrow">Elsewhere</span>
          {ELSEWHERE.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => posthog.capture(l.event, { source: "footer" })}
              className="transition hover:opacity-70"
              style={{ color: "var(--ink-2)" }}
            >
              {l.label} ↗
            </a>
          ))}
        </nav>
        <nav className="flex flex-col gap-3 text-sm">
          <span className="eyebrow">Find me</span>
          {FIND_ME.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => posthog.capture("social_link_clicked", { network: l.label })}
              className="transition hover:opacity-70"
              style={{ color: "var(--ink-2)" }}
            >
              {l.label} ↗
            </a>
          ))}
        </nav>
      </div>

      <div className="hairline">
        <div className="wrap flex flex-wrap items-center justify-between gap-2 py-6 text-xs" style={{ color: "var(--ink-3)" }}>
          <span>© {new Date().getFullYear()} Sofija Hotomski</span>
          <span>Built with Next.js. My digital self answers when I am away.</span>
        </div>
      </div>
    </footer>
  );
}
