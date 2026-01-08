# Sistema de Layout Modular por Roles

Este documento describe el sistema de layout modular implementado en Ciclo, que permite gestionar múltiples roles y funcionalidades de forma dinámica.

## 📋 Características

- ✅ Soporte para múltiples roles por usuario
- ✅ Sidebar colapsable con módulos organizados
- ✅ Filtrado automático de módulos según roles del usuario
- ✅ Responsive (mobile y desktop)
- ✅ Badges y notificaciones en el menú
- ✅ Diseño modular y escalable

## 🎯 Roles Disponibles

El sistema soporta los siguientes roles:

- `ADMIN` - Administrador del sistema
- `USER` - Usuario regular
- `PICKER` - Reciclador
- `ORGANIZACION` - Organización
- `MODERADOR` - Moderador de contenido
- `SOPORTE` - Equipo de soporte

Los roles están definidos en [`src/config/routes.ts`](src/config/routes.ts).

## 🏗️ Arquitectura

### 1. Tipos y Definiciones

**Ubicación:** [`src/types/modules.d.ts`](src/types/modules.d.ts)

```typescript
interface MenuItem {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
  description?: string;
}

interface ModuleConfig {
  id: string;
  title: string;
  icon: LucideIcon;
  requiredRoles: Role[];
  items: MenuItem[];
  defaultOpen?: boolean;
  description?: string;
}
```

### 2. Configuración de Módulos

**Ubicación:** [`src/config/modules.tsx`](src/config/modules.tsx)

Aquí se definen todos los módulos y sus items de menú. Cada módulo especifica:
- `requiredRoles`: Array de roles que pueden ver este módulo
- `items`: Array de items del menú
- `defaultOpen`: Si el módulo debe estar expandido por defecto

**Ejemplo:**

```typescript
{
  id: "usuario",
  title: "Usuario",
  icon: Home,
  requiredRoles: [Role.USER],
  defaultOpen: true,
  items: [
    {
      id: "user-dashboard",
      title: "Inicio",
      href: "/dashboard",
      icon: Home,
    },
    // ... más items
  ]
}
```

### 3. Hook de Gestión de Roles

**Ubicación:** [`src/hooks/use-user-roles.ts`](src/hooks/use-user-roles.ts)

Hook personalizado para trabajar con roles del usuario:

```typescript
const {
  userRoles,        // Array de roles del usuario
  hasRole,          // Verifica si tiene un rol específico
  hasAnyRole,       // Verifica si tiene alguno de los roles
  hasAllRoles,      // Verifica si tiene todos los roles
  isAdmin,          // Boolean shortcuts
  isPicker,
  isOrganization,
  // ... otros
} = useUserRoles();
```

### 4. Componentes

#### ModularSidebar
**Ubicación:** [`src/components/dashboard/modular-sidebar.tsx`](src/components/dashboard/modular-sidebar.tsx)

Componente que renderiza el sidebar con módulos colapsables.

#### DashboardLayout
**Ubicación:** [`src/components/dashboard/dashboard-layout.tsx`](src/components/dashboard/dashboard-layout.tsx)

Layout principal que incluye:
- Sidebar desktop (sticky)
- Sidebar mobile (sheet/drawer)
- Área de contenido principal
- Header personalizable

## 🚀 Uso

### Agregar un Nuevo Módulo

1. Abre [`src/config/modules.tsx`](src/config/modules.tsx)
2. Agrega un nuevo objeto al array `MODULES_CONFIG`:

```typescript
{
  id: "nuevo-modulo",
  title: "Nuevo Módulo",
  icon: Star, // Importa el icono de lucide-react
  requiredRoles: [Role.ADMIN],
  defaultOpen: false,
  description: "Descripción del módulo",
  items: [
    {
      id: "item-1",
      title: "Item 1",
      href: "/dashboard/nuevo/item-1",
      icon: FileText,
      badge: "Nuevo", // Opcional
    },
  ]
}
```

### Agregar un Nuevo Rol

1. Abre [`src/config/routes.ts`](src/config/routes.ts)
2. Agrega el nuevo rol al enum:

```typescript
export enum Role {
  ADMIN = 'ADMIN',
  // ... otros roles
  NUEVO_ROL = 'NUEVO_ROL',
}
```

3. Actualiza el hook [`use-user-roles.ts`](src/hooks/use-user-roles.ts) si quieres agregar helpers:

```typescript
const isNuevoRol = useMemo(() => {
  return userRoles.includes(Role.NUEVO_ROL);
}, [userRoles]);
```

### Verificar Roles en Componentes

```typescript
"use client";

import { useUserRoles } from "@/hooks/use-user-roles";
import { Role } from "@/config/routes";

export function MiComponente() {
  const { hasRole, isAdmin } = useUserRoles();

  if (isAdmin) {
    return <AdminView />;
  }

  if (hasRole(Role.PICKER)) {
    return <PickerView />;
  }

  return <DefaultView />;
}
```

### Usar el Layout

El layout ya está configurado en [`src/app/dashboard/layout.tsx`](src/app/dashboard/layout.tsx):

```typescript
import { DashboardLayout as Layout } from "@/components/dashboard/dashboard-layout";

export default function DashboardLayout({ children }: Props) {
  return (
    <Layout header={<Header />}>
      {children}
    </Layout>
  );
}
```

## 📱 Responsividad

- **Desktop (>= 1024px)**: Sidebar fijo a la izquierda
- **Mobile (< 1024px)**: Sidebar en drawer/sheet con botón de menú

## 🔒 Seguridad

**IMPORTANTE:** Este sistema solo controla la UI. Debes implementar validación de roles en:

1. **Server Actions**
2. **API Routes**
3. **Middleware de Next.js**

Ejemplo de middleware:

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const session = await getSession();
  const userRoles = session?.user?.roles || [];

  // Validar acceso a rutas protegidas
  if (request.nextUrl.pathname.startsWith('/dashboard/admin')) {
    if (!userRoles.includes(Role.ADMIN)) {
      return NextResponse.redirect('/dashboard');
    }
  }

  return NextResponse.next();
}
```

## 🎨 Personalización

### Cambiar Estilos del Sidebar

Edita [`src/components/dashboard/modular-sidebar.tsx`](src/components/dashboard/modular-sidebar.tsx):

```typescript
<nav className={cn("space-y-2 p-4", className)}>
  {/* Personaliza aquí */}
</nav>
```

### Cambiar Ancho del Sidebar

Edita [`src/components/dashboard/dashboard-layout.tsx`](src/components/dashboard/dashboard-layout.tsx):

```typescript
<aside className={cn(
  "hidden border-r bg-background lg:block",
  "w-64 xl:w-72" // Cambia estos valores
)}>
```

## 🧪 Testing

Para testear con diferentes roles, modifica temporalmente la sesión del usuario:

```typescript
// Para desarrollo/testing
const mockUser = {
  id: "1",
  email: "test@example.com",
  roles: [Role.ADMIN, Role.USER], // Múltiples roles
};
```

## 📝 Compatibilidad con el Sistema Anterior

**¡NO necesitas migrar inmediatamente!** El sistema es **100% compatible** con el formato anterior.

### Cómo Funciona

El hook `useUserRoles` automáticamente detecta y convierte el formato antiguo:

```typescript
// Usuario con rol único (formato anterior) ✅
{ role: 'USER' }
// Se convierte automáticamente a:
{ roles: ['USER'] }

// Usuario con múltiples roles (formato nuevo) ✅
{ roles: ['USER', 'PICKER'] }
// Se usa directamente

// Usuario sin roles ✅
{}
// Se convierte a:
{ roles: [] }
```

### Tipos Actualizados

Los tipos soportan ambas propiedades en:
- [`src/types/user.d.ts`](src/types/user.d.ts)
- [`src/types/next-auth.d.ts`](src/types/next-auth.d.ts)

```typescript
export type User = {
  // ...
  role: Role;        // Requerido (compatibilidad)
  roles?: Role[];    // Opcional (nuevo sistema)
}
```

### Migración Gradual (Opcional)

Si quieres migrar gradualmente a múltiples roles:

1. **Fase 1 (actual):** Ambos sistemas funcionan
   - Usuarios con `role` → funciona ✅
   - Usuarios con `roles` → funciona ✅

2. **Fase 2 (futuro):** Empezar a asignar múltiples roles
   - Backend: Asignar array `roles` a usuarios nuevos
   - Usuarios antiguos siguen funcionando con `role`

3. **Fase 3 (opcional):** Migración completa
   - Backend: Migrar todos los usuarios a `roles`
   - Frontend: Hacer `roles` requerido y `role` opcional

Ver ejemplos en [`src/examples/modular-layout-example.tsx`](src/examples/modular-layout-example.tsx)

## 🐛 Problemas Comunes

### El sidebar no muestra módulos

1. Verifica que el usuario tenga roles asignados
2. Verifica que los módulos tengan `requiredRoles` correctos
3. Revisa la consola del navegador por errores

### Los módulos no se filtran correctamente

Verifica la función `getModulesForUser` en [`src/config/modules.tsx`](src/config/modules.tsx):

```typescript
export function getModulesForUser(userRoles: Role[]): ModuleConfig[] {
  return MODULES_CONFIG.filter((module) =>
    module.requiredRoles.some((role) => userRoles.includes(role))
  );
}
```

## 🔄 Futuras Mejoras

- [ ] Persistir estado de módulos abiertos/cerrados en localStorage
- [ ] Agregar animaciones de transición
- [ ] Soporte para submódulos anidados
- [ ] Tema oscuro/claro personalizado por módulo
- [ ] Búsqueda en el sidebar
- [ ] Drag & drop para reordenar módulos (preferencias de usuario)

## 📚 Referencias

- [Lucide Icons](https://lucide.dev/) - Iconos utilizados
- [Radix UI](https://www.radix-ui.com/) - Componentes base
- [Tailwind CSS](https://tailwindcss.com/) - Estilos
- [Next.js App Router](https://nextjs.org/docs/app) - Routing

---

**Mantenido por:** Equipo Ciclo
**Última actualización:** 2024
