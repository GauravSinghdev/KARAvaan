import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllStories } from "@/lib/posts";
import { JournalList } from "./journal-list";

export const dynamic = "force-dynamic";

export const metadata = { title: "All journals — Karavaan", description: "Browse every travel journal entry by place, date, or views." };

export default async function AllJournalsPage() {
  const stories = await getAllStories();
  return <main className="min-h-screen bg-[#f5f2e9]">
    <header className="flex items-center justify-between border-b border-[#d9d7ce] px-6 py-5 md:px-12"><Link href="/" className="focus-ring text-[12px] font-semibold tracking-[.17em]">KARAvaan<span className="text-[#c86b4a]">.</span></Link><Link href="/" className="focus-ring flex items-center gap-2 text-[10px] font-semibold tracking-[.11em] text-[#66736d]"><ArrowLeft size={14} /> HOME</Link></header>
    <section className="mx-auto max-w-[1440px] px-6 py-12 md:px-14 md:py-16"><p className="eyebrow mb-3 text-[#b16b4f]">THE COMPLETE JOURNAL</p><div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><h1 className="serif text-[48px] leading-tight tracking-[-.035em] md:text-[66px]">Everywhere, remembered.</h1><p className="max-w-[300px] text-[12px] leading-6 text-[#68756f]">Search by place, sort by date or views, and revisit the stories behind every trip.</p></div><JournalList stories={stories} /></section>
  </main>;
}
