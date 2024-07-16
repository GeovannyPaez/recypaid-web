import { OrderStatus } from "@/types/orders";


const StatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
    const statusColors = {
      PENDING: "text-yellow-500",
      ACCEPTED: "text-blue-500",
      REJECTED: "text-red-500",
      COMPLETED: "text-green-500",
    };
  
    const statusText = {
      PENDING: "Pendiente",
      ACCEPTED: "Aceptado",
      REJECTED: "Rechazado",
      COMPLETED: "Completado",
    };
  
    return <span className={`font-medium ${statusColors[status]}`}>{statusText[status]}</span>;
  };

  
  export default StatusBadge;