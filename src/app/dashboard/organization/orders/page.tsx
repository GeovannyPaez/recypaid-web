import Link from "next/link";
import OrganizationOrdersTable from "@/components/dashboard/organization/orders/organization-orders-table";
import OrganizationService from "@/services/server/OrganizationService";
import { OrganizationOrderStatus } from "@/types/organization";

export const dynamic = "force-dynamic";

type OrganizationOrdersPageProps = {
  searchParams?: {
    orgId?: string;
    status?: OrganizationOrderStatus;
    limit?: string;
    offset?: string;
  };
};

export default async function OrganizationOrdersPage({
  searchParams,
}: OrganizationOrdersPageProps) {
  const organizations = await OrganizationService.getMyOrganizations();

  if (!organizations.length) {
    return (
      <div className="space-y-3">
        <h1 className="text-3xl font-bold">Solicitudes</h1>
        <p className="text-sm text-muted-foreground">
          No tienes organizaciones asignadas para consultar solicitudes.
        </p>
      </div>
    );
  }

  const selectedOrgId =
    searchParams?.orgId && organizations.some((org) => org.id === searchParams.orgId)
      ? searchParams.orgId
      : organizations[0].id;

  const selectedOrganization = organizations.find((org) => org.id === selectedOrgId);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Solicitudes</h1>
        <p className="text-sm text-muted-foreground">
          Consulta las solicitudes de {selectedOrganization?.businessName || "tu organizacion"},
          su estado, ruta asociada y reciclador que completo el servicio.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {organizations.map((organization) => (
          <Link
            key={organization.id}
            href={`/dashboard/organization/orders?orgId=${organization.id}`}
            className={`rounded-md border px-3 py-2 text-sm ${
              organization.id === selectedOrgId
                ? "border-primary bg-primary/10 font-medium"
                : "border-border"
            }`}
          >
            {organization.businessName}
          </Link>
        ))}
      </div>

      <OrganizationOrdersTable
        organizationId={selectedOrgId}
        paginationParams={{
          limit: searchParams?.limit,
          offset: searchParams?.offset,
          status: searchParams?.status,
        }}
      />
    </div>
  );
}
