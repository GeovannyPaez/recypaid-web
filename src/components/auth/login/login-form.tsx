"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useFieldsState from "@/hooks/useFieldsState";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type InitialStateType = {
  email: string;
  password: string;
};

export default function FormularioInicioSesion() {
  const router = useRouter();
  const { fields, handleChange } = useFieldsState<InitialStateType>({
    email: "",
    password: "",
  });
  const [{ isLoading, error }, setFormState] = useState({
    isLoading: false,
    error: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState({ isLoading: true, error: "" });
    try {
      const signInResponse = await signIn("credentials", {
        redirect: false,
        email: fields.email,
        password: fields.password,
      });

      if (signInResponse?.error) {
        return setFormState({ isLoading: false, error: signInResponse.error });
      }

      router.push("/dashboard");
    } catch (signInError) {
      setFormState({
        isLoading: false,
        error: "Error al iniciar sesión. Por favor, inténtalo de nuevo.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          value={fields.email}
          onChange={handleChange}
          name="email"
          id="email"
          type="email"
          placeholder="Ingresa tu correo electrónico"
          required
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Contraseña</Label>
          <Link
            href="/forgot-password"
            className="ml-auto inline-block text-sm underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <Input
          value={fields.password}
          onChange={handleChange}
          name="password"
          id="password"
          type="password"
          placeholder="Ingresa tu contraseña"
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button isLoading={isLoading} type="submit" className="w-full">
        {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
      </Button>
    </form>
  );
}
