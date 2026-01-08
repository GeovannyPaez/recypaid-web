export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
    PICKER = 'PICKER',
    ORGANIZACION = 'ORGANIZACION',
    MODERADOR = 'MODERADOR',
    SOPORTE = 'SOPORTE'
}
export type Route = {
    path: string;
    name: string;
    role: Role[];
    icon?: string;
}

export const DASHBOARD_ROUTES: Route[] = [
    { path: '/dashboard', name: 'Home', role: [Role.USER] },
    { path: '/dashboard/orders', name: 'Pedidos', role: [Role.USER] },
    { path: '/dashboard/recycling', name: 'Reciclar', role: [Role.USER] },
    { path: '/dashboard/recyclable-materials', name: 'Materiales Reciclables', role: [Role.USER] },
]
export const PICKER_ROUTES: Route[] = [
    { path: '/dashboard/picker', name: 'Home', role: [Role.PICKER] },
    { path: '/dashboard/picker/orders', name: 'Pedidos', role: [Role.PICKER] },
    { path: '/dashboard/picker/vehicle-trips', name: 'Viajes', role: [Role.PICKER] }
]


export const PUBLIC_ROUTES: Route[] = [

]