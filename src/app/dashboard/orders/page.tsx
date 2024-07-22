import React from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import { OrderFindManyResponseDto, OrderList } from '@/types/orders';
import OrdersService from '@/services/server/OrdersService';
import MonthCard from '@/components/dashboard/orders/order-month-card';
import { Button } from '@/components/ui/button';

export default async function OrdersPage() {
  const { data: orders } = await OrdersService.findAll();

  const groupOrdersByMonth = (orders: OrderList) => {
    const grouped = orders.reduce((acc, order) => {
      const monthYear = format(new Date(order.createdAt), 'MMMM yyyy');
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(order);
      return acc;
    }, {} as Record<string, OrderFindManyResponseDto[]>);

    return Object.entries(grouped).sort((a, b) =>
      new Date(b[0]).getTime() - new Date(a[0]).getTime()
    );
  };

  const groupedOrders = groupOrdersByMonth(orders);

  if (orders.length === 0) {
    return (
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">Mis Pedidos</h1>
        <p className="text-xl mb-6">No tienes solicitudes de reciclaje en este momento.</p>
        <Link href="/dashboard/recycling">
          <Button>Hacer mi primer reciclaje</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className=" mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mis Pedidos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groupedOrders.map(([month, monthOrders]) => (
          <MonthCard key={month} month={month} orders={monthOrders} />
        ))}
      </div>
    </div>
  );
}