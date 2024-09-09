import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormularioRegistro from "@/components/auth/register/register-form";
import { Separator } from "@/components/ui/separator";
import ButtonGoogleAuth from "@/components/auth/button-google-auth";

export const metadata: Metadata = {
  title: "Regístrate en Recypaid | Únete al Reciclaje a Domicilio",
  description: "Crea tu cuenta en Recypaid y comienza a reciclar desde casa. Únete a la comunidad de reciclaje más grande de Colombia y gana recompensas por tus esfuerzos.",
  keywords: "registro, crear cuenta, Recypaid, reciclaje, domicilio, Colombia, recompensas",
  openGraph: {
    title: "Únete a Recypaid - Reciclaje a Domicilio en Colombia",
    description: "Regístrate en Recypaid y comienza tu viaje de reciclaje. Gana dinero mientras ayudas al planeta.",
    url: "https://www.Recypaid.com/auth/register",
    siteName: "Recypaid",
    images: [
      // {
      //   url: "https://www.Recypaid.com/register-og-image.jpg",
      //   width: 1200,
      //   height: 630,
      //   alt: "Registro en Recypaid",
      // },
    ],
    locale: "es_CO",
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Regístrate en Recypaid - Reciclaje a Domicilio",
  //   description: "Crea tu cuenta en Recypaid y únete a la revolución del reciclaje en Colombia.",
  //   images: ["https://www.Recypaid.com/register-twitter-image.jpg"],
  // },
  robots: "noindex, nofollow", // Typically, registration pages are not indexed
};

export default function PaginaRegistro() {
  return (
    <div className="my-6 flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Registrarse</CardTitle>
          <CardDescription>
            Ingresa tu información para crear una cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormularioRegistro />
          <div className="mt-4 text-center text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/auth/login" className="underline">
              Inicia sesión
            </Link>
            <p className="my-1">ó</p>
            <Separator />
            <ButtonGoogleAuth />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}