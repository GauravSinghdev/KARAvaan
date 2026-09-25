import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Instagram, MapPin } from "lucide-react";
import { getStories } from "@/lib/posts";

export const dynamic = "force-dynamic";

const heroImage =
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2200&q=90";

function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default async function Home() {
  const stories = await getStories(3);
  const [featured, ...otherStories] = stories;
  return (
    <main>
      <header className="absolute z-10 flex w-full items-center justify-between px-6 py-6 text-white md:px-14 md:py-8">
        <Link
          href="/"
          className="focus-ring text-[13px] font-semibold tracking-[.19em]"
        >
          KARAvaan<span className="text-[#e6a27f]">.</span>
        </Link>
        <nav className="flex items-center gap-7 text-[11px] font-medium tracking-[.12em]">
          <a
            className="focus-ring hidden hover:text-[#edb08d] sm:block"
            href="/all-journals"
          >
            JOURNAL
          </a>
          <a
            className="focus-ring hidden hover:text-[#edb08d] sm:block"
            href="#about"
          >
            ABOUT
          </a>
          {/* <Link
            className="focus-ring rounded-full border border-white/50 px-4 py-2 hover:bg-white hover:text-ink"
            href="/upload-a-blog"
          >
            ADD A STORY <span aria-hidden="true">↗</span>
          </Link> */}
        </nav>
      </header>

      <section className="grain relative flex h-screen items-end overflow-hidden bg-[#213b36] px-6 pb-16 text-white xxl:min-h-[840px] md:px-14 md:pb-20">
        <Image
          src={heroImage}
          alt="A winding road through the Italian countryside at sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#102622]/75 via-[#102622]/20 to-transparent" />
        <div className="relative z-[1] max-w-[1050px]">
          <div className="mb-6 flex items-center gap-3 text-[#edb08d]">
            <span className="h-px w-9 bg-[#edb08d]" />
            <span className="eyebrow">A personal travel journal</span>
          </div>
          <h1 className="serif max-w-[900px] text-[58px] leading-[.99] tracking-[-.045em] sm:text-[82px] md:text-[116px]">
            The world,
            <br />a little closer.
          </h1>
          <div className="mt-8 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-[390px] text-[14px] leading-7 text-white/80">
              Notes from near and far. The places that stay with you, and the
              little things you bring home.
            </p>
            {/* <a
              href="#journal"
              className="fixed bottom-5 focus-ring flex w-fit items-center gap-3 text-[10px] font-semibold tracking-[.18em] bg-purple-500 px-4 rounded-2xl"
            >
              EXPLORE THE JOURNAL{" "}
              <div className="m-2 bg-white rounded-full">
                <ArrowDown size={20} strokeWidth={5} color="#FF0000" className="color-red-600" />
              </div>
            </a> */}
          </div>
        </div>
        <span className="eyebrow absolute bottom-9 right-14 hidden text-white/65 md:block">
          36° 43′ N &nbsp; 9° 08′ W
        </span>
      </section>

      <section
        id="journal"
        className="mx-auto max-w-[1440px] px-6 py-20 md:px-14 md:py-28"
      >
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-[#d9d7ce] pb-7 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow mb-3 text-[#b16b4f]">
              The journal · 2023—2025
            </p>
            <h2 className="serif text-[42px] leading-tight tracking-[-.035em] md:text-[58px]">
              Places, in passing.
            </h2>
          </div>
          <div className="flex items-end justify-between gap-5">
            <p className="max-w-[290px] text-[12px] leading-6 text-[#68756f]">
              A growing collection of field notes, photographs, and favorite
              detours.
            </p>
            <Link
              href="/all-journals"
              className="focus-ring shrink-0 border-b border-[#b16b4f] pb-2 text-[10px] font-bold tracking-[.13em] text-[#435950]"
            >
              ALL JOURNALS ↗
            </Link>
          </div>
        </div>
        {featured && (
          <Link
            href={`/journal/${featured.slug}`}
            className="story-card focus-ring group relative mb-5 block h-[420px] overflow-hidden bg-[#bac6b9] md:h-[560px]"
          >
            <Image
              src={featured.coverImage}
              alt={featured.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 90vw"
              className="story-image object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#142722]/80 via-transparent to-transparent" />
            <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-[#f5f2e9]/95 px-3 py-2 text-[9px] font-bold tracking-[.16em] text-ink md:left-8 md:top-8">
              <MapPin size={12} /> {featured.location.toUpperCase()},{" "}
              {featured.country.toUpperCase()}
            </div>
            <div className="absolute inset-x-6 bottom-7 flex items-end justify-between text-white md:inset-x-10 md:bottom-10">
              <div>
                <p className="eyebrow mb-3 text-white/75">
                  01 / {formatDate(featured.visitedAt)}
                </p>
                <h3 className="serif text-[38px] tracking-[-.025em] md:text-[62px]">
                  {featured.title}
                </h3>
                <p className="mt-2 max-w-[500px] text-[12px] leading-6 text-white/75">
                  {featured.excerpt}
                </p>
              </div>
              <span className="mb-1 hidden h-12 w-12 items-center justify-center rounded-full border border-white/50 transition group-hover:bg-white group-hover:text-ink sm:flex">
                <ArrowRight size={17} />
              </span>
            </div>
          </Link>
        )}
        <div className="grid gap-5 md:grid-cols-2">
          {otherStories.map((story, index) => (
            <Link
              key={story.slug}
              href={`/journal/${story.slug}`}
              className="story-card focus-ring group"
            >
              <div className="relative h-[300px] overflow-hidden bg-[#d6d5cb] md:h-[360px]">
                <Image
                  src={story.coverImage}
                  alt={story.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="story-image object-cover"
                />
                <span className="absolute left-5 top-5 rounded-full bg-[#f5f2e9]/95 px-3 py-2 text-[9px] font-bold tracking-[.15em]">
                  {story.location.toUpperCase()} · {story.country.toUpperCase()}
                </span>
              </div>
              <div className="flex items-start justify-between border-b border-[#d9d7ce] py-5">
                <div>
                  <p className="eyebrow mb-2 text-[#b16b4f]">
                    0{index + 2} / {formatDate(story.visitedAt)}
                  </p>
                  <h3 className="serif text-[28px] leading-tight">
                    {story.title}
                  </h3>
                  <p className="mt-2 max-w-md text-[12px] leading-6 text-[#68756f]">
                    {story.excerpt}
                  </p>
                </div>
                <span className="mt-5 text-[#b16b4f]">
                  <ArrowRight size={18} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="about" className="bg-[#e8e5da] px-6 py-20 md:px-14 md:py-24">
        <div className="mx-auto grid max-w-[1300px] gap-10 md:grid-cols-[1fr_1fr] md:items-center md:gap-20">
          <div className="relative h-[360px] overflow-hidden bg-[#bbc4b8] md:h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=85"
              alt="A travel journal and map set out for the next journey"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="max-w-[490px]">
            <p className="eyebrow mb-4 text-[#b16b4f]">A little about me</p>
            <h2 className="serif text-[46px] leading-[1.08] tracking-[-.035em] md:text-[60px]">
              Collecting moments, not miles.
            </h2>
            <p className="mt-6 text-[13px] leading-7 text-[#586660]">
              I travel for the long lunches, the wrong turns that turn out
              right, and the feeling of being somewhere entirely new. This is my
              little corner of the internet for keeping it all.
            </p>
            <a
              href="mailto:hello@example.com"
              className="focus-ring mt-7 inline-flex items-center gap-2 border-b border-[#b16b4f] pb-2 text-[10px] font-bold tracking-[.15em]"
            >
              SAY HELLO <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </section>

      <footer className="flex flex-col gap-5 bg-[#1f403c] px-6 py-8 text-white/75 md:flex-row md:items-center md:justify-between md:px-14">
        <Link
          href="/"
          className="text-[12px] font-semibold tracking-[.17em] text-white"
        >
          FIELDNOTES<span className="text-[#e6a27f]">.</span>
        </Link>
        <p className="text-[10px] tracking-wide">
          Made slowly, somewhere in the world. © {new Date().getFullYear()}
        </p>
        <a
          href="https://instagram.com"
          aria-label="Instagram"
          className="focus-ring w-fit hover:text-white"
        >
          <Instagram size={17} />
        </a>
      </footer>
    </main>
  );
}
