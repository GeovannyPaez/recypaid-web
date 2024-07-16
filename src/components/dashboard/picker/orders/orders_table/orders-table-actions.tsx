import { Button } from '@/components/ui/button'
import { OrderFindManyResponseDto } from '@/types/orders'
import { Row } from '@tanstack/react-table'
import Link from 'next/link'
import React from 'react'

interface OrdersTableActionsProps {
    row:Row<OrderFindManyResponseDto>
}

export default function OrdersTableActions( {row}:OrdersTableActionsProps ) {
    const order = row.original
  return (
    <Button variant={"outline"}>
        <Link href={`/dashboard/picker/orders/${order.id}`}>
            Ver
        </Link>
    </Button>
  )
}
