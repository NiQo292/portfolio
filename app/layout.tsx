import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { clashDisplay, satoshi } from "./fonts";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Footer from "@/components/Footer/Footer";
import Navigation from "@/components/Navigation/Navigation";

export const metadata: Metadata = {
  title: "Nico Haubold - Portfolio",
  description:
    "Frontend Developer & Designer specializing in React, Next.js, and modern web technologies. Explore my projects, experience, and skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${clashDisplay.variable} ${satoshi.variable} relative antialiased`}
      >
        <div className="global-bg" />

        <div className="global-vignette" />
        <SmoothScrollProvider>
          <Navigation />
          {children}
          <div
            className="relative h-[650px] overflow-hidden"
            style={{ clipPath: "inset(0 0 0 0)" }}
          >
            <Footer />
          </div>
        </SmoothScrollProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
