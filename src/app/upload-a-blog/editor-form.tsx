"use client";

import { useActionState, useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { publishAction, type EditorState } from "./actions";
import { CloudinaryPicker } from "./cloudinary-picker";

const initialState: EditorState = {};
const fieldClass = "focus-ring mt-2 w-full border border-[#d0d0c7] bg-white/65 px-3.5 py-3 text-[13px] outline-none placeholder:text-[#a3a69d]";
const labelClass = "block text-[10px] font-semibold tracking-[.11em] text-[#4e625a]";

export function EditorForm() {
  const [state, action, pending] = useActionState(publishAction, initialState);
  const [imageUrl, setImageUrl] = useState("");
  return <form action={action} className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_350px]">
    <div className="space-y-7">
      <div><label className={labelClass} htmlFor="title">STORY TITLE</label><input className={fieldClass} id="title" name="title" required maxLength={120} placeholder="A weekend by the sea" /></div>
      <div className="grid gap-5 sm:grid-cols-2"><div><label className={labelClass} htmlFor="location">CITY OR REGION</label><input className={fieldClass} id="location" name="location" required maxLength={80} placeholder="Lisbon" /></div><div><label className={labelClass} htmlFor="country">COUNTRY</label><input className={fieldClass} id="country" name="country" required maxLength={80} placeholder="Portugal" /></div></div>
      <div><label className={labelClass} htmlFor="visitedAt">WHEN DID YOU GO?</label><input className={fieldClass} id="visitedAt" name="visitedAt" type="date" required /></div>
      <div><label className={labelClass} htmlFor="excerpt">A SHORT INTRODUCTION <span className="font-normal tracking-normal text-[#89918c]">(UP TO 220 CHARACTERS)</span></label><textarea className={fieldClass} id="excerpt" name="excerpt" required maxLength={220} rows={3} placeholder="A little something to draw us in…" /></div>
      <div><label className={labelClass} htmlFor="content">YOUR STORY</label><textarea className={`${fieldClass} min-h-[260px] leading-7`} id="content" name="content" required placeholder="The moments you want to remember…" /></div>
    </div>
    <aside className="space-y-6">
      <div><p className={`${labelClass} mb-2`}>COVER PHOTO</p><CloudinaryPicker imageUrl={imageUrl} onImage={setImageUrl} /><input type="hidden" name="coverImage" value={imageUrl} required /></div>
      <div><label className={labelClass} htmlFor="imageAlt">PHOTO DESCRIPTION</label><input className={fieldClass} id="imageAlt" name="imageAlt" required maxLength={180} placeholder="A sunlit street in Lisbon" /></div>
      <p className="text-[11px] leading-5 text-[#707a73]">Your photo is uploaded straight to your Cloudinary account. The API secret stays on the server.</p>
      {state.error && <p role="alert" className="text-[12px] leading-5 text-[#a94e36]">{state.error}</p>}
      <button disabled={pending || !imageUrl} className="focus-ring flex w-full items-center justify-center gap-2 bg-[#1f403c] px-5 py-4 text-[10px] font-semibold tracking-[.15em] text-white transition hover:bg-[#c86b4a] disabled:cursor-not-allowed disabled:opacity-50"><Send size={14} />{pending ? "PUBLISHING…" : "PUBLISH STORY"}</button>
      <Link href="/" className="focus-ring flex items-center justify-center gap-2 py-3 text-[10px] font-semibold tracking-[.13em] text-[#5f6c64]"><ArrowLeft size={13} /> BACK TO PORTFOLIO</Link>
    </aside>
  </form>;
}
