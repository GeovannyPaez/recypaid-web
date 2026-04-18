import Link from "next/link";
import OrganizationService from "@/services/server/OrganizationService";

type StatisticsPageProps = {
  searchParams?: {
    orgId?: string;
  };
};

export default async function OrganizationStatisticsPage({ searchParams }: StatisticsPageProps) {
  const organizations = await OrganizationService.getMyOrganizations();

  if (!organizations.length) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Estadísticas</h1>
        <p className="text-sm text-muted-foreground">
          No tienes organizaciones disponibles para consultar estadísticas.
        </p>
      </div>
    );
  }

  const selectedOrgId =
    searchParams?.orgId && organizations.some((org) => org.id === searchParams.orgId)
      ? searchParams.orgId
      : organizations[0].id;
  const coveragePoints = await OrganizationService.getCoverage(selectedOrgId);
  const routes = await OrganizationService.getRoutes(selectedOrgId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Estadísticas de Organización</h1>
        <Link href="/dashboard/organization" className="text-sm text-primary hover:underline">
          Volver a organización
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Organizaciones gestionadas</p>
          <p className="text-2xl font-bold">{organizations.length}</p>
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Puntos de cobertura activos</p>
          <p className="text-2xl font-bold">{coveragePoints.length}</p>
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Rutas programadas</p>
          <p className="text-2xl font-bold">{routes.length}</p>
        </div>
      </div>
    </div>
  );
}

