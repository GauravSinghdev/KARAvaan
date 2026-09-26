import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { getStory } from "@/lib/posts";
import { ViewTracker } from "./view-tracker";
import Footer from "@/components/Footer";
import Appbar from "@/components/Appbar";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = await getStory(slug);
  return story
    ? { title: `${story.title} — Karavaan`, description: story.excerpt }
    : { title: "Story not found — Karavaan" };
}

export default async function JournalEntry({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) notFound();
  const date = new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(new Date(story.visitedAt));
  return (
    <main className="min-h-screen bg-[#f5f2e9]">
      <ViewTracker slug={story.slug} />
      <Appbar/>
      <article className="mx-auto max-w-[1200px] px-6 pb-20 md:px-14">
        <div className="relative mt-3 h-[380px] overflow-hidden bg-[#c7cec2] md:h-[580px]">
          <Image
            src={story.coverImage}
            alt={story.imageAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 90vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#142722]/60 via-transparent to-transparent" />
          <span className="absolute bottom-6 left-6 flex items-center gap-2 text-[10px] font-semibold tracking-[.12em] text-white md:bottom-8 md:left-8">
            <MapPin size={13} /> {story.location.toUpperCase()},{" "}
            {story.country.toUpperCase()}
          </span>
        </div>
        <div className="mx-auto max-w-[720px] pt-10 md:pt-14">
          <p className="eyebrow mb-4 text-[#b16b4f]">
            {date} · A FIELDNOTE · {story.viewCount ?? 0}{" "}
            {(story.viewCount ?? 0) === 1 ? "VIEW" : "VIEWS"}
          </p>
          <h1 className="serif text-[46px] leading-[1.08] tracking-[-.035em] md:text-[72px]">
            {story.title}
          </h1>
          <p className="mt-5 border-b border-[#d9d7ce] pb-8 text-[15px] leading-7 text-[#68756f]">
            {story.excerpt}
          </p>
          <div className="serif whitespace-pre-wrap py-8 text-[17px] leading-[1.95] text-[#344541]">
            {story.content || "A little story is on its way. Check back soon."}
          </div>
          <div className="border-t border-[#d9d7ce] pt-6">
            <Link
              href="/all-journals"
              className="focus-ring inline-flex items-center gap-2 text-[10px] font-semibold tracking-[.14em] text-[#52665e]"
            >
              <ArrowLeft size={13} /> BACK TO ALL JOURNALS
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
