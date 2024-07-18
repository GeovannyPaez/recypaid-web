import { CompleteOrderDto, CreateOrderDto, OrderDetails, OrderList, OrderPaginationDto, OrdersWithLocations } from "@/types/orders";
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
    async findAllPickerOrders(paginationParams?: OrderPaginationDto): Promise<PaginationResponse<OrderList>> {
        try {
            const headers = await this.authHeaders();
            const response = await api.get<PaginationResponse<OrderList>>(`${this.pathName}/all`, {
                params: paginationParams,
                ...headers
            },);
            return response.data;
        } catch (error) {
            throw this.handlerError(error);
        }
    }

    async findAllPickerOrdersLocations(paginationParams?: OrderPaginationDto): Promise<PaginationResponse<OrdersWithLocations[]>> {
        try {
            const headers = await this.authHeaders();
            const response = await api.get<PaginationResponse<OrdersWithLocations[]>>(`${this.pathName}/all-locations`, {
                params: paginationParams,
                ...headers
            });
            return response.data;
        } catch (error) {
            throw this.handlerError(error);
        }
    }
    async getCurrentPickerOrder(): Promise<OrderDetails | null> {
        try {
            const headers = await this.authHeaders();
            const response = await api.get<OrderDetails>(`${this.pathName}/current-picker`, headers);
            return response.data;
        } catch (error) {
            return null
        }
    }
    async orderDetails(orderId: string): Promise<OrderDetails | undefined> {
        try {
            const headers = await this.authHeaders();
            const response = await api.get<OrderDetails>(`${this.pathName}/${orderId}`, headers);
            return response.data;
        } catch (error) {
            return undefined;
        }
    }
    async acceptOrder(orderId: string) {
        try {
            const headers = await this.authHeaders();
            const response = await api.post(`${this.pathName}/${orderId}/accept`, {}, headers);
            return response.data;
        } catch (error) {
            throw this.handlerError(error);
        }
    }
    async rejectOrder(orderId: string) {
        try {
            const headers = await this.authHeaders();
            const response = await api.get(`${this.pathName}/${orderId}/reject`, headers);
            return response.data;
        } catch (error) {
            throw this.handlerError(error);
        }
    }

    async completeOrder(orderId: string, completeOrderDto: CompleteOrderDto) {
        try {
            const headers = await this.authHeaders();
            const response = await api.post(`${this.pathName}/${orderId}/complete`, completeOrderDto, headers);
            return response.data;
        } catch (error) {
            throw this.handlerError(error);
        }
    }
}

export default OrdersService.getInstance();