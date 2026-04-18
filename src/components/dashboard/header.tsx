"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleUser, Bell, HelpCircle, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import ThemeToggleButton from "../theme/theme-toggle-button";
import ButtonLogout from "./button-logout";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();

  // Obtener el título de la página basado en la ruta
  const getPageTitle = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 1) return "Dashboard";
    const lastSegment = segments[segments.length - 1];
    return lastSegment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="flex flex-1 items-center justify-between gap-4">
      {/* Page Title */}
      <div>
        <h1 className="text-lg font-semibold tracking-tight">
          {getPageTitle()}
        </h1>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {/* Notificaciones */}
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-4 w-4" />
          <Badge
            variant="destructive"
            className="absolute -right-1 -top-1 h-4 min-w-4 px-1 text-[10px] font-medium"
          >
            3
          </Badge>
          <span className="sr-only">Notificaciones</span>
        </Button>

        {/* Theme toggle */}
        <ThemeToggleButton />

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <CircleUser className="h-4 w-4" />
              <span className="sr-only">Menú de usuario</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium leading-none">Mi Cuenta</p>
                {session?.user?.email && (
                  <p className="text-xs text-muted-foreground truncate">
                    {session.user.email}
                  </p>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
              <Smartphone className="mr-2 h-4 w-4" />
              <span>Perfil solo en app mobile</span>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="https://api.whatsapp.com/send?phone=573175536413&text=Hola,%20necesito%20ayuda%20con%20mi%20cuenta%20de%20Ciclo"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Soporte</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <ButtonLogout />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
