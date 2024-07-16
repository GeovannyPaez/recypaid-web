import OrdersTable from "@/components/dashboard/picker/orders/orders_table";


export default async function  PickerOrdersPage() {
  
  return (
    <div className="container p-0 overflow-hidden">
      <h1 className="text-3xl font-bold mb-6">Pedidos de Reciclaje</h1>
      
      <OrdersTable  />
    </div>
  );
}
