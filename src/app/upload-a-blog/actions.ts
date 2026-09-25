"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createEditorSession, isEditorAuthenticated, verifyPassword } from "@/lib/auth";
import { ensurePostTable, prisma } from "@/lib/prisma";

export type EditorState = { error?: string };

export async function loginAction(_previous: EditorState, formData: FormData): Promise<EditorState> {
  try {
    const password = String(formData.get("password") ?? "");
    if (!verifyPassword(password)) return { error: "That password doesn’t match. Try again." };
    await createEditorSession();
    return {};
  } catch {
    return { error: "Add BLOG_PASSWORD and SESSION_SECRET to your .env file first." };
  }
}

function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 72);
}

export async function publishAction(_previous: EditorState, formData: FormData): Promise<EditorState> {
  if (!(await isEditorAuthenticated())) return { error: "Your editor session expired. Refresh and sign in again." };

  const title = String(formData.get("title") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const coverImage = String(formData.get("coverImage") ?? "").trim();
  const imageAlt = String(formData.get("imageAlt") ?? "").trim();
  const visitedAtValue = String(formData.get("visitedAt") ?? "");
  const visitedAt = new Date(`${visitedAtValue}T12:00:00.000Z`);

  if (!title || !location || !country || !excerpt || !content || !coverImage || !imageAlt || !visitedAtValue) {
    return { error: "Fill in each field and add a cover photo before publishing." };
  }
  if (excerpt.length > 220) return { error: "Keep the introduction under 220 characters." };
  if (!Number.isFinite(visitedAt.getTime())) return { error: "Choose a valid visit date." };
  if (!/^https:\/\//i.test(coverImage)) return { error: "The cover photo URL must use HTTPS." };

  const baseSlug = slugify(title);
  if (!baseSlug) return { error: "Choose a title with letters or numbers." };
  let slug = baseSlug;
  try {
    await ensurePostTable();
    const existing = await prisma.post.findUnique({ where: { slug: baseSlug }, select: { id: true } });
    slug = existing ? `${baseSlug}-${Date.now().toString(36)}` : baseSlug;
    await prisma.post.create({ data: { title, slug, location, country, visitedAt, excerpt, content, coverImage, imageAlt, published: true } });
  } catch (error) {
    console.error("Failed to publish a Fieldnotes post:", error);
    return { error: "Couldn’t save this story. Check DATABASE_URL and your Neon database, then try again." };
  }

  revalidatePath("/");
  revalidatePath(`/journal/${slug}`);
  redirect(`/journal/${slug}`);
}
