"use client";

import { useSession } from "next-auth/react";
import { Role } from "@/core/config/routes";
import { useMemo } from "react";

export function useUserRoles() {
  const { data: session, status } = useSession();

  const normalizeRole = (rawRole?: string): Role | null => {
    if (!rawRole) return null;

    const role = rawRole.toUpperCase().trim();

    if (role === "ORGANIZATION" || role === "ORGANIZACION" || role.startsWith("ORGANIZATION_")) {
      return Role.ORGANIZACION;
    }
    if (role === "MODERATOR" || role === "MODERADOR" || role.startsWith("MODERATOR_")) {
      return Role.MODERADOR;
    }
    if (role === "SUPPORT" || role === "SOPORTE" || role.startsWith("SUPPORT_")) {
      return Role.SOPORTE;
    }
    if (role === "ADMIN" || role.startsWith("ADMIN_")) {
      return Role.ADMIN;
    }
    // Picker quedó como flujo legacy: se consolida como USER en dashboard único.
    if (role === "PICKER" || role.startsWith("PICKER_")) {
      return Role.USER;
    }
    if (role === "USER" || role === "USUARIO" || role.startsWith("USER_")) {
      return Role.USER;
    }

    return null;
  };

  const userRoles = useMemo(() => {
    const rawRoles = [
      ...(session?.user?.roles || []),
      session?.user?.role,
    ].filter(Boolean) as string[];

    const normalizedRoles = rawRoles
      .map((role) => normalizeRole(role))
      .filter((role): role is Role => role !== null);

    return Array.from(new Set(normalizedRoles));
  }, [session]);

  const hasRole = (role: Role): boolean => {
    return userRoles.includes(role);
  };

  const hasAnyRole = (roles: Role[]): boolean => {
    return roles.some((role) => userRoles.includes(role));
  };

  const hasAllRoles = (roles: Role[]): boolean => {
    return roles.every((role) => userRoles.includes(role));
  };

  const isAdmin = useMemo(() => {
    return userRoles.includes(Role.ADMIN);
  }, [userRoles]);

  const isPicker = useMemo(() => {
    return userRoles.includes(Role.PICKER);
  }, [userRoles]);

  const isOrganization = useMemo(() => {
    return userRoles.includes(Role.ORGANIZACION);
  }, [userRoles]);

  const isUser = useMemo(() => {
    return userRoles.includes(Role.USER);
  }, [userRoles]);

  const isModerator = useMemo(() => {
    return userRoles.includes(Role.MODERADOR);
  }, [userRoles]);

  const isSupport = useMemo(() => {
    return userRoles.includes(Role.SOPORTE);
  }, [userRoles]);

  return {
    userRoles,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    isAdmin,
    isPicker,
    isOrganization,
    isUser,
    isModerator,
    isSupport,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
  };
}
