"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModuleConfig } from "@/types/modules";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ModularSidebarProps {
  modules: ModuleConfig[];
  className?: string;
}

export function ModularSidebar({ modules, className }: ModularSidebarProps) {
  const pathname = usePathname();
  const [openModules, setOpenModules] = useState<string[]>(() => {
    // Inicializar con módulos que tienen defaultOpen en true
    return modules.filter((m) => m.defaultOpen).map((m) => m.id);
  });

  // Auto-abrir el módulo que contiene la ruta activa
  useEffect(() => {
    modules.forEach((module) => {
      const hasActiveItem = module.items.some((item) => pathname === item.href);
      if (hasActiveItem && !openModules.includes(module.id)) {
        setOpenModules((prev) => [...prev, module.id]);
      }
    });
  }, [pathname, modules, openModules]);

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  if (modules.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-sm text-muted-foreground">
          No hay módulos disponibles para tu rol
        </p>
      </div>
    );
  }

  return (
    <nav className={cn("space-y-2 px-3", className)}>
      {modules.map((module) => {
        const isOpen = openModules.includes(module.id);
        const ModuleIcon = module.icon;
        const hasActiveItem = module.items.some((item) => pathname === item.href);

        // Si solo hay un módulo, no mostrar el collapsible
        if (modules.length === 1) {
          return (
            <div key={module.id} className="space-y-1">
              {module.items.map((item) => {
                const ItemIcon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link key={item.id} href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      size="sm"
                      className={cn(
                        "w-full justify-start gap-3 h-9 text-sm transition-colors",
                        isActive && "bg-secondary font-medium shadow-sm"
                      )}
                    >
                      <ItemIcon className="h-4 w-4 shrink-0" />
                      <span className="flex-1 text-left">{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant="default"
                          className="ml-auto h-5 min-w-5 px-1.5 text-[10px] font-medium"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                );
              })}
            </div>
          );
        }

        // Múltiples módulos - Mostrar con collapsible
        return (
          <Collapsible
            key={module.id}
            open={isOpen}
            onOpenChange={() => toggleModule(module.id)}
            className="space-y-1"
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "w-full justify-between h-9 px-2 font-medium transition-colors",
                  hasActiveItem && "text-primary"
                )}
              >
                <div className="flex items-center gap-2">
                  <ModuleIcon className="h-4 w-4 shrink-0" />
                  <span className="text-sm">{module.title}</span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform duration-200",
                    isOpen ? "rotate-180" : "rotate-0"
                  )}
                />
              </Button>
            </CollapsibleTrigger>

            <CollapsibleContent className="space-y-1 pb-1">
              {module.items.map((item) => {
                const ItemIcon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link key={item.id} href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      size="sm"
                      className={cn(
                        "w-full justify-start gap-3 h-9 pl-9 text-sm transition-colors",
                        isActive && "bg-secondary font-medium shadow-sm"
                      )}
                    >
                      <ItemIcon className="h-4 w-4 shrink-0" />
                      <span className="flex-1 text-left">{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant="default"
                          className="ml-auto h-5 min-w-5 px-1.5 text-[10px] font-medium"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </nav>
  );
}
