import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClientProviders } from "@/components/providers/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
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
