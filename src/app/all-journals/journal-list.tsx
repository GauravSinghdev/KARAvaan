"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import type { Story } from "@/lib/posts";

type SortMode = "popular" | "newest" | "oldest";

function dateValue(story: Story) {
  return new Date(story.visitedAt).getTime();
}

export function JournalList({ stories }: { stories: Story[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortMode>("newest");
  const displayed = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    return stories
      .filter((story) => !normalized || `${story.title} ${story.location} ${story.country}`.toLocaleLowerCase().includes(normalized))
      .sort((a, b) => sort === "popular" ? (b.viewCount ?? 0) - (a.viewCount ?? 0) || dateValue(b) - dateValue(a) : sort === "oldest" ? dateValue(a) - dateValue(b) : dateValue(b) - dateValue(a));
  }, [query, sort, stories]);

  return <>
    <div className="mb-8 grid gap-3 border-y border-[#d9d7ce] py-4 md:grid-cols-[1fr_220px]">
      <label className="relative block"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#768079]" /><span className="sr-only">Search journals</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a place or story" className="focus-ring w-full border border-[#d0d0c7] bg-white/60 py-3 pl-10 pr-3 text-[12px] outline-none placeholder:text-[#909891]" /></label>
      <label className="relative flex items-center"><SlidersHorizontal size={14} className="pointer-events-none absolute left-3 text-[#768079]" /><span className="sr-only">Sort journal entries</span><select value={sort} onChange={(event) => setSort(event.target.value as SortMode)} className="focus-ring w-full appearance-none border border-[#d0d0c7] bg-white/60 py-3 pl-9 pr-3 text-[11px] outline-none"><option value="newest">Latest trips</option><option value="popular">Most viewed</option><option value="oldest">Oldest trips</option></select></label>
    </div>
    <p className="mb-5 text-[10px] font-semibold tracking-[.12em] text-[#7b847d]">{displayed.length} {displayed.length === 1 ? "STORY" : "STORIES"}</p>
    {displayed.length ? <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {displayed.map((story) => <Link key={story.slug} href={`/journal/${story.slug}`} className="story-card focus-ring group">
        <div className="relative h-[260px] overflow-hidden bg-[#d6d5cb]"><Image src={story.coverImage} alt={story.imageAlt} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="story-image object-cover" /><span className="absolute left-4 top-4 bg-[#f5f2e9]/95 px-3 py-2 text-[9px] font-bold tracking-[.13em]">{story.location.toUpperCase()} · {story.country.toUpperCase()}</span></div>
        <div className="flex items-start justify-between border-b border-[#d9d7ce] py-4"><div><p className="eyebrow mb-2 text-[#b16b4f]">{new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(new Date(story.visitedAt))}</p><h2 className="serif text-[25px] leading-tight">{story.title}</h2><p className="mt-2 text-[11px] leading-5 text-[#68756f]">{story.excerpt}</p><p className="mt-3 text-[10px] text-[#7c877f]">{story.viewCount ?? 0} {(story.viewCount ?? 0) === 1 ? "view" : "views"}</p></div><ArrowRight size={16} className="ml-3 mt-4 shrink-0 text-[#b16b4f] transition-transform group-hover:translate-x-1" /></div>
      </Link>)}
    </div> : <div className="border border-dashed border-[#c8c9bf] px-6 py-16 text-center"><p className="serif text-[26px]">No stories found.</p><p className="mt-2 text-[12px] text-[#68756f]">Try a different place or clear your search.</p></div>}
  </>;
}
