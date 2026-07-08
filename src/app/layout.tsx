import type { Metadata } from "next";
import { Fraunces, Karla, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/CartContext";
import { WishlistProvider } from "@/lib/WishlistContext";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://wooly-co.netlify.app'),
  title: "Wooly & Co. | Handmade Crochet",
  description: "Handmade crochet scarves, amigurumi, bags, and decor. Crafted with love and cozy vibes in India. All items are made to order.",
  keywords: ["crochet", "handmade", "amigurumi", "scarves", "bags", "home decor", "yarn", "india"],
  authors: [{ name: "Wooly & Co." }],
  openGraph: {
    title: "Wooly & Co. | Handmade Crochet",
    description: "Handmade crochet scarves, amigurumi, bags, and decor. Crafted with love and cozy vibes in India.",
    url: "https://wooly-co.netlify.app",
    siteName: "Wooly & Co.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wooly & Co. Handmade Crochet",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${karla.variable} ${jetbrainsMono.variable} font-karla antialiased text-ink bg-oat`}
      >
        <CartProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
