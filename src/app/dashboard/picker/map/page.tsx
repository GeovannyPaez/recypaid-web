import OrdersLocationsMap from "@/components/maps/orders-locations-map";
import OrdersService from "@/services/server/OrdersService"
import { OrderPaginationDto } from "@/types/orders"

type OrdersMapPageProps = {
  searchParams?: OrderPaginationDto
}

export default async function OrdersMapPage({ searchParams }: OrdersMapPageProps) {
  const ordersLocations = await OrdersService.findAllPickerOrdersLocations(searchParams);

  return (
    <OrdersLocationsMap orders={ordersLocations.data} />
  )
}
