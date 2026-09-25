import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/**
 * Create the post table on first publish. This mirrors prisma/schema.prisma and
 * lets a fresh Neon database accept its first post without a separate db:push.
 */
let postTableReady: Promise<void> | undefined;

export function ensurePostTable() {
  if (!postTableReady) {
    postTableReady = (async () => {
      await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS "Post" (
      "id" TEXT NOT NULL,
      "title" TEXT NOT NULL,
      "slug" TEXT NOT NULL,
      "location" TEXT NOT NULL,
      "country" TEXT NOT NULL,
      "visitedAt" TIMESTAMP(3) NOT NULL,
      "excerpt" TEXT NOT NULL,
      "content" TEXT NOT NULL,
      "coverImage" TEXT NOT NULL,
      "imageAlt" TEXT NOT NULL,
      "published" BOOLEAN NOT NULL DEFAULT true,
      "viewCount" INTEGER NOT NULL DEFAULT 0,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL,
      CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
    )
  `;

      await prisma.$executeRaw`ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "viewCount" INTEGER NOT NULL DEFAULT 0`;
      await prisma.$executeRaw`CREATE UNIQUE INDEX IF NOT EXISTS "Post_slug_key" ON "Post"("slug")`;
      await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS "Post_published_visitedAt_idx" ON "Post"("published", "visitedAt")`;
    })().catch((error: unknown) => {
      postTableReady = undefined;
      throw error;
    });
  }
  return postTableReady;
}
