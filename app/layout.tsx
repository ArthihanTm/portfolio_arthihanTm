"use client";

import type { ReactNode } from "react";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import PageLoader from "@/components/PageLoader";
import { satoshi } from "@/lib/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={satoshi.variable}
    >
      <body className="bg-black text-white antialiased">
        <PageLoader />
        <CustomCursor />
        <div className="min-h-screen bg-black">{children}</div>
      </body>
    </html>
  );
}