
import Link from "next/link";

import {
  LeafIcon,
  RecycleIcon,
  UsersIcon,
} from "lucide-react";
import TestimonialCarousel from "@/components/shared/testimonial-carousel";
import KeyFeaturesSection from "@/components/shared/key-features-section";
import LatestNewsSection from "@/components/shared/latest-news-section";
import LayoutPublic from "@/components/public/layout-public";



export default function Home() {
  return (
    <LayoutPublic>
      <section className="bg-foreground py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl text-primary-foreground font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Recicla con Recypaid
            </h1>
            <p className="text-muted-foreground md:text-xl ">
              Únete a nuestra comunidad de recicladores y ayuda a crear un
              futuro más sostenible. Ahora puedes reciclar desde tu hogar y
              ganar recompensas por ello.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50"
                href="/dashboard"
              >
                Empieza a reciclar
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
              <RecycleIcon className="h-12 w-12 text-primary" />
              <h3 className="text-2xl font-bold mt-2 text-[#052e16]">
                Recicla desde casa
              </h3>
              <p className="text-muted-foreground">
                Recicla tus residuos y gana recompensas. Cuando acumules
                cierta cantidad, nosotros pasaremos a recogerlos.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
              <RecycleIcon className="h-12 w-12 text-primary" />
              <h3 className="text-2xl font-bold text-[#052e16] mt-2">
                100
              </h3>
              <p className="text-muted-foreground">Toneladas recicladas</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
              <UsersIcon className="h-12 w-12 text-primary" />
              <h3 className="text-2xl font-bold mt-2 text-[#052e16]">
                10K
              </h3>
              <p className="text-muted-foreground">Usuarios registrados</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
              <LeafIcon className="h-12 w-12 text-primary" />
              <h3 className="text-2xl font-bold mt-2 text-[#052e16]">
                95%
              </h3>
              <p className="text-muted-foreground">Tasa de reciclaje</p>
            </div>
          </div>
        </div>
      </section>
      <LatestNewsSection />
      <TestimonialCarousel />

      <KeyFeaturesSection />
    </LayoutPublic>
  );
}
