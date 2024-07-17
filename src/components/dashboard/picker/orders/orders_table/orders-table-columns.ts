"use client"
import { OrderFindManyResponseDto } from "@/types/orders";
import { ColumnDef } from "@tanstack/react-table";
import OrdersTableActions from "./orders-table-actions";

export const OrdersTableColumns: ColumnDef<OrderFindManyResponseDto>[] = [
    {
        header: "Cliente",
        accessorKey: "user",
    },
    {
        header: "Total",
        accessorKey: "total",
        cell: ({ row }) => `$${row.original.total}`,
    },
    {
        header: "Dirección",
        accessorKey: "address",
    },
    {
        header: "Fecha de Creación",
        accessorKey: "createdAt",
        cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
        header: "Estado",
        accessorKey: "status",
    },
    {
        id: "actions",
        header: "Acciones",
        cell: OrdersTableActions
    }
];
