import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Conversor de Imágenes Online Gratis - JPG, PNG, WebP, HEIC",
  description: "Convierte tus imágenes gratis y sin subir a servidor. Soporta JPG, PNG, WebP, HEIC. 100% privado, procesamiento local en tu navegador.",
  icons: {
    icon: '/favicon.svg',
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <div className="fixed top-4 left-4 z-50">
          <a
            href="https://www.artenlaclase.cl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ir a www.artenlaclase.cl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo1.png"
              alt="Logo Artenlaclase"
              className="opacity-90 hover:opacity-100 transition drop-shadow w-40 h-auto"
            />
          </a>
        </div>
        <div className="flex-1">
          {children}
        </div>
        <footer className="bg-gray-50 border-t py-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} <a href="https://www.oceanicaweb.cl" target="_blank" rel="noopener noreferrer" className="text-gray-700 underline hover:no-underline">www.oceanicaweb.cl</a>. Todos los derechos reservados.
        </footer>
      </body>
    </html>
  );
}
