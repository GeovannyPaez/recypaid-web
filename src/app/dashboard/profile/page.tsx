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
import ProfileForm from "@/components/dashboard/profile/profile-form";

export  default async function ProfilePage() {
  const userProfile = await ProfileService.get();

  const action = userProfile ? UpdateUserProfileAction : CreateUserProfileAction;

  const title = userProfile ? "Editar Perfil" : "Completar Perfil";
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
      <ProfileForm action={action} labelButton={labelButton} userProfile={userProfile} />
    </div>
  );
}
