
import RecyclingFormUser from "@/components/dashboard/recycling/recycling-form-user";
import MaterilasService from "@/services/server/MaterilasService";
import ProfileService from "@/services/server/ProfileService";
import { redirect } from "next/navigation";

type RecyclingPageProps = {
  searchParams: {
    materialId?: string;
  }
}

export default async function RecyclinPage({ searchParams }: RecyclingPageProps) {
  const materials = await MaterilasService.getAllMaterials();
  const userProfile = await ProfileService.get();
  if (!userProfile) {
    redirect('/dashboard/profile');
  }

  return (
    <section className="w-full">
      <div className="container mx-auto max-w-6xl px-2 md:px-3">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Solicitar Reciclaje
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Complete el formulario a continuación para enviar su
              solicitud.
            </p>
          </div>
          <RecyclingFormUser materials={materials} materialIdSelect={searchParams.materialId} address={userProfile?.address} />
        </div>
      </div>
    </section>
  );
}

