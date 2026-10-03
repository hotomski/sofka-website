import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import Chatbot from "../components/chatbot";

// Both self-hosted from Fontshare, one variable file each.
// Satoshi carries the text, Sentient the headings.
const satoshi = localFont({
  variable: "--font-satoshi",
  display: "swap",
  src: [
    { path: "./fonts/Satoshi-Variable.woff2", weight: "300 900", style: "normal" },
    { path: "./fonts/Satoshi-VariableItalic.woff2", weight: "300 900", style: "italic" },
  ],
});

const sentient = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    { path: "./fonts/Sentient-Variable.woff2", weight: "200 700", style: "normal" },
    { path: "./fonts/Sentient-VariableItalic.woff2", weight: "200 700", style: "italic" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hotomski.com"),
  title: {
    default: "Sofija Hotomski",
    template: "%s — Sofija Hotomski",
  },
  description:
    "Product professional with over a decade of experience, a PhD in computer science, founder of StrongME and co-founder of HoloMost.",
  openGraph: {
    title: "Sofija Hotomski",
    description:
      "Product professional with over a decade of experience, a PhD in computer science, founder of StrongME and co-founder of HoloMost.",
    url: "https://hotomski.com",
    siteName: "Sofija Hotomski",
    images: [{ url: "/images/profile/og.jpg", width: 1200, height: 628 }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${satoshi.variable} ${sentient.variable} antialiased`}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <Chatbot />
      </body>
    </html>
  );
}
