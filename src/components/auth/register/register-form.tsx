"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterAction } from "@/actions/auth.actions";
import ButtonServerAction from "@/components/ui/button-server-action";
import { useFormState } from "react-dom";

export default function FormularioRegistro() {
  const [stateForm, serverAction] = useFormState(RegisterAction, {
    error: false,
    message: "",
  });
  return (
    <form className="grid gap-4" action={serverAction}>
      <div className="grid gap-2">
        <Label htmlFor="email">Correo electrónico*</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="m@example.com"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Contraseña*</Label>
        <Input required name="password" id="password" type="password" />
      </div>
      {stateForm.error && (
        <div className="text-red-500 text-sm">{stateForm.message}</div>
      )}
      <ButtonServerAction type="submit" className="w-full">
        Crear una cuenta
      </ButtonServerAction>
    </form>
  );
}
