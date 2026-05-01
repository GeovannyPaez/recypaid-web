import RouteFormPage from "@/components/dashboard/organization/routes/route-form-page";
import OrganizationService from "@/services/server/OrganizationService";

type RouteNewPageProps = {
  searchParams?: {
    orgId?: string;
  };
};

export default async function RouteNewPage({ searchParams }: RouteNewPageProps) {
  const organizations = await OrganizationService.getMyOrganizations();
  if (!organizations.length) {
    return <p className="text-sm text-muted-foreground">No hay organizaciones disponibles.</p>;
  }

  const selectedOrgId =
    searchParams?.orgId && organizations.some((org) => org.id === searchParams.orgId)
      ? searchParams.orgId
      : organizations[0].id;

  return <RouteFormPage orgId={selectedOrgId} mode="create" />;
}
