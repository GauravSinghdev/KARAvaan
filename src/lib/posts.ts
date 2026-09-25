import { ensurePostTable, prisma } from "@/lib/prisma";

export const featuredStories = [
  {
    slug: "the-blue-hour-in-lisbon",
    title: "The blue hour in Lisbon",
    location: "Lisbon",
    country: "Portugal",
    date: "October 2024",
    category: "City notes",
    excerpt: "A city of tiled facades, uphill trams, and the kind of evening that asks you to stay a little longer.",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1600&q=85",
    alt: "Warm terracotta rooftops climbing a hill in Lisbon",
    number: "01",
    size: "large",
  },
  {
    slug: "somewhere-slow-in-kyoto",
    title: "Somewhere slow in Kyoto",
    location: "Kyoto",
    country: "Japan",
    date: "April 2024",
    category: "Slow travel",
    excerpt: "Morning light, quiet lanes, and learning to leave the map folded in your pocket.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85",
    alt: "Traditional wooden street in Kyoto framed by a red pagoda",
    number: "02",
    size: "small",
  },
  {
    slug: "a-weekend-by-the-ligurian-sea",
    title: "A weekend by the Ligurian Sea",
    location: "Cinque Terre",
    country: "Italy",
    date: "June 2023",
    category: "Coastlines",
    excerpt: "Colorful little villages, salt in the air, and lunches that stretch into the afternoon.",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=85",
    alt: "Colorful coastal villages beside the Ligurian Sea",
    number: "03",
    size: "small",
  },
];

export type Story = {
  slug: string;
  title: string;
  location: string;
  country: string;
  visitedAt: Date | string;
  excerpt: string;
  coverImage: string;
  imageAlt: string;
  content?: string;
  category?: string;
  number?: string;
  size?: string;
  viewCount?: number;
};

export async function getStories(limit = 3): Promise<Story[]> {
  try {
    await ensurePostTable();
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: [{ viewCount: "desc" }, { visitedAt: "desc" }],
      take: limit,
    });
    if (posts.length) return posts;
  } catch {
    // Keep the portfolio viewable before a database has been configured.
  }
  return featuredStories.map((story) => ({
    ...story,
    visitedAt: new Date(story.date),
    coverImage: story.image,
    imageAlt: story.alt,
    viewCount: 0,
  })).sort((a, b) => new Date(b.visitedAt).getTime() - new Date(a.visitedAt).getTime()).slice(0, limit);
}

export async function getAllStories(): Promise<Story[]> {
  try {
    await ensurePostTable();
    return await prisma.post.findMany({
      where: { published: true },
      orderBy: [{ viewCount: "desc" }, { visitedAt: "desc" }],
    });
  } catch {
    return featuredStories.map((story) => ({
      ...story,
      visitedAt: new Date(story.date),
      coverImage: story.image,
      imageAlt: story.alt,
      viewCount: 0,
    })).sort((a, b) => new Date(b.visitedAt).getTime() - new Date(a.visitedAt).getTime());
  }
}

export async function getStory(slug: string): Promise<Story | null> {
  try {
    await ensurePostTable();
    const post = await prisma.post.findFirst({ where: { slug, published: true } });
    if (post) return post;
  } catch {
    // Fall back to the featured editorial stories during initial setup.
  }
  const fallback = featuredStories.find((story) => story.slug === slug);
  return fallback
    ? { ...fallback, visitedAt: new Date(fallback.date), coverImage: fallback.image, imageAlt: fallback.alt }
    : null;
}
