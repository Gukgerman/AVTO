import type { Metadata } from "next";
import { RootDocument } from "@/components/HomePage";
import { buildMetadata } from "@/lib/i18n";
import "../globals.css";

export const metadata: Metadata = buildMetadata("en");

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
