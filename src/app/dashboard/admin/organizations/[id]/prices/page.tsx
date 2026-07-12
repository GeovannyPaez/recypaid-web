import OrganizationMaterialPricesManager from "@/components/dashboard/organization/prices/organization-material-prices-manager";
import OrganizationService from "@/services/server/OrganizationService";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    id: string;
  };
};

export default async function AdminOrganizationPricesPage({ params }: Props) {
  const [organization, catalog] = await Promise.all([
    OrganizationService.getOrganizationById(params.id),
    OrganizationService.getMaterialPrices(params.id),
  ]);

  return (
    <OrganizationMaterialPricesManager
      organizations={[organization]}
      selectedOrgId={params.id}
      prices={catalog.prices}
      materialsWithoutActivePrice={catalog.materialsWithoutActivePrice}
      backHref="/dashboard/admin/organizations"
    />
  );
}
