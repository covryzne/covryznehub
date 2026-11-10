import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage-face",
  display: "swap",
});
const body = Geist({ subsets: ["latin"], variable: "--font-geist-face", display: "swap" });
const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono-face",
  display: "swap",
  preload: false,
});
export const fonts = [display.variable, body.variable, mono.variable];
