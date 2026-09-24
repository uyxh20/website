import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ulysse Ha — AI Product & Transformation",
  description: "AI product leader turning complex operations into useful, measurable products.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en"><body>{children}</body></html>;
}
