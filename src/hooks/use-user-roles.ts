"use client";

import { useSession } from "next-auth/react";
import { Role } from "@/core/config/routes";
import { useMemo } from "react";

export function useUserRoles() {
  const { data: session, status } = useSession();

  const userRoles = useMemo(() => {
    // Si existe el array roles, usarlo
    if (session?.user?.roles && session.user.roles.length > 0) {
      return session.user.roles;
    }

    // Si no, usar el role antiguo (convertirlo a array para compatibilidad)
    if (session?.user?.role) {
      return [session.user.role];
    }

    // Si no hay ninguno, retornar array vacío
    return [];
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
