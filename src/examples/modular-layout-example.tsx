/**
 * EJEMPLO DE USO DEL SISTEMA DE LAYOUT MODULAR
 *
 * Este archivo muestra cómo usar el nuevo sistema de layout modular
 * con soporte para múltiples roles.
 */

"use client";

import { useUserRoles } from "@/hooks/use-user-roles";
import { Role } from "@/core/config/routes";

// ============================================
// EJEMPLO 1: Verificar roles en un componente
// ============================================
export function ExampleRoleCheck() {
  const { userRoles, hasRole, isAdmin, isPicker } = useUserRoles();

  return (
    <div>
      <h2>Tus roles activos:</h2>
      <ul>
        {userRoles.map((role) => (
          <li key={role}>{role}</li>
        ))}
      </ul>

      {isAdmin && (
        <div className="admin-panel">
          <h3>Panel de Administrador</h3>
          <p>Solo visible para administradores</p>
        </div>
      )}

      {isPicker && (
        <div className="picker-panel">
          <h3>Panel de Reciclador</h3>
          <p>Solo visible para recicladores</p>
        </div>
      )}

      {hasRole(Role.ORGANIZACION) && (
        <div className="org-panel">
          <h3>Panel de Organización</h3>
          <p>Solo visible para organizaciones</p>
        </div>
      )}
    </div>
  );
}

// ============================================
// EJEMPLO 2: Verificar múltiples roles
// ============================================
export function ExampleMultiRoleCheck() {
  const { hasAnyRole, hasAllRoles } = useUserRoles();

  // Verificar si tiene AL MENOS uno de estos roles
  const canViewReports = hasAnyRole([
    Role.ADMIN,
    Role.MODERADOR,
    Role.ORGANIZACION
  ]);

  // Verificar si tiene TODOS estos roles
  const canManageSystem = hasAllRoles([Role.ADMIN, Role.MODERADOR]);

  return (
    <div>
      {canViewReports && (
        <button>Ver Reportes</button>
      )}

      {canManageSystem && (
        <button>Gestionar Sistema</button>
      )}
    </div>
  );
}

// ============================================
// EJEMPLO 3: Renderizado condicional basado en roles
// ============================================
export function ExampleConditionalRender() {
  const { userRoles, isLoading } = useUserRoles();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (userRoles.length === 0) {
    return <div>No tienes roles asignados</div>;
  }

  // Renderizar diferentes vistas según roles
  if (userRoles.includes(Role.ADMIN)) {
    return <AdminDashboard />;
  }

  if (userRoles.includes(Role.PICKER)) {
    return <PickerDashboard />;
  }

  // Vista por defecto
  return <UserDashboard />;
}

// ============================================
// EJEMPLO 4: Componentes de vista por rol
// ============================================
function AdminDashboard() {
  return (
    <div>
      <h1>Dashboard de Administrador</h1>
      {/* Contenido específico para admin */}
    </div>
  );
}

function PickerDashboard() {
  return (
    <div>
      <h1>Dashboard de Reciclador</h1>
      {/* Contenido específico para picker */}
    </div>
  );
}

function UserDashboard() {
  return (
    <div>
      <h1>Dashboard de Usuario</h1>
      {/* Contenido específico para usuario */}
    </div>
  );
}

// ============================================
// EJEMPLO 5: Proteger acciones según roles
// ============================================
export function ExampleProtectedActions() {
  const { hasRole } = useUserRoles();

  const handleDeleteUser = () => {
    if (!hasRole(Role.ADMIN)) {
      alert("No tienes permisos para esta acción");
      return;
    }

    // Ejecutar acción de eliminación
    console.log("Usuario eliminado");
  };

  const handleApproveOrder = () => {
    if (!hasRole(Role.PICKER) && !hasRole(Role.ADMIN)) {
      alert("No tienes permisos para aprobar pedidos");
      return;
    }

    // Ejecutar acción de aprobación
    console.log("Pedido aprobado");
  };

  return (
    <div>
      <button onClick={handleDeleteUser}>
        Eliminar Usuario
      </button>
      <button onClick={handleApproveOrder}>
        Aprobar Pedido
      </button>
    </div>
  );
}

// ============================================
// EJEMPLO 6: Compatibilidad con sistema anterior
// ============================================
/**
 * El sistema es compatible con usuarios que tienen un solo rol (role)
 * o múltiples roles (roles). El hook automáticamente convierte
 * el role único a un array para mantener la compatibilidad.
 *
 * Casos soportados:
 *
 * 1. Usuario con rol único (sistema anterior):
 *    { role: 'USER' } → se convierte a → { roles: ['USER'] }
 *
 * 2. Usuario con múltiples roles (sistema nuevo):
 *    { roles: ['USER', 'PICKER'] } → se usa directamente
 *
 * 3. Usuario sin roles:
 *    {} → se convierte a → { roles: [] }
 */

export function ExampleBackwardCompatibility() {
  const { userRoles } = useUserRoles();

  // Funciona tanto con usuarios antiguos (role) como nuevos (roles)
  return (
    <div>
      <p>Roles detectados: {userRoles.join(", ")}</p>
    </div>
  );
}
