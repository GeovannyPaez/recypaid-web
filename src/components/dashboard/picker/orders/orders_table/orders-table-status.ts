import { Variants } from "@/types/data-table";

export const VariantsOrderStatus: Variants[] = [
    {
        label: "Pendiente",
        value: "PENDING",
    },
    {
        label: "En Proceso",
        value: "ACEPTED",
    },
    {
        label: "Completado",
        value: "COMPLETED",
    },
    {
        label: "Cancelado",
        value: "REJECTED",
    }
]