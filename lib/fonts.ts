import { Cormorant_Garamond, Inter } from "next/font/google";

export const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

export const labelFont = Inter({
  variable: "--font-label",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});