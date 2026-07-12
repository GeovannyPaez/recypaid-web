import { OrderStatus } from "@/types/orders";


const StatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
    const statusColors: Record<OrderStatus, string> = {
      PENDING: "text-yellow-500",
      ACCEPTED: "text-blue-500",
      REJECTED: "text-red-500",
      COMPLETED: "text-green-500",
      CANCELED: "text-red-500",
      PICKER_ARRIVED: "text-cyan-500",
      USER_ON_WAY: "text-indigo-500",
    };
  
    const statusText: Record<OrderStatus, string> = {
      PENDING: "Pendiente",
      ACCEPTED: "Aceptado",
      REJECTED: "Rechazado",
      COMPLETED: "Completado",
      CANCELED: "Cancelado",
      PICKER_ARRIVED: "Reciclador llego",
      USER_ON_WAY: "Usuario en camino",
    };
  
    return <span className={`font-medium ${statusColors[status]}`}>{statusText[status]}</span>;
  };

  
  export default StatusBadge;
