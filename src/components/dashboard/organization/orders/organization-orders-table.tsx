import { DataTable } from "@/components/data_table/data_table";
import OrganizationService from "@/services/server/OrganizationService";
import {
  OrganizationOrderListItem,
  OrganizationOrderStatus,
} from "@/types/organization";
import { OrganizationOrdersColumns } from "./organization-orders-columns";
import { OrganizationOrderStatusVariants } from "./organization-orders-status";

type OrganizationOrdersTableProps = {
  organizationId: string;
  paginationParams?: {
    limit?: string;
    offset?: string;
    status?: OrganizationOrderStatus;
  };
};

export default async function OrganizationOrdersTable({
  organizationId,
  paginationParams,
}: OrganizationOrdersTableProps) {
  const { data: orders, meta } = await OrganizationService.getOrders(
    organizationId,
    paginationParams,
  );

  return (
    <DataTable<OrganizationOrderListItem, unknown>
      data={orders}
      columns={OrganizationOrdersColumns}
      pagination={meta}
      allSearchsParams={["orgId", "status"]}
      columnToVariantFilter={{
        keyToVariant: "status",
        variants: OrganizationOrderStatusVariants,
        title: "Estado",
        isSearchParam: true,
      }}
      enableStackedMobile
    />
  );
}
