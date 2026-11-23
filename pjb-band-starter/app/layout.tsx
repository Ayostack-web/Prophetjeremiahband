import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prophet Jeremiah Band | Oracle of God",
  description:
    "The official digital home of Prophet Jeremiah Band — Oracle of God. Explore our story, leadership, events, archive and media.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
