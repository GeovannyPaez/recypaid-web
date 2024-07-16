import OrderDetails from '@/components/dashboard/picker/orders/order-details'
import React from 'react'
type OrderDetailsPageProps = {
    params:{
        id:string
    }
}
export default  async function OrderDetailsPage({params}:OrderDetailsPageProps) {
  return (
    <OrderDetails id={params.id} />
  )
}
