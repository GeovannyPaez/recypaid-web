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

export default function PaginaRegistro() {
  return (
    <div className=" my-6 flex justify-center items-center">
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
