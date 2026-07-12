import { Variants } from "@/types/data-table";

export const OrganizationOrderStatusVariants: Variants[] = [
  { label: "Pendiente", value: "PENDING" },
  { label: "Aceptada", value: "ACCEPTED" },
  { label: "Reciclador llego", value: "PICKER_ARRIVED" },
  { label: "Usuario en camino", value: "USER_ON_WAY" },
  { label: "Completada", value: "COMPLETED" },
  { label: "Rechazada", value: "REJECTED" },
  { label: "Cancelada", value: "CANCELED" },
];

export const OrganizationOrderStatusLabels = Object.fromEntries(
  OrganizationOrderStatusVariants.map((status) => [status.value, status.label]),
) as Record<string, string>;
