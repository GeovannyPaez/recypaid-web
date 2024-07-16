import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OrderFindManyResponseDto } from "@/types/orders";
import { format } from "date-fns";
import StatusBadge from "./order-status-badge";

const OrderCard: React.FC<{ order: OrderFindManyResponseDto }> = ({ order }) => {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            {order.materials.map((item) => (
              <Badge key={item} className="bg-green-500 text-white">
                {item}
              </Badge>
            ))}
          </div>
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            {format(new Date(order.createdAt), 'd MMMM')}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
          <StatusBadge status={order.status} />
        </div>
        <div className="mt-4">
          <Button size="sm" variant="outline">
            Ver detalles
          </Button>
        </div>
      </div>
    );
  };

  
  export default OrderCard;