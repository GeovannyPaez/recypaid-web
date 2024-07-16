import Image from "next/image";
import Link from "next/link";
import LoginForm from "../../../components/auth/login/login-form";

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
          <div className="mt-4 text-center text-sm">
            ¿No tienes una cuenta?{" "}
            <Link href="/auth/register" className="underline">
              Regístrate
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/secure-login-illustration.svg"
          alt="Imagen"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
