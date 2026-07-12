import Link from "next/link";
import OrganizationOrdersTable from "@/components/dashboard/organization/orders/organization-orders-table";
import OrganizationService from "@/services/server/OrganizationService";
import { OrganizationOrderStatus } from "@/types/organization";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    id: string;
  };
  searchParams?: {
    status?: OrganizationOrderStatus;
    limit?: string;
    offset?: string;
  };
};

export default async function AdminOrganizationOrdersPage({
  params,
  searchParams,
}: Props) {
  const organization = await OrganizationService.getOrganizationById(params.id);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Link
          href="/dashboard/admin/organizations"
          className="text-sm text-primary hover:underline"
        >
          Volver a organizaciones
        </Link>
        <h1 className="text-3xl font-bold">Solicitudes</h1>
        <p className="text-sm text-muted-foreground">
          Solicitudes asociadas a {organization.businessName}.
        </p>
      </div>

      <OrganizationOrdersTable
        organizationId={params.id}
        paginationParams={{
          limit: searchParams?.limit,
          offset: searchParams?.offset,
          status: searchParams?.status,
        }}
      />
    </div>
  );
}
