import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClientProviders } from "@/components/providers/ClientProviders";
import Script from "next/script";

export const dynamic = 'force-dynamic';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "10 LPA Quest | Gamified Job Prep Tracker",
  description: "Your 6-month journey to crack a 10 LPA tech job. Track DSA, Web Dev, System Design and more!",
  keywords: ["10 LPA", "DSA", "System Design", "Web Development", "Job Prep", "LeetCode", "Striver", "NeetCode"],
  authors: [{ name: "Shakir" }],
  openGraph: {
    title: "10 LPA Quest | Gamified Job Prep Tracker",
    description: "Your 6-month journey to crack a 10 LPA tech job",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col`}
      >
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3667684562539469"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          src="https://pl28631767.effectivegatecpm.com/40/81/3c/40813ca1b2554767cc140e2d0d488096.js"
          strategy="afterInteractive"
        />
        <ClientProviders>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
