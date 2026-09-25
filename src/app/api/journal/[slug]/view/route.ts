import { NextResponse } from "next/server";
import { ensurePostTable, prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    await ensurePostTable();
    const result = await prisma.post.updateMany({
      where: { slug, published: true },
      data: { viewCount: { increment: 1 } },
    });
    if (!result.count) return NextResponse.json({ error: "Story not found." }, { status: 404 });
    const post = await prisma.post.findUnique({ where: { slug }, select: { viewCount: true } });
    return NextResponse.json({ viewCount: post?.viewCount ?? 0 });
  } catch (error) {
    console.error("Failed to record a Fieldnotes story view:", error);
    return NextResponse.json({ error: "Could not record this view." }, { status: 503 });
  }
}
