import { sellVehicleTripAction } from '@/actions/vehicle-trip.action';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ModalDeleteAction from '@/components/ui/modal-delete-action';
import { VehicleTripStats } from '@/types/vehicle-trip';
import Link from 'next/link';
import React from 'react'

type VehicleTripBasicDetailsProps = {
    trip: VehicleTripStats
}
export default function vehicleTripBasicDetails({ trip }: VehicleTripBasicDetailsProps) {
    return (
        <Card className="p-4 bg-background rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
                <div className="text-lg font-semibold">Viaje </div>
                <Badge
                    variant={trip.isSold ? "default" : "destructive"}
                    className="px-2 py-1 rounded-full text-xs"
                >
                    {trip.isSold ? "Vendido" : "En progreso"}
                </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
                <div>
                    <div className="text-sm text-muted-foreground">Peso total</div>
                    <div className="text-lg font-semibold">{trip.totalKilos} kg</div>
                </div>
                <div>
                    <div className="text-sm text-muted-foreground">Cantidad Materiales</div>
                    <div className="text-lg font-semibold">{trip.totalMaterials}</div>
                </div>
                <div>
                    <div className="text-sm text-muted-foreground">Pedidos</div>
                    <div className="text-lg font-semibold">{trip.totalMaterials}</div>
                </div>
                <div>
                    <div className="text-sm text-muted-foreground">Costo total</div>
                    <div className="text-lg font-semibold">${trip.totalPricePaid}</div>
                </div>

            </div>
            <div className="flex justify-between">
                <Button variant="outline" size="sm">
                    <Link href={`/dashboard/picker/vehicle-trips/${trip.tripId}`}>
                        Ver detalles
                    </Link>
                </Button>
                {
                    !trip.isSold && (
                        <ModalDeleteAction
                            serverAction={async () => {
                                "use server";
                                return sellVehicleTripAction(trip.tripId)
                            }}
                            alertMessage='¿Estás seguro de que deseas vender este viaje?'
                        >
                            <Button>
                                Completar
                            </Button>
                        </ModalDeleteAction>
                    )
                }
            </div>
        </Card>
    )
}
