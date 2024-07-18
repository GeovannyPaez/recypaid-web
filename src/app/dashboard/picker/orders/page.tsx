import OrdersTable from "@/components/dashboard/picker/orders/orders_table";
import SkeletonTable from "@/components/shared/skeletons/skeleton-table";
import { OrderPaginationDto } from "@/types/orders";
import { Suspense } from "react";

type OrdersTableProps = {
  searchParams?: OrderPaginationDto
}
export default async function PickerOrdersPage({ searchParams }: OrdersTableProps) {

  return (
    <div className="container p-0 overflow-hidden">
      <h1 className="text-3xl font-bold mb-6">Pedidos de Reciclaje</h1>
      <Suspense fallback={<SkeletonTable rows={5} columns={4} />}>
        <OrdersTable paginationParams={searchParams} />
      </Suspense>
    </div>
  );
}
