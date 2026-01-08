import { Orbitron, Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import NoiseOverlay from "@/components/NoiseOverlay";

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
        className={`${orbitron.variable} ${inter.variable} antialiased bg-black text-foreground min-h-screen flex flex-col relative`}
      >
        <NoiseOverlay />
        <div
          className="fixed inset-0 z-[-1] pointer-events-none"
          style={{
            background: `
               radial-gradient(circle at 50% 0%, var(--primary) 0%, transparent 60%),
               radial-gradient(circle at 85% 30%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
               conic-gradient(from 0deg at 50% 50%, var(--background) 0deg, var(--surface) 180deg, var(--background) 360deg),
               var(--background)
             `,
            backgroundBlendMode: 'screen, screen, normal, normal',
            opacity: 0.8
          }}
          aria-hidden="true"
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
