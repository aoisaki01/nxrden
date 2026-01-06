import { Orbitron, Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "NXRDEN STORE",
  description: "Premium Digital Goods",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${orbitron.variable} ${inter.variable} antialiased bg-black text-foreground min-h-screen flex flex-col`}
      >
        <div
          className="fixed inset-0 z-[-1] bg-gradient-to-br from-[#0c0c0e] via-[#050505] to-[#120f13] pointer-events-none"
          aria-hidden="true"
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
