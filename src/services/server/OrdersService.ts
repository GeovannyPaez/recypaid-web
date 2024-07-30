import { CompleteOrderDto, CreateOrderDto, OrderDetails, OrderList, OrderPaginationDto, OrdersWithLocations } from "@/types/orders";
import { ApiService } from "./ApiService";
import { PaginationResponse } from "@/types/pagination";


class OrdersService extends ApiService {
    private constructor(readonly pathName: string) {
        super(pathName);
    }

    private static privateInstance: OrdersService;
    static getInstance(): OrdersService {
        if (!OrdersService.privateInstance) {
            OrdersService.privateInstance = new OrdersService("/orders");
        }
        return OrdersService.privateInstance;
    }

    async create(createOrderDto: CreateOrderDto) {
        return this.makeRequest({
            method: "post",
            endpoint: "",
            data: createOrderDto
        })
    }
    async findAll(): Promise<PaginationResponse<OrderList>> {
        return this.makeRequest({
            method: "get",
            endpoint: "",
        })
    }
    async findAllPickerOrders(paginationParams?: OrderPaginationDto): Promise<PaginationResponse<OrderList>> {
        return this.makeRequest({
            method: "get",
            endpoint: "/all",
            searchParams: {
                ...paginationParams
            }
        })
    }

    async findAllPickerOrdersLocations(paginationParams?: OrderPaginationDto): Promise<PaginationResponse<OrdersWithLocations[]>> {
        return this.makeRequest({
            method: "get",
            endpoint: "/all-locations",
            searchParams: {
                ...paginationParams
            }
        })
    }
    async getCurrentPickerOrder(): Promise<OrderDetails | null> {
        return this.makeRequest({
            method: "get",
            endpoint: "/current-picker",
            defaultErrorResponse: null
        })
    }
    async orderDetails(orderId: string): Promise<OrderDetails | undefined> {
        return this.makeRequest({
            method: "get",
            endpoint: `/${orderId}`,
            defaultErrorResponse: undefined
        })
    }
    async acceptOrder(orderId: string) {
        return this.makeRequest({
            method: "post",
            endpoint: `/${orderId}/accept`
        })
    }
    async rejectOrder(orderId: string, reason: string) {
        return this.makeRequest({
            method: "put",
            endpoint: `/${orderId}/reject`,
            searchParams: { reason }
        })
    }

    async completeOrder(orderId: string, completeOrderDto: CompleteOrderDto) {
        return this.makeRequest({
            method: "post",
            endpoint: `/${orderId}/complete`,
            data: completeOrderDto
        })
    }
}

export default OrdersService.getInstance();