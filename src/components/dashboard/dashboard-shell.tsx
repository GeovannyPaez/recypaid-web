"use client";

import { useState, useMemo } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModularSidebar } from "./modular-sidebar";
import Header from "./header";
import { useUserRoles } from "@/hooks/use-user-roles";
import { getModulesForUser } from "@/core/config/modules";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userRoles, isLoading } = useUserRoles();

  // Obtener módulos filtrados por roles del usuario
  const userModules = useMemo(() => {
    return getModulesForUser(userRoles);
  }, [userRoles]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex overflow-hidden bg-background">
      {/* Sidebar Desktop - Fixed */}
      <aside className="hidden border-r bg-card lg:flex lg:w-64 lg:flex-col lg:flex-shrink-0">
        {/* Logo/Brand - Fixed */}
        <div className="flex h-16 flex-shrink-0 items-center border-b px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-sm font-bold">C</span>
            </div>
            <span className="text-lg font-semibold">Ciclo</span>
          </div>
        </div>

        {/* Sidebar Navigation - Scrollable */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-4">
          <ModularSidebar modules={userModules} />
        </div>

        {/* Sidebar Footer - Fixed */}
        <div className="flex-shrink-0 border-t p-3">
          <p className="text-center text-xs text-muted-foreground">
            v1.0.0 - Ciclo Dashboard
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header - Fixed */}
        <header className="flex h-16 flex-shrink-0 items-center gap-4 border-b bg-card px-4 lg:px-6">
          {/* Mobile Menu Toggle */}
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex w-64 flex-col p-0">
              {/* Logo/Brand Mobile - Fixed */}
              <div className="flex h-16 flex-shrink-0 items-center border-b px-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <span className="text-sm font-bold">C</span>
                  </div>
                  <span className="text-lg font-semibold">Ciclo</span>
                </div>
              </div>

              {/* Mobile Sidebar - Scrollable */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden py-4">
                <ModularSidebar modules={userModules} />
              </div>

            </SheetContent>
          </Sheet>

          {/* Header Content */}
          <Header />
        </header>

        {/* Main Content - Scrollable */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="h-full min-h-full p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
