import { notFound } from "next/navigation";
import RouteFormPage from "@/components/dashboard/organization/routes/route-form-page";
import OrganizationService from "@/services/server/OrganizationService";

type RouteEditPageProps = {
  params: { routeId: string };
  searchParams?: { orgId?: string };
};

export default async function RouteEditPage({ params, searchParams }: RouteEditPageProps) {
  const organizations = await OrganizationService.getMyOrganizations();
  if (!organizations.length) {
    return <p className="text-sm text-muted-foreground">No hay organizaciones disponibles.</p>;
  }

  const selectedOrgId =
    searchParams?.orgId && organizations.some((org) => org.id === searchParams.orgId)
      ? searchParams.orgId
      : organizations[0].id;

  const routes = await OrganizationService.getRoutes(selectedOrgId);
  const route = routes.find((item) => item.id === params.routeId);
  if (!route) notFound();

  return <RouteFormPage orgId={selectedOrgId} mode="edit" route={route} />;
}
