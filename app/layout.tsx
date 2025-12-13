import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation/Navigation";
import { clashDisplay, satoshi } from "./fonts";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Footer from "@/components/Footer/Footer";

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
      </body>
    </html>
  );
}
