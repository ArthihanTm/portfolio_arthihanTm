import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

export const satoshi = localFont({
  src: [
    {
      path: "../app/fonts/Satoshi-Variable.woff2",
      weight: "300 900",
      style: "normal",
    },
    {
      path: "../app/fonts/Satoshi-VariableItalic.woff2",
      weight: "300 900",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const displayFont = satoshi;
export const bodyFont = satoshi;

export const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const labelFont = monoFont;
