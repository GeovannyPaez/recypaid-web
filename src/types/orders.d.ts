import { Material } from "./materilas";
import { UserProfile } from "./user-profile";

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

export interface OrderDetails {
    id: string;
    userId: string;
    pickerId: string | null;
    total: number;
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
    items: OrderItem[];
    userLocation: LocationDto
    user: UserProfile;
    picker: any | null;
}

export type OrderList = OrderFindManyResponseDto[];
export interface OrderFindManyResponseDto {
    id: string;
    user: string;
    address: string;
    total: number;
    materials: string[]
    picker?: string;
    createdAt: Date;
    status: OrderStatus;
}
