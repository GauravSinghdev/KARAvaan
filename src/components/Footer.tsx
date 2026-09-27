import { Instagram } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center gap-2 lg:gap-5 bg-[#1f403c] px-6 py-8 text-white/75 md:flex-row md:items-center md:justify-between md:px-14">
      <div className="flex">
        <Link
          href="/"
          className="text-[12px] font-semibold tracking-[.17em] text-white"
        >
          KARAvaan<span className="text-[#e6a27f]">.</span>
        </Link>
        <Link
          href="https://www.instagram.com/gaurav_kalakoti_"
          target="_blank"
          aria-label="Instagram"
          className="focus-ring w-fit hover:text-white lg:hidden"
        >
          <Instagram size={17} />
        </Link>
      </div>
      <div>
        <p className="text-[10px] xl:text-[13px] tracking-wide">
          Made with lots of ❤️ © codewithkara.com, {new Date().getFullYear()}
        </p>
      </div>
      <Link
        href="https://www.instagram.com/gaurav_kalakoti_/"
        target="_blank"
        aria-label="Instagram"
        className="focus-ring w-fit hover:text-white hidden lg:block"
      >
        <Instagram size={17} />
      </Link>
    </footer>
  );
}
