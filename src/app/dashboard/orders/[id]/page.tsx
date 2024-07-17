import OrderDetails from '@/components/dashboard/picker/orders/order-details'
import { Role } from '@/config/routes'
import React from 'react'

type OrderDetailsPageProps = {
    params: {
        id: string
    }
}
export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
    return (
        <OrderDetails id={params.id} role={Role.USER} />
    )
}
