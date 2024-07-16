/**
 * v0 by Vercel.
 * @see https://v0.dev/t/s9OtKorHu2m
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  Carousel,
} from "@/components/ui/carousel";
import { JSX, SVGProps } from "react";
import {
  ArrowRight,
  Locate,
  Mail,
  Map,
  Newspaper,
  Phone,
  Wallet,
} from "lucide-react";
import Logo from "@/components/logo";

export default function Component() {
  return (
    <div key="1" className="flex flex-col min-h-[100dvh]">
      <header className=" bg-primary-foreground text-white py-4 px-6 flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-2">
          <Logo width={40} height={40} />
          <span className="text-lg font-semibold">Paid Recycling</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Link className="hover:underline" href="#">
            Inicio
          </Link>
          <Link className="hover:underline" href="#">
            Reciclaje
          </Link>
          <Link className="hover:underline" href="#">
            Ubicaciones
          </Link>
          <Link className="hover:underline" href="#">
            Noticias
          </Link>
          <Link className="hover:underline" href="#">
            Contacto
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50"
            href="/auth/register"
          >
            Registrarse
          </Link>
          <Button className="md:hidden" size="icon" variant="ghost">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation</span>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="bg-foreground py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl text-primary-foreground font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Recicla con Paid Recycling
              </h1>
              <p className="text-muted-foreground md:text-xl ">
                Únete a nuestra comunidad de recicladores y ayuda a crear un
                futuro más sostenible. Ahora puedes reciclar desde tu hogar y
                ganar recompensas por ello.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50"
                  href="#"
                >
                  Empieza a reciclar
                </Link>
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md border border-green-600 bg-white px-4 py-2 text-sm font-medium text-green-600 shadow-sm transition-colors hover:bg-green-100 hover:text-green-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50"
                  href="#"
                >
                  Aprende más
                </Link>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
                <RecycleIcon className="h-12 w-12 text-green-600" />
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
                <RecycleIcon className="h-12 w-12 text-green-600" />
                <h3 className="text-2xl font-bold text-primary-foreground mt-2">
                  2.5M
                </h3>
                <p className="text-muted-foreground">Toneladas recicladas</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
                <UsersIcon className="h-12 w-12 text-green-600" />
                <h3 className="text-2xl font-bold mt-2 text-primary-foreground">
                  50K
                </h3>
                <p className="text-muted-foreground">Usuarios registrados</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
                <LeafIcon className="h-12 w-12 text-green-600" />
                <h3 className="text-2xl font-bold mt-2 text-primary-foreground">
                  95%
                </h3>
                <p className="text-muted-foreground">Tasa de reciclaje</p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl ">
                  Últimas noticias y actualizaciones
                </h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Mantente al día con las últimas noticias y novedades sobre
                  reciclaje y sostenibilidad.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <img
                      alt="Noticia"
                      className="rounded-t-lg object-cover w-full aspect-[16/9]"
                      height="225"
                      src="/centro-reciclaje.jpg"
                      width="400"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold">
                      Nuevos centros de reciclaje abiertos en tu ciudad
                    </h3>
                    <p className="text-gray-500 mt-2">
                      Descubre los nuevos puntos de reciclaje que hemos abierto
                      para facilitar tu participación.
                    </p>
                    <Link
                      className="inline-flex items-center gap-1 mt-4 text-green-600 hover:underline"
                      href="#"
                    >
                      Leer más
                      <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <img
                      alt="Noticia"
                      className="rounded-t-lg object-cover w-full aspect-[16/9]"
                      height="225"
                      src="/consejos-reciclaje.jpg"
                      width="400"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold">
                      Consejos para reciclar más en casa
                    </h3>
                    <p className="text-gray-500 mt-2">
                      Aprende sencillas formas de aumentar tu reciclaje diario
                      desde tu hogar.
                    </p>
                    <Link
                      className="inline-flex items-center gap-1 mt-4 text-green-600 hover:underline"
                      href="#"
                    >
                      Leer más
                      <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <img
                      alt="Noticia"
                      className="rounded-t-lg object-cover w-full aspect-[16/9]"
                      height="225"
                      src="/incentivos-reciclaje.png"
                      width="400"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold">
                      Nuevos incentivos para reciclar
                    </h3>
                    <p className="text-gray-500 mt-2">
                      Descubre los nuevos programas de incentivos que hemos
                      lanzado para motivar el reciclaje.
                    </p>
                    <Link
                      className="inline-flex items-center gap-1 mt-4 text-green-600 hover:underline"
                      href="#"
                    >
                      Leer más
                      <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-green-50 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-primary-foreground sm:text-4xl md:text-5xl">
                  Lo que dicen nuestros usuarios
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl ">
                  Escucha las experiencias de otros usuarios que se han unido a
                  nuestra comunidad de reciclaje.
                </p>
              </div>
              <Carousel className="w-full max-w-4xl">
                <CarouselContent>
                  <CarouselItem>
                    <div className="p-6 bg-white rounded-lg shadow-sm">
                      <blockquote className="text-lg font-semibold text-muted-foreground  leading-relaxed">
                        {`"Paid Recycling ha sido una gran ayuda para mí y mi
                        familia. Ahora reciclamos mucho más y nos sentimos
                        orgullosos de contribuir a un mundo más sostenible. ¡Y
                        encima nos pagan por ello!"`}
                      </blockquote>
                      <div className="flex items-center gap-4 mt-4">
                        <img
                          alt="User Avatar"
                          className="rounded-full"
                          height="48"
                          src="/placeholder.svg"
                          style={{
                            aspectRatio: "48/48",
                            objectFit: "cover",
                          }}
                          width="48"
                        />
                        <div>
                          <p className="font-medium text-primary-foreground">
                            María Gómez
                          </p>
                          <p className="text-muted-foreground text-sm">
                            Usuario desde 2020
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-6 bg-white rounded-lg shadow-sm">
                      <blockquote className="text-lg font-semibold text-muted-foreground leading-relaxed">
                       {` "Paid Recycling ha sido un gran aliado en mi camino
                        hacia una vida más sostenible. Ahora reciclo casi todo y
                        me siento mucho más comprometido con el medio ambiente.
                        ¡Y lo mejor es que me pagan por ello!"`}
                      </blockquote>
                      <div className="flex items-center gap-4 mt-4">
                        <img
                          alt="User Avatar"
                          className="rounded-full"
                          height="48"
                          src="/placeholder.svg"
                          style={{
                            aspectRatio: "48/48",
                            objectFit: "cover",
                          }}
                          width="48"
                        />
                        <div>
                          <p className="font-medium text-primary-foreground">
                            Juan Pérez
                          </p>
                          <p className="text-muted-foreground text-sm">
                            Usuario desde 2021
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-6 bg-white rounded-lg shadow-sm">
                      <blockquote className="text-lg font-semibold text-muted-foreground leading-relaxed">
                        {`"Paid Recycling ha sido una gran ayuda para mí y mi
                        familia. Ahora reciclamos mucho más y nos sentimos
                        orgullosos de contribuir a un mundo más sostenible. ¡Y
                        lo mejor es que nos pagan por ello!"`}
                      </blockquote>
                      <div className="flex items-center gap-4 mt-4">
                        <img
                          alt="User Avatar"
                          className="rounded-full"
                          height="48"
                          src="/placeholder.svg"
                          style={{
                            aspectRatio: "48/48",
                            objectFit: "cover",
                          }}
                          width="48"
                        />
                        <div>
                          <p className="font-medium text-primary-foreground">
                            Ana Martínez
                          </p>
                          <p className=" text-muted-foreground text-sm">
                            Usuario desde 2019
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Funciones clave
                </h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Descubre las principales funcionalidades de Paid Recycling y
                  cómo pueden ayudarte a reciclar más y mejor.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
                  <RecycleIcon className="h-12 w-12 text-green-600" />
                  <h3 className="text-xl font-semibold mt-2 text-primary-foreground">
                    Recicla desde casa
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Recicla tus residuos y gana recompensas. Cuando acumules
                    cierta cantidad, nosotros pasaremos a recogerlos.
                  </p>
                  <Link
                    className="inline-flex items-center gap-1 mt-4 text-green-600 hover:underline"
                    href="#"
                  >
                    Aprende más
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
                  <Wallet className="h-12 w-12 text-green-600" />
                  <h3 className="text-xl font-semibold mt-2 text-primary-foreground">
                    Gana recompensas
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Recibe puntos por cada kilo de residuos que recicles y
                    cánjealos por premios o descuentos.
                  </p>
                  <Link
                    className="inline-flex items-center gap-1 mt-4 text-green-600 hover:underline"
                    href="#"
                  >
                    Conoce el programa
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
                  <MapPinIcon className="h-12 w-12 text-green-600" />
                  <h3 className="text-xl font-semibold mt-2 text-primary-foreground">
                    Encuentra centros de reciclaje
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Localiza los puntos de reciclaje más cercanos a tu ubicación
                    y programa recogidas.
                  </p>
                  <Link
                    className="inline-flex items-center gap-1 mt-4 text-green-600 hover:underline"
                    href="#"
                  >
                    Buscar centros
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
                  <Newspaper className="h-12 w-12 text-green-600" />
                  <h3 className="text-xl font-semibold mt-2 text-primary-foreground">
                    Mantente informado
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Entérate de las últimas noticias y novedades sobre reciclaje
                    y sostenibilidad.
                  </p>
                  <Link
                    className="inline-flex items-center gap-1 mt-4 text-green-600 hover:underline"
                    href="#"
                  >
                    Leer noticias
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className=" bg-primary-foreground text-foreground py-8">
        <div className="container px-4 md:px-6 grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Funciones clave</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  className="flex items-center gap-2 hover:underline"
                  href="#"
                >
                  <RecycleIcon className="h-5 w-5" />
                  Recicla desde casa
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center gap-2 hover:underline"
                  href="#"
                >
                  <Wallet className="h-5 w-5" />
                  Gana recompensas
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center gap-2 hover:underline"
                  href="#"
                >
                  <MapPinIcon className="h-5 w-5" />
                  Encuentra centros de reciclaje
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center gap-2 hover:underline"
                  href="#"
                >
                  <Newspaper className="h-5 w-5" />
                  Mantente informado
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sobre nosotros</h3>
            <p className="text-gray-300">
              Paid Recycling es una plataforma que te ayuda a reciclar de manera
              fácil y recompensada. Únete a nuestra comunidad y juntos
              construyamos un futuro más sostenible.
            </p>
            <div className="flex items-center gap-4">
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50"
                href="/auth/register"
              >
                Empieza a reciclar
              </Link>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md border border-green-600 bg-white px-4 py-2 text-sm font-medium text-green-600 shadow-sm transition-colors hover:bg-green-100 hover:text-green-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50"
                href="#"
              >
                Aprende más
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
                  info@recyclemate.com
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
                  Av. Siempre Viva 123, Springfield
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-green-800 pt-4 text-center text-sm text-gray-400">
          © 2024 Paid Recycling. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

function ArrowRightIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function AwardIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function CalendarIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function LeafIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function MapPinIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function RecycleIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
      <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
      <path d="m14 16-3 3 3 3" />
      <path d="M8.293 13.596 7.196 9.5 3.1 10.598" />
      <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843" />
      <path d="m13.378 9.633 4.096 1.098 1.097-4.096" />
    </svg>
  );
}

function TreesIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 10v.2A3 3 0 0 1 8.9 16v0H5v0h0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" />
      <path d="M7 16v6" />
      <path d="M13 19v3" />
      <path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5" />
    </svg>
  );
}

function UsersIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
