import type { Metadata } from "next";
import {
  Space_Grotesk,
  Inter,
  IBM_Plex_Mono,
  Vazirmatn,
} from "next/font/google";
import { LocaleProvider } from "@/lib/i18n/localeContext";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Lokool — Tools that never upload your file",
  description:
    "Fast, privacy-first file tools that run entirely in your browser.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable} ${vazirmatn.variable}`}
    >
      <body>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
