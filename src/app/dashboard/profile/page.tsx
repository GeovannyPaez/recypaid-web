/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ipDcZR5s02K
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ProfileService from "@/services/server/ProfileService";
import { CreateUserProfileAction, UpdateUserProfileAction } from "@/actions/user-profile.action";
import ButtonServerAction from "@/components/ui/button-server-action";

export  default async function ProfilePage() {
  const userProfile = await ProfileService.get();

  const action = userProfile ? UpdateUserProfileAction : CreateUserProfileAction;

  const title = userProfile ? "Editar Perfil" : "Crear Perfil";
  const description = userProfile ? "Actualiza tu información de perfil." : "Completa los siguientes campos";

  const labelButton = userProfile ? "Actualizar" : "Guardar";
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
      <form action={action} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input name="name" id="name" placeholder="Ingresa tu nombre"
            defaultValue={userProfile?.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastname">Apellido</Label>
            <Input name="lastname" id="lastname" defaultValue={userProfile?.lastname} placeholder="Ingresa tu apellido" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">Ciudad</Label>
          <Input  name="city" id="city" placeholder="Ingresa tu ciudad" defaultValue={userProfile?.city} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Dirección</Label>
          <Textarea
            className="min-h-[100px]"
            id="address"
            name="address"
            minLength={10}
            defaultValue={userProfile?.address}
            placeholder="Ingresa tu dirección (mínimo 10 caracteres)"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            name="phone"
            pattern="[0-9]*"
            defaultValue={userProfile?.phone}
            placeholder="Ingresa tu número de teléfono"
            type="tel"
          />
        </div>
        <ButtonServerAction className="w-full">{labelButton}</ButtonServerAction>
      </form>
    </div>
  );
}
