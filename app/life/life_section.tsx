import Link from "next/link";

export default function Life() {
    return (
      <div className="p-6 border rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold">LIFE</h1>
        <p className="mt-4">
        What brings joy and balance to my life is a mix of simple yet meaningful moments: spending time with my family, strumming my ukulele and singing, nurturing plants in the garden, staying active through sports, and capturing the world through my lens. Click <Link href="/life" className="custom-link hover:opacity-70 transition">here</Link> to explore the life beyond the LinkedIn profile.
        </p>
      </div>
    );
  }