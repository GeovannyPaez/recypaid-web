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
  title: "Ciclo | Vende o Dona Tus Reciclables - Impacto Social y Ambiental",
  description: "Conecta con recicladores locales para vender o donar tus materiales reciclables. Genera ingresos extra o ayuda a tu comunidad mientras contribuyes al desarrollo sostenible y la acción climática.",
  keywords: [
    "reciclaje Colombia",
    "venta materiales reciclables",
    "donación reciclables",
    "desarrollo sostenible",
    "ODS",
    "economía circular",
    "impacto social",
    "medio ambiente",
    "ingresos reciclaje",
    "comunidad sostenible",
    "acción climática",
    "reducir pobreza",
    "app reciclaje",
    "recicladores locales",
    "papel cartón plástico metal"
  ].join(", "),
  authors: [{ name: "Ciclo Team" }],
  creator: "Ciclo",
  publisher: "Ciclo",
  category: "Sostenibilidad y Medio Ambiente",
  classification: "Aplicación de Reciclaje y Sostenibilidad",
  
  openGraph: {
    title: "Ciclo - Vende o Dona Reciclables | Impacto Social y Ambiental",
    description: "Plataforma que conecta hogares con recicladores para generar ingresos o ayudar a la comunidad. Contribuye a los ODS: fin de la pobreza, reducción de desigualdades y acción por el clima.",
    url: "https://ciclo.com",
    siteName: "Ciclo",
    images: [
      {
        url: "https://Ciclo.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ciclo - Plataforma de reciclaje con impacto social y ambiental",
      },
    ],
    locale: "es_CO",
    type: "website",
    countryName: "Colombia",
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
  
  alternates: {
    canonical: "https://ciclo.com",
    languages: {
      "es-CO": "https://ciclo.com",
      "es": "https://Ciclo.com/es",
    },
  },
  
  verification: {
    google: "7n1TjfddZ-uNV6dQ1RgoI1q7z90iyxS-7bYKWRF9U9s",
  },
  
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
    "msapplication-TileColor": "#2B5797",
    "theme-color": "#ffffff",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://Ciclo.com/#organization",
        "name": "Ciclo",
        "url": "https://Ciclo.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://Ciclo.com/logo.png",
          "width": 512,
          "height": 512
        },
        "description": "Plataforma móvil que conecta hogares con recicladores para generar impacto social y ambiental",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "CO",
          "addressRegion": "Colombia"
        },
        "sameAs": [
          "https://facebook.com/Ciclo",
          "https://twitter.com/Ciclo",
          "https://instagram.com/Ciclo"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://ciclo.com/#website",
        "url": "https://ciclo.com",
        "name": "Ciclo",
        "description": "Plataforma para vender o donar materiales reciclables con impacto social y ambiental",
        "publisher": {
          "@id": "https://ciclo.com/#organization"
        },
        "inLanguage": "es-CO"
      },
      {
        "@type": "MobileApplication",
        "name": "Ciclo",
        "operatingSystem": ["iOS", "Android"],
        "applicationCategory": "LifestyleApplication",
        "description": "App móvil para conectar hogares con recicladores, generar ingresos y contribuir al desarrollo sostenible",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "COP"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "150"
        }
      },
      {
        "@type": "Service",
        "name": "Servicio de Reciclaje Ciclo",
        "description": "Conectamos hogares con recicladores para la compra-venta y donación de materiales reciclables",
        "provider": {
          "@id": "https://Ciclo.com/#organization"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Colombia"
        },
        "serviceType": "Reciclaje y Sostenibilidad",
        "category": "Desarrollo Sostenible"
      }
    ]
  };

  return (
    <html lang="es-CO">
      <head>
        <meta name="google-site-verification" content="7n1TjfddZ-uNV6dQ1RgoI1q7z90iyxS-7bYKWRF9U9s" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-app-bg font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}