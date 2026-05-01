"use client";

import Link from "next/link";
import { Organization, OrganizationRoute } from "@/types/organization";
import { Button } from "@/components/ui/button";

type Props = {
  organizations: Organization[];
  selectedOrgId: string;
  routes: OrganizationRoute[];
};

export default function OrganizationRoutesList({ organizations, selectedOrgId, routes }: Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Rutas</h1>
        <Button asChild>
          <Link href={`/dashboard/organization/routes/new?orgId=${selectedOrgId}`}>Crear ruta</Link>
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {organizations.map((organization) => (
          <Link
            key={organization.id}
            href={`/dashboard/organization/routes?orgId=${organization.id}`}
            className={`rounded-md border px-3 py-2 text-sm ${
              organization.id === selectedOrgId ? "border-primary bg-primary/10 font-medium" : "border-border"
            }`}
          >
            {organization.businessName}
          </Link>
        ))}
      </div>

      {routes.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {routes.map((route) => {
            const days = (route.daysOfWeek || []).length;
            const stops = (route.stops || []).length;
            return (
              <Link
                key={route.id}
                href={`/dashboard/organization/routes/${route.id}?orgId=${selectedOrgId}`}
                className="rounded-lg border p-4 transition hover:border-primary hover:bg-primary/5"
              >
                <p className="text-sm font-semibold">{route.name || `Ruta #${route.id.slice(0, 8)}`}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {route.startTime || "--:--"} - {route.endTime || "--:--"}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">Dias: {days} | Puntos: {stops}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Estado: {route.status} | {route.isActive ? "Activa" : "Inactiva"}
                </p>
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

