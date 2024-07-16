import { CreateOrderDto, Order, OrderList } from "@/types/orders";
import { ApiService } from "./ApiService";
import api from "@/lib/api";
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
        try {
            const headers = await this.authHeaders();
            const response = await api.post(this.pathName, createOrderDto, headers);
            return response.data;
        } catch (error) {
            throw this.handlerError(error);
        }
    }
    async findAll(): Promise<PaginationResponse<OrderList>> {
        try {
            const headers = await this.authHeaders();
            const response = await api.get<PaginationResponse<OrderList>>(this.pathName, headers);
            return response.data;
        } catch (error) {
            throw this.handlerError(error);
        }
    }
    async findAllPickerOrders(): Promise<PaginationResponse<OrderList>> {
        try {
            const headers = await this.authHeaders();
            const response = await api.get<PaginationResponse<OrderList>>(`${this.pathName}/all`, headers);
            return response.data;
        } catch (error) {
            throw this.handlerError(error);
        }
    }
    async getCurrentPickerOrder(): Promise<Order | null> {
        try {
            const headers = await this.authHeaders();
            const response = await api.get<Order>(`${this.pathName}/current-picker`, headers);
            return response.data;
        } catch (error) {
            return null
        }
    }
}

export default OrdersService.getInstance();