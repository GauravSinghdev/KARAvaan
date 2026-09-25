import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { isEditorAuthenticated } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST() {
  if (!(await isEditorAuthenticated())) return NextResponse.json({ error: "Sign in to upload a photo." }, { status: 401 });

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json({ error: "Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to .env." }, { status: 503 });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "fieldnotes";
  const signature = createHash("sha1").update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`).digest("hex");
  return NextResponse.json({ cloudName, apiKey, timestamp, folder, signature });
}
