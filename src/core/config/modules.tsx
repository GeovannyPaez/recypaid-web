import {
  Home,
  Package,
  Recycle,
  Settings,
  Users,
  Building2,
  BarChart3,
  FileText,
  Truck,
  ClipboardList,
  Shield,
  HelpCircle,
  UserCog,
  Briefcase,
  MapPin,
} from "lucide-react";
import { Role } from "./routes";
import { ModuleConfig } from "@/types/modules";

export const MODULES_CONFIG: ModuleConfig[] = [
  {
    id: "usuario",
    title: "Usuario",
    icon: Home,
    requiredRoles: [Role.USER],
    defaultOpen: true,
    description: "Funcionalidades para usuarios generales",
    items: [
      {
        id: "user-dashboard",
        title: "Inicio",
        href: "/dashboard",
        icon: Home,
        description: "Panel principal de usuario",
      },
      {
        id: "user-orders",
        title: "Mis Pedidos",
        href: "/dashboard/orders",
        icon: Package,
        description: "Gestiona tus pedidos de reciclaje",
      },
      {
        id: "user-recycle",
        title: "Reciclar",
        href: "/dashboard/recycling",
        icon: Recycle,
        description: "Solicita un servicio de reciclaje",
      },
      {
        id: "user-materials",
        title: "Materiales",
        href: "/dashboard/recyclable-materials",
        icon: FileText,
        description: "Consulta materiales reciclables",
      },
    ],
  },

  // Módulo de Reciclador (Picker)
  {
    id: "reciclador",
    title: "Reciclador",
    icon: Truck,
    requiredRoles: [Role.PICKER],
    defaultOpen: true,
    description: "Gestión de recogida y rutas",
    items: [
      {
        id: "picker-dashboard",
        title: "Dashboard",
        href: "/dashboard/picker",
        icon: Home,
        description: "Panel de reciclador",
      },
      {
        id: "picker-orders",
        title: "Pedidos Asignados",
        href: "/dashboard/picker/orders",
        icon: ClipboardList,
        badge: "3",
        description: "Pedidos pendientes de recoger",
      },
      {
        id: "picker-trips",
        title: "Mis Viajes",
        href: "/dashboard/picker/vehicle-trips",
        icon: Truck,
        description: "Historial de viajes",
      },
      {
        id: "picker-locations",
        title: "Rutas",
        href: "/dashboard/picker/routes",
        icon: MapPin,
        description: "Planifica tus rutas",
      },
    ],
  },

  // Módulo de Organización
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
        id: "org-members",
        title: "Miembros",
        href: "/dashboard/organization/members",
        icon: Users,
        description: "Gestiona miembros de la organización",
      },
      {
        id: "org-campaigns",
        title: "Campañas",
        href: "/dashboard/organization/campaigns",
        icon: Briefcase,
        description: "Campañas de reciclaje",
      },
      {
        id: "org-stats",
        title: "Estadísticas",
        href: "/dashboard/organization/statistics",
        icon: BarChart3,
        description: "Métricas de impacto",
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
    description: "Panel administrativo completo",
    items: [
      {
        id: "admin-dashboard",
        title: "Dashboard Admin",
        href: "/dashboard/admin",
        icon: Home,
        description: "Panel de administrador",
      },
      {
        id: "admin-users",
        title: "Usuarios",
        href: "/dashboard/admin/users",
        icon: Users,
        description: "Gestión de usuarios",
      },
      {
        id: "admin-pickers",
        title: "Recicladores",
        href: "/dashboard/admin/pickers",
        icon: Truck,
        description: "Gestión de recicladores",
      },
      {
        id: "admin-organizations",
        title: "Organizaciones",
        href: "/dashboard/admin/organizations",
        icon: Building2,
        description: "Gestión de organizaciones",
      },
      {
        id: "admin-analytics",
        title: "Analíticas",
        href: "/dashboard/admin/analytics",
        icon: BarChart3,
        description: "Reportes y métricas globales",
      },
      {
        id: "admin-settings",
        title: "Configuración",
        href: "/dashboard/admin/settings",
        icon: Settings,
        description: "Configuración del sistema",
      },
    ],
  },

  // Módulo de Moderador
  {
    id: "moderador",
    title: "Moderación",
    icon: UserCog,
    requiredRoles: [Role.MODERADOR],
    defaultOpen: false,
    description: "Herramientas de moderación",
    items: [
      {
        id: "mod-dashboard",
        title: "Dashboard",
        href: "/dashboard/moderator",
        icon: Home,
        description: "Panel de moderador",
      },
      {
        id: "mod-reports",
        title: "Reportes",
        href: "/dashboard/moderator/reports",
        icon: FileText,
        badge: "5",
        description: "Reportes pendientes de revisión",
      },
      {
        id: "mod-reviews",
        title: "Revisiones",
        href: "/dashboard/moderator/reviews",
        icon: ClipboardList,
        description: "Contenido por revisar",
      },
    ],
  },

  // Módulo de Soporte
  {
    id: "soporte",
    title: "Soporte",
    icon: HelpCircle,
    requiredRoles: [Role.SOPORTE],
    defaultOpen: false,
    description: "Atención al cliente",
    items: [
      {
        id: "support-dashboard",
        title: "Dashboard",
        href: "/dashboard/support",
        icon: Home,
        description: "Panel de soporte",
      },
      {
        id: "support-tickets",
        title: "Tickets",
        href: "/dashboard/support/tickets",
        icon: FileText,
        badge: "12",
        description: "Tickets de soporte",
      },
      {
        id: "support-chat",
        title: "Chat en Vivo",
        href: "/dashboard/support/chat",
        icon: HelpCircle,
        description: "Atención en tiempo real",
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
