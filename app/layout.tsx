import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
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
      <body className={inter.className}>
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}
