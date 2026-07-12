import {
  Home,
  Building2,
  BarChart3,
  ClipboardList,
  Shield,
  MapPin,
  Users,
  DollarSign,
} from "lucide-react";
import { Role } from "./routes";
import { ModuleConfig } from "@/types/modules";

export const MODULES_CONFIG: ModuleConfig[] = [
  {
    id: "organizacion",
    title: "Organización",
    icon: Building2,
    requiredRoles: [Role.ORGANIZACION],
    defaultOpen: false,
    description: "Gestión organizacional",
    items: [
      {
        id: "org-dashboard",
        title: "Dashboard",
        href: "/dashboard/organization",
        icon: Home,
        description: "Panel de organización",
      },
      {
        id: "org-routes",
        title: "Rutas",
        href: "/dashboard/organization/routes",
        icon: ClipboardList,
        description: "Crea y administra rutas programadas",
      },
      {
        id: "org-orders",
        title: "Solicitudes",
        href: "/dashboard/organization/orders",
        icon: ClipboardList,
        description: "Consulta solicitudes, estados, rutas y responsables",
      },
      {
        id: "org-pickers",
        title: "Recicladores",
        href: "/dashboard/organization/pickers",
        icon: Users,
        description: "Vincula recicladores registrados en app mobile",
      },
      {
        id: "org-prices",
        title: "Precios",
        href: "/dashboard/organization/prices",
        icon: DollarSign,
        description: "Configura precios de compra por material",
      },
      {
        id: "org-statistics",
        title: "Estadísticas",
        href: "/dashboard/organization/statistics",
        icon: BarChart3,
        description: "Métricas operativas de rutas y cobertura",
      },
    ],
  },

  // Módulo de Administrador
  {
    id: "admin",
    title: "Administración",
    icon: Shield,
    requiredRoles: [Role.ADMIN],
    defaultOpen: false,
    description: "Panel administrativo operativo",
    items: [
      {
        id: "admin-organizations",
        title: "Organizaciones",
        href: "/dashboard/admin/organizations",
        icon: Building2,
        description: "Gestión de organizaciones",
      },
    ],
  },
];

/**
 * Filtra los módulos según los roles del usuario
 */
export function getModulesForUser(userRoles: Role[]): ModuleConfig[] {
  return MODULES_CONFIG.filter((module) =>
    module.requiredRoles.some((role) => userRoles.includes(role))
  );
}

/**
 * Verifica si un usuario tiene acceso a un módulo específico
 */
export function hasAccessToModule(
  userRoles: Role[],
  moduleId: string
): boolean {
  // eslint-disable-next-line @next/next/no-assign-module-variable
  const module = MODULES_CONFIG.find((m) => m.id === moduleId);
  if (!module) return false;
  return module.requiredRoles.some((role) => userRoles.includes(role));
}
