
export interface UserStatistics {
    totalEarnings: number;
    materialsSold: number;
    pendingOrders: number;
    rejectedOrders: number;
}

export interface PickerStatistics {
    assignedOrders: number;
    completedOrders: number;
    isBusy: boolean;
    collectedMaterials: number;
    totalEarnings: number;
}