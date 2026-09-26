import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo1 from "@/assets/logo1.png";

export default function Appbar() {
  return (
    <header className="flex items-center justify-between border-b border-[#d9d7ce] px-6 py-6 md:px-12">
      <div>
        <Link
          href="/"
          className="focus-ring flex items-center gap-2 text-[13px] font-semibold tracking-[.19em] xl:text-xl"
        >
          <Image
            src={Logo1}
            alt="Karavaan Logo"
            width={30}
            height={30}
            className="object-contain rounded-full"
          />
          <span>
            KARAvaan<span className="text-[#e6a27f]">.</span>
          </span>
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
