import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Hafiz Paint Store | Brighto Wholesale Dealer, Swabi",
  description: "Hafiz Paint Store, Maneri Road, Swabi. Brighto paint wholesale dealer: emulsion, enamel, all-weather exterior paint, brushes and rollers. Order on WhatsApp.",
};

export const viewport: Viewport = { themeColor: "#14275c" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
