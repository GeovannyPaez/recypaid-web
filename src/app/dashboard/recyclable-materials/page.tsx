import { Button } from "@/components/ui/button";
import { MATERIALS_MOCK } from "@/mocks/recyclable-materials.mock";
import MaterilasService from "@/services/server/MaterilasService";
import { PriceByMaterial } from "@/types/materilas";
import { Paperclip } from "lucide-react";
import Link from "next/link";
import { JSX } from "react";

export default async function MaterialesReciclables() {
  const materials = await MaterilasService.getAllMaterials();
  
  return (
    <section className="w-full  ">
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl">
              Recicla con Facilidad y Gana
            </h1>
            <p className=" text-muted-foreground">
              Aprende a identificar, clasificar y preparar correctamente los
              materiales reciclables. ¡Y recibe un pago por ello!
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {materials.map((material) => (
              <MaterialCard
                id={material.id}
                key={material.name}
                icon={<Paperclip />}
                title={material.name}
                description={material.description}
                price={material.price}
                priceBy={material.priceBy}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
type MaterialCardProps = {
  icon: JSX.Element;
  title: string;
  description: string;
  price: number;
  priceBy:PriceByMaterial ;
  id:string
};
function MaterialCard({
  icon,
  title,
  description,
  price,
  priceBy,
    id
}: MaterialCardProps) {
  return (
    <div className="rounded-lg border border-primary p-6 shadow-sm  hover:bg-transparent">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-primary ">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{description}</p>
      <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
        <span>Pago: ${price} por {priceBy}</span>
        <Link className="" href={`/dashboard/recycling?materialId=${id}`}>
          <Button size="sm">Reciclar</Button>
        </Link>
      </div>
    </div>
  );
}
