import Link from "next/link";
import React from "react";

export default function Appbar() {
  return (
    <header className="flex items-center justify-between border-b border-[#d9d7ce] px-6 py-5 md:px-12">
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
            className="focus-ring hidden hover:text-[#edb08d] sm:block"
            href="/all-journals"
          >
            JOURNAL
          </Link>
          <Link
            className="focus-ring hidden hover:text-[#edb08d] sm:block"
            href="http://localhost:3000/#about"
          >
            ABOUT
          </Link>
        </nav>
      </div>
    </header>
  );
}
