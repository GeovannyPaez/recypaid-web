import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Locate, Mail, Menu, Phone } from "lucide-react";
import Logo from "@/components/logo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const routes = [
    {
        path: "/",
        name: "Inicio"
    },
    // {
    //     path: "/public/about",
    //     name: "Sobre nosotros"
    // },
    {
        path: "/public/materials",
        name: "Materiales Reciclables"
    }
];

type LayoutProps = {
    children: React.ReactNode;
};

export default function LayoutPublic({ children }: LayoutProps) {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <header className="bg-[#052e16]  text-white py-4 px-6 flex items-center justify-between">
                <nav className="hidden w-full flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base h-12 w-12"
                    >
                        <Logo width={100} height={100} />
                        <span className="sr-only">RecyPaid</span>
                    </Link>
                    <div className="flex justify-between w-full items-center">
                        <div className="flex gap-4">
                            {routes.map((route) => (
                                <Link
                                    key={route.path}
                                    href={route.path}
                                    className="transition-colors hover:text-primary hover:underline"
                                >
                                    {route.name}
                                </Link>
                            ))}
                        </div>
                        <Button size={"sm"}>
                            <Link href="/dashboard/recycling" className="">
                                Reciclar
                            </Link>
                        </Button>
                    </div>
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="shrink-0 md:hidden text-white border-2 border-muted-foreground">
                            <Menu className="h-5 w-5 " />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <SheetTrigger asChild>
                                <Link
                                    href="/"
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
                {children}
            </main>

            <footer className="bg-[#052e16] text-white py-8">
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
                                    recypaid@gmail.com
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="flex items-center gap-2 hover:underline"
                                    href="#"
                                >
                                    <Phone className="h-5 w-5" />
                                    +57 (317) 553-6413, +57 (313) 8448436
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="flex items-center gap-2 hover:underline"
                                    href="#"
                                >
                                    <Locate className="h-5 w-5" />
                                    Motilones, Cucuta
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