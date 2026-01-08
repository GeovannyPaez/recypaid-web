"use client";

import { Cross } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { debounce } from "lodash";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Variants } from "@/types/data-table";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { DataTableDateFilters, DateFiltersConfig } from "./data-table-date-filter";
import { SelectWithSearchConfig } from "./data_table";
import { useSearchParams } from "next/navigation";
import SelectWithSearch from "../shared/SelectWithSearch";

export type ColumnToVariantFilter<TData> = {
  keyToVariant: keyof TData;
  title: string;
  variants: Variants[];
  isSearchParam?: boolean; // si es true se va a usar como parametro de busqueda en la url
};

// Actualizar DataTableToolbar - agregar estas props al interface
interface DataTableToolbarProps<TData> {
  table: Table<TData>
  keyToFilter?: keyof TData
  columnToVariantFilter?: ColumnToVariantFilter<TData>
  allSearchsParams: string[]
  isShowSearchInput?: boolean
  // Nuevas props para fechas
  dateFilters?: DateFiltersConfig<TData>
  selectFilters?: SelectWithSearchConfig[]
}
// 4. Actualizar DataTableToolbar para incluir los filtros de fecha
export function DataTableToolbar<TData>({
  table,
  columnToVariantFilter,
  allSearchsParams,
  isShowSearchInput,
  dateFilters, // Nueva prop
  selectFilters
}: DataTableToolbarProps<TData>) {
  const { handleUpdateSearchParams, deleteSarchParam } = useUpdateSearchParams({ searchParamsInPage: [] })
  const searchParams = useSearchParams()
  const isFiltered = table.getState().columnFilters.length > 0
  const { keyToVariant, title, variants } = columnToVariantFilter || {
    title: "",
    variants: [],
    isSearchParam: false,
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2 flex-wrap">
        {isShowSearchInput && (
          <div className="flex flex-col space-y-1  w-full lg:w-[250px] ">
            <label htmlFor="fecha-inicio" className="text-xs text-muted-foreground">
              {'Buscar'}
            </label>
            <Input
              placeholder="Buscar"
              onChange={(event) =>
                debounce(() => {
                  const value = event.target.value
                  if (value === "") return deleteSarchParam("search")
                  handleUpdateSearchParams([{ key: "search", value }])
                }, 500)()
              }
              className="h-8"
            />
          </div>
        )}

        {/* SelectWithSearch filters */}
        {selectFilters?.map((selectConfig) => {
          // Construir parámetros dinámicos basados en dependencias
          const dynamicParams: Record<string, string> = { ...selectConfig.additionalParams }

          if (selectConfig.dependsOn && selectConfig.dependsOn.length > 0) {
            selectConfig.dependsOn.forEach((dependency) => {
              const dependencyValue = searchParams.get(dependency)
              if (dependencyValue) {
                dynamicParams[dependency] = dependencyValue
              }
            })
          }

          return (
            <div key={selectConfig.searchParamKey} className="flex flex-col space-y-1 w-full lg:w-[250px]">
              {selectConfig.label && (
                <label className="text-xs text-muted-foreground">
                  {selectConfig.label}
                </label>
              )}
              <SelectWithSearch
                endpoint={selectConfig.endpoint}
                value={searchParams.get(selectConfig.searchParamKey) || undefined}
                onSelect={(value) => {
                  if (!value) {
                    deleteSarchParam(selectConfig.searchParamKey)
                  } else {
                    handleUpdateSearchParams([{ key: selectConfig.searchParamKey, value }])
                  }
                }}
                placeholder={selectConfig.placeholder || "Seleccione una opción"}
                maperOptions={selectConfig.maperOptions}
                clearable={selectConfig.clearable}
                clearLabel={selectConfig.clearLabel}
                params={dynamicParams}
              />
            </div>
          )
        })}

        {/* Filtros de fecha opcionales */}
        {dateFilters?.showDateFilters && (
          <DataTableDateFilters
            table={table}
            dateFilters={dateFilters}
            allSearchsParams={allSearchsParams}
          />
        )}

        {keyToVariant &&
          table.getColumn(keyToVariant && keyToVariant.toString()) && (
            <DataTableFacetedFilter
              column={table.getColumn(keyToVariant.toString())}
              title={title}
              keyToVariant={keyToVariant}
              isSearchParam={columnToVariantFilter?.isSearchParam}
              allSearchsParams={allSearchsParams}
              options={variants}
            />
          )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Limpiar
            <Cross className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}