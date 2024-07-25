import OrdersTable from "@/components/dashboard/picker/orders/orders_table";
import GoToOrdersLocationsMap from "@/components/maps/go-to-orders-locations-map";
import DateSearchParamFilter from "@/components/shared/date-search-param-filter";
import SkeletonTable from "@/components/shared/skeletons/skeleton-table";
import { OrderPaginationDto } from "@/types/orders";
import { Suspense } from "react";

type OrdersTableProps = {
  searchParams?: OrderPaginationDto
}
export default async function PickerOrdersPage({ searchParams }: OrdersTableProps) {
  return (
    <div className="container p-0 space-y-3 overflow-hidden">
      <div className="flex items-center gap-2 flex-wrap justify-between  ">
        <h1 className="text-3xl font-bold">Pedidos de Reciclaje</h1>
        <div className="flex gap-2 items-center">
          <GoToOrdersLocationsMap />
          <DateSearchParamFilter />
        </div>
      </div>
      <Suspense fallback={<SkeletonTable rows={5} columns={4} />}>
        <OrdersTable paginationParams={searchParams} />
      </Suspense>
    </div>
  );
}
