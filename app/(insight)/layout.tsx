import Footer from "@/components/Footer";
import Providers from "../Providers";
import "../globals.css";
import HeaderInsight from "@/components/HeaderInsight";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className={"flex flex-col min-h-screen"}>
        <Providers>
            <HeaderInsight />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
        </Providers>
      </div>
  );
}
