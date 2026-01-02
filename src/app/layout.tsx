import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToastProvider } from "@/components/ui/Toast";
import Footer from "@/components/Footer";
import { Montserrat } from "next/font/google";


export const metadata: Metadata = {
  title: "Reserva Natural Lago Escondido",
  description: "Reserva Natural Lago Escondido",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

export default function RootLayout({ children, }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body
        className="min-h-dvh flex flex-col antialiased"
      >
        <ToastProvider>
          <Navbar />
          <main className="flex-1 min-h-0 flex flex-col">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
