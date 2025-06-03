import Link from "next/link";

export default function Life() {
    return (
      <div className="p-6 border rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold">LIFE</h1>
        <p className="mt-4">
        What brings joy and balance to my life is a mix of simple yet meaningful moments: spending time with my family, strumming my ukulele and singing (sometimes off-key, always with heart), nurturing plants in the garden, staying active through sports, and capturing the world through my lens.

For over a decade, I’ve stayed committed to Insanity — the high-intensity workout program created by Shaun T, both a physical challenge and a powerful mental reset.

I feel my best when I find myself at the top of a mountain — literally. And living in Switzerland was a good choice. The stillness, the views, the fresh air — it’s where I recharge and reflect.

This section is where I share a glimpse into my personal world. You’ll find pieces of my artwork, including music videos, photography, and snapshots of the people and places that matter most. Click <Link href="/life" className="custom-link hover:opacity-70 transition">here</Link> to explore the life beyond the LinkedIn profile.
        </p>
      </div>
    );
  }