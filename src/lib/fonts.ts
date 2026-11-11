import { Geist, Geist_Mono } from "next/font/google";

const body = Geist({ subsets: ["latin"], variable: "--font-geist-face", display: "swap" });
const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono-face",
  display: "swap",
  preload: false,
});
export const fonts = [body.variable, mono.variable];
