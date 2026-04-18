import OrganizationService from "@/services/server/OrganizationService";
import OrganizationRoutesManager from "@/components/dashboard/organization/routes/organization-routes-manager";

type RoutesPageProps = {
  searchParams?: {
    orgId?: string;
  };
};

export default async function OrganizationRoutesPage({ searchParams }: RoutesPageProps) {
  const organizations = await OrganizationService.getMyOrganizations();

  if (!organizations.length) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Rutas</h1>
        <p className="text-sm text-muted-foreground">
          No tienes organizaciones disponibles para gestionar rutas.
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
    <OrganizationRoutesManager
      organizations={organizations}
      selectedOrgId={selectedOrgId}
      coveragePoints={coveragePoints}
      routes={routes}
    />
  );
}
