import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "../../../components/auth/login/login-form";
import ButtonGoogleAuth from "@/components/auth/button-google-auth";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Iniciar Sesión | Recypaid - Reciclaje a Domicilio",
  description: "Accede a tu cuenta de Recypaid para gestionar tus servicios de reciclaje a domicilio y ver tus recompensas.",
  keywords: "login, iniciar sesión, Recypaid, reciclaje, domicilio, Colombia",
  openGraph: {
    title: "Iniciar Sesión en Recypaid",
    description: "Accede a tu cuenta de Recypaid y comienza a reciclar desde casa.",
    url: "https://www.Recypaid.com/auth/login",
    siteName: "Recypaid",
    locale: "es_CO",
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Iniciar Sesión en Recypaid - Reciclaje a Domicilio",
  //   description: "Accede a tu cuenta de Recypaid y gestiona tus servicios de reciclaje.",
  //   images: ["https://www.Recypaid.com/login-twitter-image.jpg"],
  // },
  robots: "noindex, nofollow", // Typically, login pages are not indexed
};

export default function LoginPage() {
  return (
    <div className="overflow-hidden w-full lg:grid lg:grid-cols-2 h-screen p-5 lg:p-0">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Iniciar sesión</h1>
            <p className="text-balance text-muted-foreground">
              Ingresa tu correo electrónico a continuación para iniciar sesión
              en tu cuenta
            </p>
          </div>
          <LoginForm />
          <div className="text-center text-sm">
            ¿No tienes una cuenta?{" "}
            <Link href="/auth/register" className="underline">
              Regístrate
            </Link>
            <p className="my-1">ó</p>
            <Separator />
            <ButtonGoogleAuth />
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/phone-recycling.jpeg"
          alt="Persona reciclando con su teléfono móvil"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}