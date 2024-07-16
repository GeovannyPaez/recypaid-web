export interface Material {
    id: string
    name: string
    description: string
    price: number
    priceBy: PriceBymaterial
    isAvailable: boolean
    createdAt: Date
    updatedAt: Date
}

export type PriceByMaterial = "UNIT" | "KILO"

export interface SelectMaterialItem extends Material {
    quantity?: number
}