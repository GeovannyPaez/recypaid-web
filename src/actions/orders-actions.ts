"use server"
import { errorAction, successAction } from "@/errors/ResponseError"
import getPathNameFromHeaders from "@/lib/get-pathname-from-headers"
import OrdersService from "@/services/server/OrdersService"
import { CompleteOrderDto, CreateOrderDto } from "@/types/orders"
import { revalidatePath } from "next/cache"

export const CreateOrderAction = async (data: CreateOrderDto): Promise<ActionResponse> => {
    try {
        await OrdersService.create(data)

        return successAction("Solicitud con exito, en el transcurso del dia pasaremos por tus materiales")
    } catch (error) {
        const err = error as Error
        return errorAction(err.message)
    }
}

export const RejectOrderAction = async (orderId: string, reason: string): Promise<ActionResponse> => {
    try {
        await OrdersService.rejectOrder(orderId, reason)
    } catch (error) {
        const err = error as Error
        return errorAction(err.message)
    }
    revalidatePath(getPathNameFromHeaders())
    return successAction("Orden rechazada")
}

export const AcceptOrderAction = async (orderId: string): Promise<ActionResponse> => {
    try {
        await OrdersService.acceptOrder(orderId)
    } catch (error) {
        const err = error as Error
        return errorAction(err.message)
    }
    revalidatePath(getPathNameFromHeaders())
    return successAction("Orden aceptada")

}

export const CompleteOrderAction = async (orderId: string, data: CompleteOrderDto): Promise<ActionResponse> => {
    try {
        await OrdersService.completeOrder(orderId, data)
    } catch (error) {
        const err = error as Error
        return errorAction(err.message)
    }
    revalidatePath(getPathNameFromHeaders())
    return successAction("Orden completada")
}