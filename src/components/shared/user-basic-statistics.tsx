import React from 'react'
import InfoCardHome from './info-card-home'
import { DollarSignIcon, RecycleIcon, ClockIcon, XCircleIcon, ClipboardListIcon, CheckCircleIcon, UserIcon, CarIcon } from 'lucide-react'
import { Role } from '@/config/routes'
import StatisticsService from '@/services/server/StatisticsService'
import { PickerStatistics } from '@/types/statistics'
import OrdersService from '@/services/server/OrdersService'

// ... rest of the imports

type UserBasicStatisticsProps = {
    role?: Role
}
export default async function UserBasicStatistics({ role = Role.USER }: UserBasicStatisticsProps) {
    const isUser = role === Role.USER
    if (isUser) {
        const {
            totalEarnings,
            materialsSold,
            pendingOrders,
            rejectedOrders
        } = await StatisticsService.getUserStatistics();

        return (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoCardHome title="Ganancias Totales" value={`$${totalEarnings}`} Icon={DollarSignIcon} />
                <InfoCardHome title="Materiales Vendidos" value={`${materialsSold}`} Icon={RecycleIcon} />
                <InfoCardHome title="Solicitudes Pendientes" value={`${pendingOrders}`} Icon={ClockIcon} />
                <InfoCardHome title="Solicitudes Rechazadas" value={`${rejectedOrders}`} Icon={XCircleIcon} />
            </div>
        )
    }
    const pickerStatistics: PickerStatistics = await StatisticsService.getPickerStatistics();
    const { totalEarnings, collectedMaterials, assignedOrders, isBusy, completedOrders } = pickerStatistics;
    let currentOrder = null;
    if (isBusy) {
        currentOrder = await OrdersService.getCurrentPickerOrder();

    }
    return (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCardHome title="Ocupado" value={isBusy ? 'Si' : 'No'} Icon={UserIcon} />
            {isBusy && currentOrder && (
                <InfoCardHome title="Solicitud Actual" value={`$${currentOrder.total}`} Icon={CarIcon} link={`/dashboard/picker/orders/${currentOrder.id}`} />
            )}
            <InfoCardHome title="Ganancias Totales" value={`$${totalEarnings}`} Icon={DollarSignIcon} />
            <InfoCardHome title="Materiales Recogidos" value={`${collectedMaterials}`} Icon={RecycleIcon} />
            <InfoCardHome title="Solicitudes Asignadas" value={`${assignedOrders}`} Icon={ClipboardListIcon} />
            <InfoCardHome title="Solicitudes Completadas" value={`${completedOrders}`} Icon={CheckCircleIcon} />
        </div>
    )
}