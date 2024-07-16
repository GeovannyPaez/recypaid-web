"use server"
import OrdersService from "@/services/server/OrdersService"
import { CreateOrderDto } from "@/types/orders"

export const CreateOrderAction = async (data: CreateOrderDto): Promise<ActionResponse> => {
    try {
        await OrdersService.create(data)
        return { error: false, message: "Solicitud con exito, en el transcurso del dia pasaremos por tus materiales" }
    } catch (error) {
        return { error: true, message: 'Error creating order' }
    }
}   