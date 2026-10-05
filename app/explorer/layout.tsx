import { Archivo } from "next/font/google";

// The Explorer side has its own typographic voice: one grotesque used at two widths, condensed and
// heavy for poster-size headlines and regular for reading text. Loaded here so the rest of the site
// never downloads it.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
});

export default function ExplorerLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${archivo.variable} font-poster`}>{children}</div>;
}
