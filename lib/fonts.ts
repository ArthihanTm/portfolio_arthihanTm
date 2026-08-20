import localFont from "next/font/local";
import { Playfair_Display } from "next/font/google";
import { GeistSans } from "geist/font/sans";

export const displayFont = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const bodyFont = GeistSans;

export const labelFont = GeistSans;