import Link from 'next/link'; 

export default function Work() {
    return (
      <div className="p-6 border rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold">WORK</h1>
        <p className="mt-4">
        Product professional with over a decade of international experience across enterprise, startup, and academic environments. PhD in Computer Science. I blend deep technical know-how with product strategy and hands-on delivery.
        </p>
        <p className="mt-4">
        Most recently, I architected and built <em>Isca</em> — a RAG-based AI chatbot for <a href="https://internationalschoolcommunity.com" target="_blank" rel="noopener noreferrer" className="custom-link hover:opacity-70 transition">International School Community</a>, a platform with 40,000+ users and 55,000+ member-submitted reviews of schools worldwide. I also founded <a href="https://www.strongme.pro" target="_blank" rel="noopener noreferrer" className="custom-link hover:opacity-70 transition">StrongME</a> — a movement and wellness concept — taking both from idea to live. <Link href="/work" className="custom-link hover:opacity-70 transition">More...</Link>
        </p>
      </div>
    );
  }