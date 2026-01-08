import ListaPickers from '@/components/admin/picker/list-picker-table'
import { PageProps, PaginationSearchParamsPage } from '@/types/pagination'
import React from 'react'

export default async function Pickers(props: PageProps<PaginationSearchParamsPage>) {
  const searchParams = await props.searchParams
  return (
    <div>
      <div className="flex justify-between my-4 font-bold">
        <h1 className="text-3xl">Recicladores</h1>
      </div>
      <ListaPickers pagination={searchParams} />
    </div>
  )
}