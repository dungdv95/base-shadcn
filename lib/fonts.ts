import {
  JetBrains_Mono as FontMono,
  Roboto as FontSans
} from "next/font/google";

export const fontSans = FontSans({
  weight: "300",
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-sans",
  preload: true
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
  preload: true
});
