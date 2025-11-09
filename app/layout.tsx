import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hindu Literature Collection",
  description: "Explore sacred Hindu texts including Bhagavad Gita, Ramayana, Upanishads, and Mahabharata",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
