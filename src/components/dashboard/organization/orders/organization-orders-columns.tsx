"use client";

import { Badge } from "@/components/ui/badge";
import { OrganizationOrderListItem } from "@/types/organization";
import { ColumnDef } from "@tanstack/react-table";
import { OrganizationOrderStatusLabels } from "./organization-orders-status";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value || 0);

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

const orderTypeLabel: Record<OrganizationOrderListItem["orderType"], string> = {
  SALE: "Venta",
  DONATION: "Donacion",
};

export const OrganizationOrdersColumns: ColumnDef<OrganizationOrderListItem>[] = [
  {
    header: "Cliente",
    accessorKey: "user.name",
    cell: ({ row }) => (
      <div className="min-w-[150px]">
        <p className="font-medium">{row.original.user.name || "Usuario"}</p>
        {row.original.user.phone ? (
          <p className="text-xs text-muted-foreground">{row.original.user.phone}</p>
        ) : null}
      </div>
    ),
  },
  {
    header: "Tipo",
    accessorKey: "orderType",
    cell: ({ row }) => orderTypeLabel[row.original.orderType],
  },
  {
    header: "Estado",
    accessorKey: "status",
    cell: ({ row }) => (
      <Badge variant={row.original.status === "COMPLETED" ? "default" : "secondary"}>
        {OrganizationOrderStatusLabels[row.original.status] || row.original.status}
      </Badge>
    ),
  },
  {
    header: "Ruta",
    accessorKey: "route.name",
    cell: ({ row }) =>
      row.original.route ? (
        <div className="min-w-[150px]">
          <p className="font-medium">{row.original.route.name}</p>
          <p className="text-xs text-muted-foreground">{row.original.route.status}</p>
        </div>
      ) : (
        <span className="text-muted-foreground">Sin ruta</span>
      ),
  },
  {
    header: "Completada por",
    accessorKey: "completedBy.name",
    cell: ({ row }) =>
      row.original.completedBy ? (
        <div className="min-w-[150px]">
          <p className="font-medium">{row.original.completedBy.name}</p>
          {row.original.completedBy.phone ? (
            <p className="text-xs text-muted-foreground">{row.original.completedBy.phone}</p>
          ) : null}
        </div>
      ) : (
        <span className="text-muted-foreground">Sin completar</span>
      ),
  },
  {
    header: "Reciclador",
    accessorKey: "picker.name",
    cell: ({ row }) =>
      row.original.picker ? (
        <span>{row.original.picker.name}</span>
      ) : (
        <span className="text-muted-foreground">No asignado</span>
      ),
  },
  {
    header: "Materiales",
    accessorKey: "materials",
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.materials.length
          ? row.original.materials
              .slice(0, 2)
              .map((item) => `${item.name} (${item.quantity})`)
              .join(", ")
          : "Sin materiales"}
        {row.original.materials.length > 2
          ? ` +${row.original.materials.length - 2}`
          : ""}
      </span>
    ),
  },
  {
    header: "Total",
    accessorKey: "total",
    cell: ({ row }) => formatCurrency(row.original.total),
  },
  {
    header: "Creada",
    accessorKey: "createdAt",
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
];
