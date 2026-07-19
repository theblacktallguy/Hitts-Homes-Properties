import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import RouteLoadingOverlay from "@/components/ui/RouteLoadingOverlay";
import BottomNav from "@/components/layout/BottomNav";
import OverscrollLock from "@/components/ui/OverscrollLock";
import Footer from "@/components/layout/Footer";


export const metadata: Metadata = {
  metadataBase: new URL("https://hittshomes.vercel.app"),
  title: "Hitts Homes & Properties",
  description: "Search verified homes, apartments, and properties for rent and sale with Hitts Homes & Properties.",
  openGraph: {
    title: "Hitts Homes & Properties",
    description: "Search verified homes, apartments, and properties for rent and sale with Hitts Homes & Properties.",
    url: "https://hittshomes.vercel.app", // 👈 replace with your actual domain
    siteName: "Hitts Homes & Properties",
    images: [
      {
        url: "/banner/menu-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Hitts Homes & Properties",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hitts Homes & Properties",
    description: "Search verified homes, apartments, and properties for rent and sale with Hitts Homes & Properties.",
    images: ["/banner/menu-hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full flex flex-col overflow-x-hidden">
        <OverscrollLock />
        <div className="scroll-container flex-1 pb-10 md:pb-0 overflow-y-auto h-full">
          {children}
          <div className="hidden md:block">
            <Footer />
          </div>
        </div>
        <Suspense fallback={null}>
          <RouteLoadingOverlay />
        </Suspense>
        <BottomNav />
      </body>
    </html>
  );
}
