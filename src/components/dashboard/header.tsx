import Link from "next/link";
import { CircleUser, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ThemeToggleButton from "../theme/theme-toggle-button";
import ButtonLogout from "./button-logout";
import { DASHBOARD_ROUTES } from "@/config/routes";
import Logo from "../logo";

export default function Header() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-lg font-semibold md:text-base h-12 w-12"
        >
          <Logo width={100} height={100} />
          <span className="sr-only">Paid Recycling</span>
        </Link>
        {DASHBOARD_ROUTES.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className="text-foreground transition-colors hover:text-primary hover:underline"
          >
            {route.name}
          </Link>
        ))}
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
                <span className="sr-only">Paid Recycling</span>
              </Link>
            </SheetTrigger>
            {DASHBOARD_ROUTES.map((route) => (
              <SheetTrigger asChild key={route.path}>
                <Link href={route.path} className="hover:text-foreground">
                  {route.name}
                </Link>
              </SheetTrigger>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto ">
          <div className="relative">
            <ThemeToggleButton />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <span className="text-sm">My cuenta</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/dashboard/profile">Perfil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <ButtonLogout />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
