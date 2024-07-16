import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';
import { Order, OrderList, OrderStatus } from '@/types/orders';
import OrdersService from '@/services/server/OrdersService';



const StatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
  const statusColors = {
    PENDING: "text-yellow-500",
    ACCEPTED: "text-blue-500",
    REJECTED: "text-red-500",
    COMPLETED: "text-green-500",
  };

  const statusText = {
    PENDING: "Pendiente",
    ACCEPTED: "Aceptado",
    REJECTED: "Rechazado",
    COMPLETED: "Completado",
  };

  return <span className={`font-medium ${statusColors[status]}`}>{statusText[status]}</span>;
};

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          {order.items.map((item) => (
            <Badge key={item.id} className="bg-green-500 text-white">
              {item.recyclableMaterial.name}
            </Badge>
          ))}
        </div>
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          {format(new Date(order.createdAt), 'd MMMM')}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
        <StatusBadge status={order.status} />
      </div>
      <div className="mt-4">
        <Button size="sm" variant="outline">
          Ver detalles
        </Button>
      </div>
    </div>
  );
};

const MonthCard: React.FC<{ month: string; orders: Order[] }> = ({ month, orders }) => {
  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">{month}</h2>
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default async function OrdersPage() {
  const {data:orders}= await OrdersService.findAll();
  const groupOrdersByMonth = (orders: OrderList) => {
    const grouped = orders.reduce((acc, order) => {
      const monthYear = format(new Date(order.createdAt), 'MMMM yyyy');
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(order);
      return acc;
    }, {} as Record<string, Order[]>);

    return Object.entries(grouped).sort((a, b) => 
      new Date(b[0]).getTime() - new Date(a[0]).getTime()
    );
  };

  const groupedOrders = groupOrdersByMonth(orders);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mis Pedidos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groupedOrders.map(([month, monthOrders]) => (
          <MonthCard key={month} month={month} orders={monthOrders} />
        ))}
      </div>
    </div>
  );
};
