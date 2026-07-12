export interface Material {
    id: string
    name: string
    description: string
    price: number
    priceBy: PriceByMaterial
    isAvailable: boolean
    createdAt: Date
    updatedAt: Date
    icon?: string | null
    type?: string
    code?: string | null
}

export type PriceByMaterial = "UNIT" | "KILO"

export interface SelectMaterialItem extends Material {
    quantity?: number
}
