import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { SmoothScrollProvider } from "@/components/shared/SmoothScrollProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio — Systems Engineer & Explorer",
  description:
    "Two worlds. One passion. Explore the engineering mind and the adventurous spirit of a systems engineer who loves the outdoors.",
  openGraph: {
    title: "Portfolio — Systems Engineer & Explorer",
    description: "Two worlds. One passion.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
        {/* GlassNav is self-contained per page — no root-level nav needed */}
      </body>
    </html>
  );
}
