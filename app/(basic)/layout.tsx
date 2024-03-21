import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "../Providers";


export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className={"flex flex-col min-h-screen"}>
        <Providers>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
        </Providers>
      </div>
  );
}
