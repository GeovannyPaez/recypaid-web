import { OrderFindManyResponseDto } from "@/types/orders";
import OrderCard from "./order-card";

const MonthCard: React.FC<{ month: string; orders: OrderFindManyResponseDto[] }> = ({ month, orders }) => {
    return (
      <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">{month}</h2>
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  
  export default MonthCard;