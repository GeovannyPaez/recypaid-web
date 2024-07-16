import { Material } from "./materilas";

export interface CreateOrderDto {
    materials: CreateOrderItemDto[];
    address?: string;
    location: LocationDto;
}

export interface CreateOrderItemDto {
    materialId: string;
    quantity: number;
}

export interface LocationDto {
    latitude: number;
    longitude: number;
}

export type OrderStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED";



export interface OrderItem {
    id: string;
    orderId: string;
    recyclableMaterialId: string;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    recyclableMaterial: Material;
}

export interface Order {
    id: string;
    userId: string;
    pickerId: string | null;
    total: number;
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
    items: OrderItem[];
}

export type OrderList = Order[];