import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Inter } from "next/font/google";
import ParticleBackground from "@/components/ParticleBackground";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HyperGamble",
  description: "HyperGamble on Hyperliquid is now live!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased  bg-gradient-to-br from-green-200 to-green-300 text-foreground`}
      >
        <Providers>
          <Suspense>{children}</Suspense>
          <ParticleBackground />
        </Providers>
      </body>
    </html>
  );
}
