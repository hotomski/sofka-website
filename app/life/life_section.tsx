import Link from "next/link";

export default function Life() {
    return (
      <div className="p-6 border rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold">LIFE</h1>
        <p className="mt-4">
        What brings joy and balance to my life is a mix of simple yet meaningful moments: spending time with my family, strumming my ukulele and singing, nurturing plants in the garden, staying active through sports, and capturing the world through my lens.
        </p>
        <p className="mt-4">
        I feel my best at the top of a mountain, and living in Switzerland makes that surprisingly easy. Beyond the outdoors, I find joy in music, photography, and the people who matter most. This section is where I share a glimpse into my personal world. Click <Link href="/life" className="custom-link hover:opacity-70 transition">here</Link> to explore the life beyond the LinkedIn profile.
        </p>
      </div>
    );
  }