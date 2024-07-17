
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  LeafIcon,
  Locate,
  Mail,
  Menu,
  MenuIcon,
  Phone,
  RecycleIcon,
  UsersIcon,
} from "lucide-react";
import Logo from "@/components/logo";
import TestimonialCarousel from "@/components/shared/testimonial-carousel";
import KeyFeaturesSection from "@/components/shared/key-features-section";
import LatestNewsSection from "@/components/shared/latest-news-section";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const routes = [{
  "path": "/",
  "name": "Inicio"
}, {
  path: "#",
  name: "Sobre nosotros"
}
]

export default function Home() {
  return (
    <div key="1" className="flex flex-col min-h-[100dvh]">
      <header className=" bg-primary-foreground text-white py-4 px-6 flex items-center justify-between">
        <nav className="hidden w-full flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base h-12 w-12"
          >
            <Logo width={100} height={100} />
            <span className="sr-only">RecyPaid</span>
          </Link>
          <div className="flex justify-between w-full items-center">
            <div className="flex gap-4" >
              {routes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className="text-foreground transition-colors hover:text-primary hover:underline"
                >
                  {route.name}
                </Link>
              ))}
            </div>
            <div className="">
              <Button size={"sm"}>
                <Link href="/auth/login" className="">
                  Reciclar
                </Link>
              </Button>
            </div>
          </div>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <SheetTrigger asChild>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Logo />
                  <span className="sr-only">RecyPaid</span>
                </Link>
              </SheetTrigger>
              {routes.map((route) => (
                <SheetTrigger asChild key={route.path}>
                  <Link href={route.path} className="hover:text-foreground">
                    {route.name}
                  </Link>
                </SheetTrigger>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <main className="flex-1">
        <section className="bg-foreground py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl text-primary-foreground font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Recicla con RecyPaid
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
                <h3 className="text-2xl font-bold mt-2 text-primary-foreground">
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
                <h3 className="text-2xl font-bold text-primary-foreground mt-2">
                  2.5M
                </h3>
                <p className="text-muted-foreground">Toneladas recicladas</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
                <UsersIcon className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold mt-2 text-primary-foreground">
                  10K
                </h3>
                <p className="text-muted-foreground">Usuarios registrados</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
                <LeafIcon className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold mt-2 text-primary-foreground">
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
      </main>
      <footer className=" bg-primary-foreground text-foreground py-8">
        <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sobre nosotros</h3>
            <p className="text-gray-300">
              RecyPaid es una plataforma que te ayuda a reciclar de manera
              fácil y recompensada. Únete a nuestra comunidad y juntos
              construyamos un futuro más sostenible.
            </p>
            <div className="flex items-center gap-4">
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50"
                href="/dashboard"
              >
                Empieza a reciclar
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contáctanos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  className="flex items-center gap-2 hover:underline"
                  href="#"
                >
                  <Mail className="h-5 w-5" />
                  info@recypaid.com
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center gap-2 hover:underline"
                  href="#"
                >
                  <Phone className="h-5 w-5" />
                  +1 (234) 567-890
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center gap-2 hover:underline"
                  href="#"
                >
                  <Locate className="h-5 w-5" />
                  Antonia Santos, Cucuta
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-green-800 pt-4 text-center text-sm text-gray-400">
          © 2024 RecyPaid. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
