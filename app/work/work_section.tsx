import Link from 'next/link'; 

export default function Work() {
    return (
      <div className="p-6 border rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold">WORK</h1>
        <p className="mt-4">
        I’m a Product Manager with a PhD in Computer Science and over a decade of international experience across a range of industries — including power grid management, publishing, fire safety, and academic research. I’ve worked on cloud-based SaaS platforms, CRM systems, industrial SCADA applications, and AI/NLP research projects.
        </p>
        <p className="mt-4">
        At Siemens, I led the global digital transformation of fire safety systems. Earlier in my career, I conducted AI-driven research in requirements engineering during my PhD at the University of Zurich, collaborating closely with industry partners. I’ve also held product and engineering roles at Schneider Electric, Siemens DMS, and Swiss Post’s ASMIQ AG, blending deep technical insight with strategic product leadership. <Link href="/work" className="custom-link hover:opacity-70 transition">More...</Link>
        </p>
      </div>
    );
  }