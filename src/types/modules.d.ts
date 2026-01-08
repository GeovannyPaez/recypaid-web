import { LucideIcon } from "lucide-react";
import { Role } from "@/core/config/routes";

export interface MenuItem {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
  description?: string;
}

export interface ModuleConfig {
  id: string;
  title: string;
  icon: LucideIcon;
  requiredRoles: Role[];
  items: MenuItem[];
  defaultOpen?: boolean;
  description?: string;
}
