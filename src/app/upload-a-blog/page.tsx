import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { isEditorAuthenticated } from "@/lib/auth";
import { EditorForm } from "./editor-form";
import { LoginForm } from "./login-form";
import Appbar from "@/components/Appbar";

export const metadata = { title: "Add a story — Karavaan" };

export default async function UploadABlogPage() {
  const authenticated = await isEditorAuthenticated().catch(() => false);
  return (
    <main className="min-h-screen bg-[#f5f2e9]">
      <Appbar />
      <div className="mx-auto max-w-[1020px] px-6 py-12 md:px-10 md:py-16">
        <div className="mb-10 flex items-center gap-3 text-[#b16b4f]">
          <BookOpen size={18} strokeWidth={1.5} />
          <span className="eyebrow">THE TRAVEL JOURNAL</span>
        </div>
        {authenticated ? (
          <>
            <p className="eyebrow mb-3 text-[#b16b4f]">A new entry</p>
            <h1 className="serif mb-9 text-[46px] leading-tight tracking-[-.035em] md:text-[58px]">
              Tell us where you went.
            </h1>
            <EditorForm />
          </>
        ) : (
          <div className="mx-auto max-w-[430px] py-5">
            <p className="eyebrow mb-3 text-[#b16b4f]">Private editor</p>
            <h1 className="serif text-[44px] leading-tight tracking-[-.035em]">
              A page for the keeper.
            </h1>
            <p className="mt-4 text-[13px] leading-6 text-[#68756f]">
              Enter your password to add a story to the journal.
            </p>
            <LoginForm />
            <p className="mt-6 text-center text-[10px] text-[#8a9188]">
              This is a private writing space.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
