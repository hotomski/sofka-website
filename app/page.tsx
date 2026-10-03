"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";
import { askAllma } from "../components/site-header";
import "./style/link_style.css";

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FACTS = [
  "PhD in computer science",
  "10+ years in product",
  "Siemens · Schneider Electric · ASMIQ",
  "Founder of StrongME",
  "Co-founder of HoloMost",
];

const GALLERY = [
  { src: "/images/photography/photo11.jpg", alt: "Rowing boats on an alpine lake" },
  { src: "/images/photography/photo4.jpg", alt: "A path covered in yellow autumn leaves" },
  { src: "/images/photography/photo6.jpg", alt: "An alpine bird perched above a valley" },
  { src: "/images/photography/photo10.jpg", alt: "Morning dew on golden grasses" },
  { src: "/images/photography/photo3.jpg", alt: "Rooftops above the bay in Nice" },
  { src: "/images/photography/photo7.jpg", alt: "A woman in a blue dress in a colourful street" },
]

const QUESTIONS = [
  "Summarise her working experience",
  "What is HoloPal?",
  "What does she do for fun?",
];

export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      <section className="wrap pb-10 pt-10 md:pb-16 md:pt-20">
        <div className="grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
          <div>
            <h1 className="display text-[clamp(2.6rem,6.1vw,4.6rem)]">
              Hey, I&apos;m Sofija.
            </h1>
            <p className="mt-7 max-w-xl text-xl leading-snug md:text-2xl" style={{ color: "var(--ink)" }}>
              Product professional with over a decade of experience, from strategy to delivery,
              from enterprise to startup.
            </p>
            <p className="lede mt-5 max-w-xl">
              PhD in computer science, AI enthusiast, founder of{" "}
              <a
                href="https://www.strongme.pro"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => posthog.capture("strongme_link_clicked", { source: "hero" })}
                className="ink-link"
              >
                StrongME
              </a>
              , and a mum of two, easily the most complex, most rewarding product I have ever
              shipped.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button onClick={() => askAllma("hero")} className="btn">
                Ask Allma anything
              </button>
              <Link href="/work" className="btn-ghost">
                See my work <Arrow />
              </Link>
            </div>
            <p className="mt-4 text-sm" style={{ color: "var(--ink-3)" }}>
              Allma is the chatbot I built on my own words. She knows almost everything about me.
            </p>
          </div>

          {/* Portrait */}
          <div className="relative mx-auto w-full max-w-[420px]">
            <div
              className="absolute -bottom-5 -right-4 -z-10 h-[88%] w-[88%] rounded-[28px]"
              style={{ background: "var(--spot-soft)" }}
              aria-hidden="true"
            />
            <div className="arch" style={{ border: "1px solid var(--line)" }}>
              <Image
                src="/images/profile/portrait.jpg"
                alt="Sofija Hotomski, sitting in front of three framed autumn prints"
                width={672}
                height={840}
                priority
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 90vw, 420px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- Fact strip */}
      <section className="wrap">
        <ul
          className="hairline flex flex-wrap gap-x-7 gap-y-2 py-6 text-sm"
          style={{ color: "var(--ink-2)" }}
        >
          {FACTS.map((f) => (
            <li key={f} className="flex items-center gap-3">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--spot)" }}
                aria-hidden="true"
              />
              {f}
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------- Selected work */}
      <section className="wrap section">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display-sm text-[clamp(1.9rem,4vw,2.8rem)]">Things I have built</h2>
          <Link href="/work" className="arrow-link">
            All of my work <Arrow />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Featured */}
          <article
            className="card card-hover md:col-span-2"
            style={{ background: "var(--paper-2)" }}
          >
            <div>
              <div>
                <p className="eyebrow">Most recently</p>
                <h3 className="display-sm mt-3 text-2xl md:text-3xl">HoloMost &amp; HoloPal</h3>
                <p className="prose-ink mt-4 max-w-xl">
                  <span>
                    I co-founded HoloMost and built HoloPal, an AI-powered platform that lets
                    people preserve and share their knowledge as a holographic digital self.
                  </span>
                </p>
                <div className="mt-6 flex flex-wrap gap-5">
                  <a
                    href="https://holomost.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => posthog.capture("holomost_link_clicked", { source: "home" })}
                    className="arrow-link"
                  >
                    holomost.com <Arrow />
                  </a>
                  <a
                    href="https://holopal.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => posthog.capture("holopal_link_clicked", { source: "home" })}
                    className="arrow-link"
                  >
                    holopal.app <Arrow />
                  </a>
                </div>
              </div>
            </div>
          </article>

          {/* StrongME, with a photo */}
          <article className="card card-hover !p-0 overflow-hidden">
            <div className="relative aspect-[16/10]">
              <Image
                src="/images/sport/Foto2.jpg"
                alt="Sofija outdoors in sportswear"
                fill
                className="object-cover"
                style={{ objectPosition: "center 18%" }}
                sizes="(max-width: 768px) 92vw, 540px"
              />
            </div>
            <div className="p-7 md:p-9">
              <p className="eyebrow">Founded</p>
              <h3 className="display-sm mt-3 text-2xl">StrongME</h3>
              <p className="prose-ink mt-3">
                A fitness and mindfulness concept I built from zero: the class concept, the
                website, the pitch to get the room, the marketing, the first customers. The ones
                who keep coming back week after week, for months, are the part I am proudest of.
              </p>
              <a
                href="https://www.strongme.pro"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => posthog.capture("strongme_link_clicked", { source: "home_card" })}
                className="arrow-link mt-5"
              >
                strongme.pro <Arrow />
              </a>
            </div>
          </article>

          <div className="grid gap-6">
            <article className="card card-hover">
              <p className="eyebrow">Architected</p>
              <h3 className="display-sm mt-3 text-2xl">Isca</h3>
              <p className="prose-ink mt-3">
                A RAG-based AI chatbot for International School Community, a platform with more
                than 40,000 users.
              </p>
              <a
                href="https://internationalschoolcommunity.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => posthog.capture("isc_link_clicked", { source: "home" })}
                className="arrow-link mt-5"
              >
                internationalschoolcommunity.com <Arrow />
              </a>
            </article>

            <article className="card card-hover">
              <p className="eyebrow">Researched</p>
              <h3 className="display-sm mt-3 text-2xl">GuideGen</h3>
              <p className="prose-ink mt-3">
                My PhD work: when a requirement changes, GuideGen tells testers in plain language
                how to adapt the acceptance tests, and warns everyone when the two drift apart.
              </p>
              <div className="mt-5 flex flex-wrap gap-5">
                <Link href="/PhD" className="arrow-link">
                  The project <Arrow />
                </Link>
                <Link href="/publications" className="arrow-link">
                  Publications <Arrow />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Life */}
      <section className="overflow-hidden" style={{ background: "var(--paper-2)" }}>
        <div className="wrap section">
          <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-end">
            <div>
              <p className="eyebrow">Life</p>
              <h2 className="display-sm mt-3 text-[clamp(1.9rem,4vw,2.8rem)]">
                Beyond the LinkedIn profile
              </h2>
            </div>
            <div>
              <p className="prose-ink">
                <span>
                  What brings joy and balance to my life is a mix of simple yet meaningful moments:
                  time with my family, strumming my ukulele and singing, nurturing plants in the
                  garden, staying active through sports, and capturing the world through my lens. I
                  feel my best at the top of a mountain, and living in Switzerland makes that
                  surprisingly easy.
                </span>
              </p>
              <Link
                href="/life"
                onClick={() => posthog.capture("life_section_clicked", { source: "home" })}
                className="arrow-link mt-5"
              >
                Take a look around <Arrow />
              </Link>
            </div>
          </div>

          <div className="mt-10 -mr-5 flex gap-4 overflow-x-auto pb-2 sm:-mr-8 lg:-mr-[max(0px,calc((100vw-1140px)/2))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {GALLERY.map((g, i) => (
              <Link
                key={g.src}
                href="/life/photography"
                onClick={() => posthog.capture("photography_tile_clicked", { index: i })}
                className="relative h-[200px] w-[280px] shrink-0 overflow-hidden rounded-2xl md:h-[240px] md:w-[340px]"
                style={{ border: "1px solid var(--line)" }}
              >
                <Image src={g.src} alt={g.alt} fill className="object-cover transition duration-500 hover:scale-[1.04]" sizes="340px" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Allma */}
      <section style={{ background: "var(--deep)", color: "var(--deep-ink)" }}>
        <div className="wrap section">
          <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-center">
            <Image
              src="/chatbotIcon.png"
              alt=""
              width={160}
              height={160}
              className="h-28 w-28 rounded-full object-cover md:h-36 md:w-36"
            />
            <div>
              <h2 className="display-sm text-[clamp(1.9rem,4vw,2.8rem)]">
                Meet Allma, ask her anything
              </h2>
              <p className="mt-4 max-w-xl text-base md:text-lg" style={{ color: "#cfc6bd" }}>
                Allma is a chatbot I built on everything on this site. She answers for me when I am
                away, and she is honest when she does not know.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      posthog.capture("allma_suggestion_clicked", { question: q });
                      window.dispatchEvent(
                        new CustomEvent("open-allma", { detail: { question: q } })
                      );
                    }}
                    className="rounded-full px-4 py-2 text-sm transition hover:opacity-80"
                    style={{ border: "1px solid var(--deep-line)", color: "var(--deep-ink)" }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
