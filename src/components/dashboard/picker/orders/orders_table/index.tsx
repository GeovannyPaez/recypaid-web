import { DataTable } from '@/components/data_table/data_table'
import OrdersService from '@/services/server/OrdersService'
import React from 'react'
import { OrdersTableColumns } from './orders-table-columns'
import { VariantsOrderStatus } from './orders-table-status'
import { OrderPaginationDto } from '@/types/orders'

type OrdersTableProps = {
  paginationParams?: OrderPaginationDto
}
export default async function OrdersTable({ paginationParams }: OrdersTableProps) {
  const { data: orders, meta } = await OrdersService.findAllPickerOrders(paginationParams)

  return (
    <DataTable data={orders}
      columns={OrdersTableColumns}
      pagination={meta}
      allSearchsParams={[]}
      columnToVariantFilter={{
        keyToVariant: "status",
        variants: VariantsOrderStatus,
        title: "Estado",
        isSearchParam: true
      }}
    />

  )
}
