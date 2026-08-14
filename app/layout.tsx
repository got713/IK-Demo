import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import Toast from "@/components/ui/Toast";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ibrahim Khoder — Timeless Elegance",
  description:
    "Discover Ibrahim Khoder's premium collection, crafted with timeless design, refined details, and modern Egyptian fashion elegance.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased bg-brand-black text-brand-off-white font-inter">
        <ShopProvider>
          <LoadingScreen />
          <Navbar />
          <CartDrawer />
          <SearchOverlay />
          <Toast />
          <main className="min-h-screen flex flex-col justify-between">{children}</main>
          <Footer />
        </ShopProvider>
      </body>
    </html>
  );
}
