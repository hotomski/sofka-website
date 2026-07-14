import Link from 'next/link'; 

export default function Work() {
    return (
      <div className="p-6 border rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold">WORK</h1>
        <p className="mt-4">
        Product professional with over a decade of international experience across enterprise, startup, and academic environments. PhD in Computer Science. I blend deep technical know-how with product strategy and hands-on delivery.
        </p>
        <p className="mt-4">
        Most recently, I co-founded <a href="https://holomost.com" target="_blank" rel="noopener noreferrer" className="custom-link hover:opacity-70 transition">HoloMost</a> and built <a href="https://holopal.app" target="_blank" rel="noopener noreferrer" className="custom-link hover:opacity-70 transition">HoloPal</a> — an AI-powered platform that lets people preserve and share their knowledge as a holographic digital self. I also architected <em>Isca</em>, a RAG-based AI chatbot for <a href="https://internationalschoolcommunity.com" target="_blank" rel="noopener noreferrer" className="custom-link hover:opacity-70 transition">International School Community</a> (40,000+ users), and founded <a href="https://www.strongme.pro" target="_blank" rel="noopener noreferrer" className="custom-link hover:opacity-70 transition">StrongME</a>. <Link href="/work" className="custom-link hover:opacity-70 transition">More...</Link>
        </p>
      </div>
    );
  }