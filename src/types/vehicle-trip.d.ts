export interface VehicleTripStats {
    tripId: string;
    totalMaterials: number;
    totalKilos: number;
    isSold: boolean;
    totalPricePaid: number;
    totalSoldPrice: number;
}

interface OrderItem {
    id: string;
    orderId: string;
    recyclableMaterialId: string;
    quantity: number;
    pricePaid: number;
    soldPrice: number | null;
    createdAt: string;
    updatedAt: string;
}

interface Order {
    id: string;
    userId: string;
    pickerId: string | null;
    total: number;
    status: string;
    rejectionReason: string | null;
    createdAt: string;
    updatedAt: string;
    vehicleTripId: string;
    items: OrderItem[];
}

export interface VehicleTripDetails {
    id: string;
    vehicleId: string;
    isSold: boolean;
    createdAt: string;
    updatedAt: string;
    orders: Order[];
}
