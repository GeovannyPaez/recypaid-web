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
  title: "Recypaid | Vende o Dona Tus Reciclables - Impacto Social y Ambiental",
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
  authors: [{ name: "Recypaid Team" }],
  creator: "Recypaid",
  publisher: "Recypaid",
  category: "Sostenibilidad y Medio Ambiente",
  classification: "Aplicación de Reciclaje y Sostenibilidad",
  
  openGraph: {
    title: "Recypaid - Vende o Dona Reciclables | Impacto Social y Ambiental",
    description: "Plataforma que conecta hogares con recicladores para generar ingresos o ayudar a la comunidad. Contribuye a los ODS: fin de la pobreza, reducción de desigualdades y acción por el clima.",
    url: "https://recypaid.com",
    siteName: "Recypaid",
    images: [
      {
        url: "https://recypaid.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Recypaid - Plataforma de reciclaje con impacto social y ambiental",
      },
    ],
    locale: "es_CO",
    type: "website",
    countryName: "Colombia",
  },
  
  twitter: {
    card: "summary_large_image",
    site: "@recypaid",
    creator: "@recypaid",
    title: "Recypaid - Vende o Dona Reciclables con Impacto Social",
    description: "🌱 Genera ingresos vendiendo reciclables o ayuda donándolos. Contribuye a los ODS y construye una comunidad más sostenible. ♻️💚",
    images: ["https://recypaid.com/twitter-card.jpg"],
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
    canonical: "https://recypaid.com",
    languages: {
      "es-CO": "https://recypaid.com",
      "es": "https://recypaid.com/es",
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
        "@id": "https://recypaid.com/#organization",
        "name": "Recypaid",
        "url": "https://recypaid.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://recypaid.com/logo.png",
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
          "https://facebook.com/recypaid",
          "https://twitter.com/recypaid",
          "https://instagram.com/recypaid"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://recypaid.com/#website",
        "url": "https://recypaid.com",
        "name": "Recypaid",
        "description": "Plataforma para vender o donar materiales reciclables con impacto social y ambiental",
        "publisher": {
          "@id": "https://recypaid.com/#organization"
        },
        "inLanguage": "es-CO"
      },
      {
        "@type": "MobileApplication",
        "name": "Recypaid",
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
        "name": "Servicio de Reciclaje Recypaid",
        "description": "Conectamos hogares con recicladores para la compra-venta y donación de materiales reciclables",
        "provider": {
          "@id": "https://recypaid.com/#organization"
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