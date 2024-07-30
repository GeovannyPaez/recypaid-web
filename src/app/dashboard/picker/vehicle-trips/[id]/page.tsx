import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Truck, Package, Calendar, DollarSign } from 'lucide-react';
import VehicleTripsService from '@/services/server/VehicleTripsService';
import MaterilasService from '@/services/server/MaterilasService';

type VehicleTripDetailsPageProps = {
    params: {
        id: string
    }
}

export default async function VehicleTripDetailsPage({ params }: VehicleTripDetailsPageProps) {
    const { id } = params;
    const tripDetails = await VehicleTripsService.getVehicleTripDetails(id);
    const materials = await MaterilasService.getAllMaterials();

    // Calcular totales
    const totalPagado = tripDetails?.orders?.reduce((total, order) =>
        total + order?.items?.reduce((orderTotal, item) => orderTotal + item.pricePaid * item.quantity, 0), 0);
    const totalVendido = tripDetails?.orders?.flatMap(order => order.items).reduce((total, item) => total + (item.quantity * (item.soldPrice || 0)), 0);
    const ganancia = totalVendido - totalPagado;

    return (
        <div className="container mx-auto py-8 px-4">
            <Card className="w-full max-w-4xl mx-auto shadow-lg">
                <CardHeader className="bg-primary text-primary-foreground">
                    <CardTitle className="flex items-center text-2xl">
                        <Truck className="mr-2" />
                        Detalles del Viaje
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <Badge variant={tripDetails.isSold ? "default" : "destructive"} className="text-sm">
                                {tripDetails.isSold ? 'Viaje Completado' : 'En Progreso'}
                            </Badge>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="mr-2 h-4 w-4" />
                                {format(new Date(tripDetails.createdAt), 'PPP', { locale: es })}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <Package className="mr-2" /> Órdenes Recolectadas
                            </h3>
                            {tripDetails?.orders?.length && tripDetails.orders.map((order, index) => (
                                <Card key={index} className="mb-4 shadow">
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <Badge>{order.status}</Badge>
                                            <span className="text-lg font-bold">${order.total.toFixed(2)}</span>
                                        </div>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Material</TableHead>
                                                    <TableHead>Cantidad</TableHead>
                                                    <TableHead>Subtotal</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {order.items.map((item, itemIndex) => (
                                                    <TableRow key={itemIndex}>
                                                        <TableCell>
                                                            {materials.find(material => material.id === item.recyclableMaterialId)?.name}
                                                        </TableCell>
                                                        <TableCell>{item.quantity} kg</TableCell>
                                                        <TableCell>${item.pricePaid * item.quantity}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="bg-secondary p-6">
                    <div className="w-full">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <DollarSign className="mr-2" /> Resumen Financiero
                        </h3>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Pagado</p>
                                <p className="text-lg font-bold">${totalPagado?.toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Vendido</p>
                                <p className="text-lg font-bold">${totalVendido?.toFixed(2)}</p>
                            </div>
                            {
                                tripDetails.isSold && (
                                    <div>
                                        <p className="text-sm text-muted-foreground">Ganancia</p>
                                        <p className={`text-lg font-bold ${ganancia >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            ${ganancia?.toFixed(2)}
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}