import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoreProvider from "./StoreProvider";
import Providers from "./Providers";

const inter = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Tridge",
    template: "%s - Tridge",
  },
  description: "Tridge",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={[inter.className, "flex flex-col min-h-screen"].join(' ')}>
        <Providers>
          <StoreProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </StoreProvider>
        </Providers>
      </body>
    </html>
  );
}
