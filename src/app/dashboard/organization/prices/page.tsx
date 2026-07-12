import OrganizationMaterialPricesManager from "@/components/dashboard/organization/prices/organization-material-prices-manager";
import OrganizationService from "@/services/server/OrganizationService";

export const dynamic = "force-dynamic";

type OrganizationPricesPageProps = {
  searchParams?: {
    orgId?: string;
  };
};

export default async function OrganizationPricesPage({
  searchParams,
}: OrganizationPricesPageProps) {
  const organizations = await OrganizationService.getMyOrganizations();

  if (!organizations.length) {
    return (
      <div className="space-y-3">
        <h1 className="text-3xl font-bold">Precios por material</h1>
        <p className="text-sm text-muted-foreground">
          No tienes organizaciones asignadas para gestionar precios.
        </p>
      </div>
    );
  }

  const selectedOrgId =
    searchParams?.orgId && organizations.some((org) => org.id === searchParams.orgId)
      ? searchParams.orgId
      : organizations[0].id;
  const catalog = await OrganizationService.getMaterialPrices(selectedOrgId);

  return (
    <OrganizationMaterialPricesManager
      organizations={organizations}
      selectedOrgId={selectedOrgId}
      prices={catalog.prices}
      materialsWithoutActivePrice={catalog.materialsWithoutActivePrice}
      backHref="/dashboard/organization"
      showOrganizationSelector
    />
  );
}
