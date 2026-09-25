import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { isEditorAuthenticated } from "@/lib/auth";
import { EditorForm } from "./editor-form";
import { LoginForm } from "./login-form";

export const metadata = { title: "Add a story — Fieldnotes" };

export default async function UploadABlogPage() {
  const authenticated = await isEditorAuthenticated().catch(() => false);
  return <main className="min-h-screen bg-[#f5f2e9]">
    <header className="flex items-center justify-between border-b border-[#d9d7ce] px-6 py-5 md:px-12"><Link href="/" className="focus-ring text-[12px] font-semibold tracking-[.17em]">KARAvaan<span className="text-[#c86b4a]">.</span></Link><Link href="/" className="focus-ring flex items-center gap-2 text-[10px] font-semibold tracking-[.11em] text-[#66736d]"><ArrowLeft size={14} /> JOURNAL</Link></header>
    <div className="mx-auto max-w-[1020px] px-6 py-12 md:px-10 md:py-16">
      <div className="mb-10 flex items-center gap-3 text-[#b16b4f]"><BookOpen size={18} strokeWidth={1.5} /><span className="eyebrow">THE TRAVEL JOURNAL</span></div>
      {authenticated ? <><p className="eyebrow mb-3 text-[#b16b4f]">A new entry</p><h1 className="serif mb-9 text-[46px] leading-tight tracking-[-.035em] md:text-[58px]">Tell us where you went.</h1><EditorForm /></> : <div className="mx-auto max-w-[430px] py-5"><p className="eyebrow mb-3 text-[#b16b4f]">Private editor</p><h1 className="serif text-[44px] leading-tight tracking-[-.035em]">A page for the keeper.</h1><p className="mt-4 text-[13px] leading-6 text-[#68756f]">Enter your password to add a story to the journal.</p><LoginForm /><p className="mt-6 text-center text-[10px] text-[#8a9188]">This is a private writing space.</p></div>}
    </div>
  </main>;
}
