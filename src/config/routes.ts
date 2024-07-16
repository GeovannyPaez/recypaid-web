enum Role {
    ADMIM,
    USER,
    PICKER
}
export type Route = {
    path: string;
    name: string;
    role: Role[];
    icon?: string;
}

export const DASHBOARD_ROUTES: Route[] = [
    { path: '/dashboard', name: 'Home', role: [Role.ADMIM, Role.USER, Role.PICKER] },
    { path: '/dashboard/orders', name: 'Pedidos', role: [Role.ADMIM, Role.PICKER, Role.USER] },
    { path: '/dashboard/recycling', name: 'Reciclar', role: [Role.USER] },
    { path: '/dashboard/recyclable-materials', name: 'Materiales Reciclables', role: [Role.ADMIM, Role.PICKER, Role.USER] },
]


export const PUBLIC_ROUTES: Route[] = [

]