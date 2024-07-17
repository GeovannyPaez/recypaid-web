"use server"
import getPathNameFromHeaders from "@/lib/get-pathname-from-headers"
import OrdersService from "@/services/server/OrdersService"
import { CompleteOrderDto, CreateOrderDto } from "@/types/orders"
import { revalidatePath } from "next/cache"

export const CreateOrderAction = async (data: CreateOrderDto): Promise<ActionResponse> => {
    try {
        await OrdersService.create(data)
        return { error: false, message: "Solicitud con exito, en el transcurso del dia pasaremos por tus materiales" }
    } catch (error) {
        return { error: true, message: 'Error creating order' }
    }
}

export const RejectOrderAction = async (orderId: string): Promise<ActionResponse> => {
    try {
        await OrdersService.rejectOrder(orderId)
    } catch (error) {
        return { error: true, message: 'Error rejecting order' }
    }
    revalidatePath(getPathNameFromHeaders())
    return { error: false, message: "Orden rechazada" }
}

export const AcceptOrderAction = async (orderId: string): Promise<ActionResponse> => {
    try {
        await OrdersService.acceptOrder(orderId)
    } catch (error) {
        return { error: true, message: 'Error accepting order' }
    }
    revalidatePath(getPathNameFromHeaders())
    return { error: false, message: "Orden aceptada" }

}

export const CompleteOrderAction = async (orderId: string, data: CompleteOrderDto): Promise<ActionResponse> => {
    try {
        await OrdersService.completeOrder(orderId, data)
    } catch (error) {
        return { error: true, message: 'Error completing order' }
    }
    revalidatePath(getPathNameFromHeaders())
    return { error: false, message: "Orden completada" }
}