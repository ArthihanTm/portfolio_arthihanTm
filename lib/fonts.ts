import { Outfit } from "next/font/google";

export const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const displayFont = outfit;
export const bodyFont = outfit;
export const labelFont = outfit;
