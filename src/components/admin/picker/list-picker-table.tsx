import { DataTable } from "@/components/data_table/data_table";
import { PaginationSearchParamsPage } from "@/types/pagination";
import React from "react";
import { PickerColumns } from "./columns-pickers";
import { CicloPickerService } from "@/services/admin/picker/ciclo-picker.service";

type Props = {
  pagination?: PaginationSearchParamsPage;
};

export default async function ListaPickers({ pagination }: Props) {
  const { data, error } = await new CicloPickerService().listAllPicker(
    pagination || {}
  );

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-destructive/10 text-destructive">
        <p>Ocurrió un error al cargar los recicladores</p>
        <p className="text-sm mt-2">{error.message}</p>
      </div>
    );
  }

  return (
    <DataTable
      data={data?.data || []}
      columns={PickerColumns}
      pagination={data?.meta}
      isShowSearchInput
      columnToVariantFilter={{
        isSearchParam: true,
        keyToVariant: 'status',
        title: 'Estado',
        variants: [
          {
            label: 'Todos',
            value: ' '
          },
          {
            label: 'APROBADO',
            value: 'APPROVED',
          },
          {
            label: 'PENDIENTE',
            value: 'PENDING',
          },
          {
            label: 'RECHAZADO',
            value: 'REJECTED',
          },
          {
            label: 'BLOQUEADO',
            value: 'BLOCKED'
          }
        ]
      }}

    />
  );
}