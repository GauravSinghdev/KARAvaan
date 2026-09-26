import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllStories } from "@/lib/posts";
import { JournalList } from "./journal-list";
import Footer from "@/components/Footer";
import Appbar from "@/components/Appbar";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All journals — Karavaan",
  description: "Browse every travel journal entry by place, date, or views.",
};

export default async function AllJournalsPage() {
  const stories = await getAllStories();
  return (
    <main className="min-h-screen bg-[#f5f2e9]">
      <Appbar />
      <section className="mx-auto max-w-[1440px] px-6 py-12 md:px-14 md:py-16">
        <p className="eyebrow mb-3 text-[#b16b4f]">THE COMPLETE JOURNAL</p>
        <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <h1 className="serif text-[48px] leading-tight tracking-[-.035em] md:text-[66px]">
            Everywhere, remembered.
          </h1>
          <p className="max-w-[300px] text-[12px] leading-6 text-[#68756f]">
            Search by place, sort by date or views, and revisit the stories
            behind every trip.
          </p>
        </div>
        <JournalList stories={stories} />
      </section>
      <Footer />
    </main>
  );
}
