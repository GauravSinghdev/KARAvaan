import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Karavaan — Journeys, Cultures & Stories",
  description:
    "A personal collection of places, photographs, and stories gathered along the way.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
