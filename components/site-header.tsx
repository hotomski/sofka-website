"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import posthog from "posthog-js";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/PhD", label: "Research" },
  { href: "/life", label: "Life" },
  { href: "/cv", label: "CV" },
];

export function askAllma(source: string) {
  posthog.capture("allma_cta_clicked", { source });
  window.dispatchEvent(new CustomEvent("open-allma"));
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A tap on a link closes the mobile panel.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : Boolean(pathname?.startsWith(href));

  return (
    <header
      className="sticky top-0 z-40 transition-colors"
      style={{
        background: scrolled ? "color-mix(in srgb, var(--paper) 88%, transparent)" : "transparent",
        backdropFilter: scrolled ? "saturate(180%) blur(12px)" : undefined,
        borderBottom: `1px solid ${scrolled ? "var(--line)" : "transparent"}`,
      }}
    >
      <div className="wrap flex h-[72px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Sofija Hotomski, home">
          <Image
            src="/images/profile/avatar.jpg"
            alt=""
            width={72}
            height={72}
            className="h-9 w-9 rounded-full object-cover"
            style={{ border: "1px solid var(--line)" }}
          />
          <span className="display-sm text-[1.05rem]">Sofija Hotomski</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm transition hover:opacity-70"
              style={{
                color: isActive(l.href) ? "var(--spot)" : "var(--ink-2)",
                textUnderlineOffset: "6px",
                textDecoration: isActive(l.href) ? "underline" : "none",
              }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://www.strongme.pro"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog.capture("strongme_link_clicked", { source: "header" })}
            className="text-sm transition hover:opacity-70"
            style={{ color: "var(--ink-2)" }}
          >
            StrongME ↗
          </a>
          <button onClick={() => askAllma("header")} className="btn !px-5 !py-2 text-sm">
            Ask Allma
          </button>
        </nav>

        <button
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="flex h-10 w-10 flex-col items-center justify-center gap-[5px]">
            <span
              className="block h-[1.5px] w-5 transition"
              style={{
                background: "var(--ink)",
                transform: open ? "translateY(3.5px) rotate(45deg)" : undefined,
              }}
            />
            <span
              className="block h-[1.5px] w-5 transition"
              style={{
                background: "var(--ink)",
                transform: open ? "translateY(-3px) rotate(-45deg)" : undefined,
              }}
            />
          </span>
        </button>
      </div>

      {open && (
        <div
          className="md:hidden"
          style={{ background: "var(--paper)", borderTop: "1px solid var(--line)" }}
        >
          <div className="wrap flex flex-col gap-1 py-4">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="py-2 text-base"
                style={{ color: isActive(l.href) ? "var(--spot)" : "var(--ink)" }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://www.strongme.pro"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => posthog.capture("strongme_link_clicked", { source: "mobile-menu" })}
              className="py-2 text-base"
              style={{ color: "var(--ink)" }}
            >
              StrongME ↗
            </a>
            <button
              onClick={() => {
                setOpen(false);
                askAllma("mobile-menu");
              }}
              className="btn mt-3 w-full"
            >
              Ask Allma
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
