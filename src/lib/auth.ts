import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "fieldnotes_editor";
const SESSION_AGE = 60 * 60 * 24 * 7;

function signature(value: string) {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not configured.");
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function verifyPassword(password: string) {
  const expected = process.env.BLOG_PASSWORD;
  if (!expected) throw new Error("BLOG_PASSWORD is not configured.");
  const suppliedHash = createHmac("sha256", "fieldnotes-password-check").update(password).digest();
  const expectedHash = createHmac("sha256", "fieldnotes-password-check").update(expected).digest();
  return timingSafeEqual(suppliedHash, expectedHash);
}

export async function createEditorSession() {
  const value = `${Date.now() + SESSION_AGE * 1000}`;
  const token = `${value}.${signature(value)}`;
  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_AGE,
  });
}

export async function isEditorAuthenticated() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return false;
  const [expires, submittedSignature] = token.split(".");
  if (!expires || !submittedSignature || Number(expires) < Date.now()) return false;
  const expectedSignature = signature(expires);
  const actual = Buffer.from(submittedSignature, "hex");
  const expected = Buffer.from(expectedSignature, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
