"use client"
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserCog2 } from "lucide-react";
import EstadoBadge from "@/components/shared/estado-badge";
import { PickerEntity } from "@/services/admin/picker/entity/list-all-picker-entity";


export const PickerColumns: ColumnDef<PickerEntity>[] = [
  {
    accessorKey: "profile.name",
    header: "Nombre",
    cell: ({ row }) => (
      <div className="font-medium">
        {`${row.original.profile.name} ${row.original.profile.lastname}`}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => (
      <EstadoBadge
        estado={row.getValue("status")}
      />
    ),
  },
  {
    accessorKey: "statusReason",
    header: "Razón de Estado",
    cell: ({ row }) => (
      <span className="text-muted-foreground max-w-xs truncate">
        {row.getValue("statusReason") || "-"}
      </span>
    ),
  },
  {
    accessorKey: "profile.createdAt",
    header: "Perfil Creado",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {format(new Date(row.original.profile.createdAt), "PP", { locale: es })}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Registrado",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {format(new Date(row.getValue("createdAt")), "PP", { locale: es })}
      </span>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Última Actualización",
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">
        {format(new Date(row.getValue("updatedAt")), "Pp", { locale: es })}
      </span>
    ),
  },
  {
    id: "actions",
    header: 'Acciones',
    cell: ({ row }) => (
      <Link
        href={`/dashboard/admin/pickers/${row.original.userId}`}
      >
        <Button
          size={'icon'}
          title="Gestionar Reciclador"
        >
          <UserCog2 />
        </Button>
      </Link>
    )
  },
];