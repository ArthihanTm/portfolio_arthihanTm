"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import PageLoader from "@/components/PageLoader";
import { usePortfolioAnimations } from "@/lib/animations";
import { bodyFont, displayFont, labelFont } from "@/lib/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pathname = usePathname();
  const { pageTransition } = usePortfolioAnimations();

  return (
    <html
      lang="de"
      className={`${displayFont.variable} ${bodyFont.variable} ${labelFont.variable}`}
    >
      <body className="bg-black text-white antialiased">
        <PageLoader />
        <CustomCursor />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            variants={pageTransition}
            initial="hidden"
            animate="show"
            className="min-h-screen bg-black"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </body>
    </html>
  );
}