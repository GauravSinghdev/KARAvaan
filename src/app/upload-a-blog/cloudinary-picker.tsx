"use client";

import { useRef, useState } from "react";
import { ImagePlus, LoaderCircle, RotateCcw } from "lucide-react";

type Props = { imageUrl: string; onImage: (url: string) => void };

export function CloudinaryPicker({ imageUrl, onImage }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function upload(file?: File) {
    if (!file) return;
    setError("");
    if (!file.type.startsWith("image/")) { setError("Choose an image file."); return; }
    if (file.size > 15 * 1024 * 1024) { setError("Choose an image smaller than 15 MB."); return; }
    setBusy(true);
    try {
      const signResponse = await fetch("/api/cloudinary-signature", { method: "POST" });
      const signed = await signResponse.json();
      if (!signResponse.ok) throw new Error(signed.error ?? "Couldn’t prepare the upload.");

      const payload = new FormData();
      payload.append("file", file);
      payload.append("api_key", signed.apiKey);
      payload.append("timestamp", String(signed.timestamp));
      payload.append("signature", signed.signature);
      payload.append("folder", signed.folder);
      const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${signed.cloudName}/image/upload`, { method: "POST", body: payload });
      const uploaded = await uploadResponse.json();
      if (!uploadResponse.ok) throw new Error(uploaded.error?.message ?? "Cloudinary couldn’t upload that image.");
      onImage(uploaded.secure_url);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Upload failed. Check your Cloudinary settings.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return <div>
    <input ref={inputRef} hidden type="file" accept="image/*" onChange={(event) => upload(event.target.files?.[0])} />
    {imageUrl ? <div className="relative h-60 overflow-hidden bg-[#e8e5da]">
      {/* Cloudinary returns a user-provided URL, which may not be a configured Next image host. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} alt="Selected cover photo preview" className="h-full w-full object-cover" />
      <button type="button" onClick={() => inputRef.current?.click()} disabled={busy} className="focus-ring absolute bottom-3 right-3 flex items-center gap-2 bg-[#f5f2e9] px-3 py-2 text-[10px] font-semibold"><RotateCcw size={13} /> CHANGE PHOTO</button>
    </div> : <button type="button" onClick={() => inputRef.current?.click()} disabled={busy} className="focus-ring flex h-48 w-full flex-col items-center justify-center gap-3 border border-dashed border-[#bfc2b7] bg-white/35 text-[#51645d] transition hover:bg-white/70 disabled:opacity-60">
      {busy ? <LoaderCircle className="animate-spin" size={23} /> : <ImagePlus size={23} strokeWidth={1.4} />}
      <span className="text-[10px] font-semibold tracking-[.15em]">{busy ? "UPLOADING PHOTO…" : "CHOOSE A COVER PHOTO"}</span>
      <span className="text-[10px] text-[#7a847e]">JPEG, PNG or WebP · up to 15 MB</span>
    </button>}
    {error && <p role="alert" className="mt-2 text-[11px] text-[#a94e36]">{error}</p>}
  </div>;
}
