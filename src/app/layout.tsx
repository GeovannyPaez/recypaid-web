import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/providers";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "RecyPaid | Reciclaje a Domicilio en Colombia",
  description: "Recicla y gana dinero con RecyPaid, la plataforma de reciclaje a domicilio más grande de Colombia. Contribuye al medio ambiente y obtén recompensas.",
  keywords: "reciclaje, domicilio, Colombia, ganar dinero, medio ambiente, RecyPaid",
  authors: [{ name: "RecyPaid" }],
  openGraph: {
    title: "RecyPaid - Reciclaje a Domicilio en Colombia",
    description: "Únete a RecyPaid y comienza a reciclar desde casa. Gana dinero mientras ayudas al planeta.",
    url: "https://recypaid.com",
    siteName: "RecyPaid",
    images: [
      {
        url: "https://recypaid.com/icon.png",
        width: 1200,
        height: 630,
        alt: "RecyPaid - Reciclaje a Domicilio",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RecyPaid - Reciclaje a Domicilio en Colombia",
    description: "Recicla desde casa y gana dinero con RecyPaid. ¡Únete ahora!",
    // images: ["https://recypaid.com/twitter-image.jpg"],
  },
  robots: "index, follow",
  // themeColor: [
  //   { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  //   { media: "(prefers-color-scheme: dark)", color: "#000000" },
  // ],
  // viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="google-site-verification" content="7n1TjfddZ-uNV6dQ1RgoI1q7z90iyxS-7bYKWRF9U9s" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}