import localFont from "next/font/local";

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
export const labelFont = satoshi;
