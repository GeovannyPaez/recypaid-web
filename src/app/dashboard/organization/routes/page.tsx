import OrganizationService from "@/services/server/OrganizationService";
import OrganizationRoutesList from "@/components/dashboard/organization/routes/organization-routes-list";

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

  const routes = await OrganizationService.getRoutes(selectedOrgId);

  return (
    <OrganizationRoutesList
      organizations={organizations}
      selectedOrgId={selectedOrgId}
      routes={routes}
    />
  );
}
