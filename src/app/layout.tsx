import type { Metadata } from "next";
import { Geist, Inter, Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import ConnectModal from "@/components/ConnectModal";
import CustomCursor from "@/components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Anshuman Bharadwaj — Interaction Designer",
  description: "Personal portfolio of Anshuman Bharadwaj, an interaction designer designing digital experiences that feel effortless, meaningful, and human.",
  keywords: ["UX/UI Design", "Product Design", "Anshuman Bharadwaj", "Interaction Design", "UX Research", "Design Systems"],
  authors: [{ name: "Anshuman Bharadwaj" }],
  openGraph: {
    title: "Anshuman Bharadwaj — Interaction Designer",
    description: "I design digital experiences that feel effortless, meaningful, and human.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anshuman Bharadwaj — Interaction Designer",
    description: "I design digital experiences that feel effortless, meaningful, and human.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${inter.variable} ${plusJakartaSans.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground flex flex-col font-sans">
        {children}
        <ConnectModal />
        <CustomCursor />
      </body>
    </html>
  );
}
