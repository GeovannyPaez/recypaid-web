import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Check, ClipboardCheck, Map, Phone, UserIcon, X } from "lucide-react"
import OrdersService from "@/services/server/OrdersService"
import StatusBadge from "../../orders/order-status-badge"
import GoToGoggleMaps from '@/components/maps/go-to-goggle-maps';
import ModalDeleteAction from '@/components/ui/modal-delete-action';
import OrderModalCompleteAction from './order-modal-complete-action';
import { AcceptOrderAction, RejectOrderAction } from '@/actions/orders-actions';
import ButtonHandleServerAction from '@/components/ui/button-handle-server-action';
import MaterilasService from '@/services/server/MaterilasService';
import { Role } from '@/config/routes';

type OrderDetailsPageProps = {
    id: string
    role?: Role
}

export default async function OrderDetails({ id, role }: OrderDetailsPageProps) {
    const orderDetails = await OrdersService.orderDetails(id)
    const allMaterials = await MaterilasService.getAllMaterials();
    if (!orderDetails) {
        return <div>Order not found</div>
    }

    const { user, status, createdAt, total, items, userLocation } = orderDetails;
    const { latitude, longitude } = userLocation;
    const formatDate = (dateString: Date) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Solicitud de reciclaje</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                        <UserIcon className="h-5 w-5 text-muted-foreground" />
                        <span>{user.name} {user.lastname}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                        <span>{formatDate(createdAt)}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5 text-muted-foreground" />
                    <StatusBadge status={status} />
                </div>
                <div className="flex items-center gap-2">
                    <Map className="h-5 w-5 text-muted-foreground" />
                    <span className="break-words">{user.address}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <span>{user.phone}</span>
                </div>

                <Separator />
                <div className="grid gap-4">
                    <div className="grid grid-cols-5 gap-2 items-center font-medium text-sm">
                        <span className="col-span-2 text-xs">Material</span>
                        <span className="text-right text-xs">Precio</span>
                        <span className="text-right text-xs">Cantidad</span>
                        <span className="text-right text-xs">Subtotal</span>
                    </div>
                    {items.map((item) => (
                        <div key={item.id} className="grid grid-cols-5 gap-2 items-center text-sm">
                            <span className="col-span-2 font-medium text-xs">{item.recyclableMaterial.name}</span>
                            <span className="text-right text-xs">${item.recyclableMaterial.price.toFixed(2)}/{item.recyclableMaterial.priceBy}</span>
                            <span className="text-right text-xs">{item.quantity}</span>
                            <span className="text-right font-medium text-xs">${(item.quantity * item.recyclableMaterial.price).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
                <Separator />
                <div className="flex items-center justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </CardContent>
            {role === Role.PICKER && (
                <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <GoToGoggleMaps latitude={latitude} longitude={longitude} />
                    <div className="flex gap-2">
                        {(status == "PENDING" || status == "ACCEPTED") && (
                            <ModalDeleteAction
                                title="Rechazar solicitud"
                                alertMessage="¿Estás seguro de rechazar esta solicitud?"
                                serverAction={async () => {
                                    "use server";
                                    return RejectOrderAction(id)
                                }}
                            >
                                <Button variant="outline" size="sm">
                                    <X className="h-4 w-4 mr-2" />
                                    Rechazar
                                </Button>
                            </ModalDeleteAction>
                        )}
                        {
                            status === "PENDING" && (
                                <ButtonHandleServerAction
                                    serverAction={async () => {
                                        "use server"
                                        return AcceptOrderAction(id)
                                    }}
                                    buttonProps={{
                                        size: "sm"
                                    }}>
                                    <Check className="h-4 w-4 mr-2" />
                                    Aceptar
                                </ButtonHandleServerAction>
                            )
                        }
                        {
                            status === "ACCEPTED" && (
                                <OrderModalCompleteAction allMaterials={allMaterials} orderItems={orderDetails.items} />
                            )
                        }
                    </div>
                </CardFooter>
            )}
        </Card>
    )
}