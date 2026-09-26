import Link from "next/link";
import React from "react";

export default function Appbar() {
  return (
    <header className="flex items-center justify-between border-b border-[#d9d7ce] px-6 py-6 md:px-12">
      <div>
        <Link
          href="/"
          className="focus-ring text-[12px] font-semibold tracking-[.17em]"
        >
          KARAvaan<span className="text-[#c86b4a]">.</span>
        </Link>
      </div>
      <div>
        <nav className="flex items-center gap-7 text-[11px] font-medium tracking-[.12em]">
          <Link
            href="/all-journals"
            className="focus-ring relative hidden w-fit transition-colors duration-300 hover:text-[#edb08d] sm:block
            after:absolute after:bottom-[-4px] after:left-0
            after:h-[2px] after:w-full
            after:origin-center after:scale-x-0
            after:bg-[#edb08d]
            after:transition-transform after:duration-300 after:ease-in-out
            hover:after:scale-x-100"
          >
            ALL JOURNALS
          </Link>
          <Link
            href="https://karavaan.codewithkara.com/#about"
            className="focus-ring relative hidden w-fit transition-colors duration-300 hover:text-[#edb08d] sm:block
            after:absolute after:bottom-[-4px] after:left-0
            after:h-[2px] after:w-full
            after:origin-center after:scale-x-0
            after:bg-[#edb08d]
            after:transition-transform after:duration-300 after:ease-in-out
            hover:after:scale-x-100"
          >
            ABOUT
          </Link>
        </nav>
      </div>
    </header>
  );
}
