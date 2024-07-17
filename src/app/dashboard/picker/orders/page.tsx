import OrdersTable from "@/components/dashboard/picker/orders/orders_table";
import { OrderPaginationDto } from "@/types/orders";

type OrdersTableProps = {
  searchParams?: OrderPaginationDto
}
export default async function PickerOrdersPage({ searchParams }: OrdersTableProps) {

  return (
    <div className="container p-0 overflow-hidden">
      <h1 className="text-3xl font-bold mb-6">Pedidos de Reciclaje</h1>

      <OrdersTable paginationParams={searchParams} />
    </div>
  );
}
