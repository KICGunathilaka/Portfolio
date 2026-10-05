import type { Metadata } from "next";
import { Doto, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { SmoothScrollProvider } from "@/components/shared/SmoothScrollProvider";

// The site uses two typefaces only: Doto (dot-matrix display) and JetBrains Mono (everything else)
const doto = Doto({
  subsets: ["latin"],
  variable: "--font-doto",
  axes: ["ROND"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
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
      <body className={`${doto.variable} ${jetbrains.variable} font-sans antialiased`}>
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
        {/* GlassNav is self-contained per page — no root-level nav needed */}
      </body>
    </html>
  );
}
