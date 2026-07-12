export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
    PICKER = 'PICKER',
    ORGANIZATION = 'ORGANIZATION',
    ORGANIZACION = 'ORGANIZATION',
    MODERATOR = 'MODERATOR',
    MODERADOR = 'MODERATOR',
    SUPPORT = 'SUPPORT',
    SOPORTE = 'SUPPORT'
}
export type Route = {
    path: string;
    name: string;
    role: Role[];
    icon?: string;
}

export const DASHBOARD_ROUTES: Route[] = [
    // Módulo USER web deshabilitado; flujo de usuario final se gestiona en app mobile.
    { path: '/dashboard', name: 'Home', role: [Role.USER] },
]

export const ORGANIZATION_ROUTES: Route[] = [
    { path: '/dashboard/organization', name: 'Organización', role: [Role.ORGANIZACION] },
    { path: '/dashboard/organization/coverage', name: 'Cobertura', role: [Role.ORGANIZACION] },
    { path: '/dashboard/organization/routes', name: 'Rutas', role: [Role.ORGANIZACION] },
    { path: '/dashboard/organization/orders', name: 'Solicitudes', role: [Role.ORGANIZACION] },
    { path: '/dashboard/organization/pickers', name: 'Recicladores', role: [Role.ORGANIZACION] },
    { path: '/dashboard/organization/prices', name: 'Precios', role: [Role.ORGANIZACION] },
    { path: '/dashboard/organization/statistics', name: 'Estadísticas', role: [Role.ORGANIZACION] },
]

export const ADMIN_ROUTES: Route[] = [
    { path: '/dashboard/admin/organizations', name: 'Organizaciones', role: [Role.ADMIN] },
    { path: '/dashboard/admin/organizations/[id]/orders', name: 'Solicitudes organizacion', role: [Role.ADMIN] },
    { path: '/dashboard/admin/organizations/[id]/prices', name: 'Precios organizacion', role: [Role.ADMIN] },
]


export const PUBLIC_ROUTES: Route[] = [

]
