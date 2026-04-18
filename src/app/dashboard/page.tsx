import Link from "next/link";
import WelcomeBackUser from "@/components/shared/welcome-back-user";
import { GetServerSession } from "@/services/server/AuthService";
import { Role } from "@/core/config/routes";
import { getModulesForUser } from "@/core/config/modules";

export const dynamic = 'force-dynamic';

const normalizeRole = (rawRole?: string): Role | null => {
  if (!rawRole) return null;

  const role = rawRole.toUpperCase().trim();
  if (role === "ORGANIZATION" || role === "ORGANIZACION" || role.startsWith("ORGANIZATION_")) {
    return Role.ORGANIZACION;
  }
  if (role === "ADMIN" || role.startsWith("ADMIN_")) {
    return Role.ADMIN;
  }
  if (role === "PICKER" || role.startsWith("PICKER_")) {
    return Role.USER;
  }
  if (role === "USER" || role === "USUARIO" || role.startsWith("USER_")) {
    return Role.USER;
  }
  return null;
};

export default async function UserHomePage() {
  const session = await GetServerSession();
  const roleCandidates = [
    ...(session.roles || []),
    session.role,
  ];

  const normalizedRoles = Array.from(
    new Set(
      roleCandidates
        .map((role) => normalizeRole(role))
        .filter((role): role is Role => role !== null),
    ),
  );

  const userModules = getModulesForUser(normalizedRoles);
  const isOnlyUserRole =
    normalizedRoles.length > 0 && normalizedRoles.every((role) => role === Role.USER);

  return (
    <div className="space-y-8">
      <section className="w-full py-8">
        <div className="container px-4 md:px-6">
          <WelcomeBackUser />
          <p className="max-w-[700px] text-muted-foreground md:text-lg mt-4">
            Este es tu dashboard único. Aquí se listan solo las funcionalidades
            habilitadas por tus roles activos.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {normalizedRoles.length === 0 ? (
              <span className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
                Sin roles activos
              </span>
            ) : (
              normalizedRoles.map((role) => (
                <span
                  key={role}
                  className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                >
                  {role}
                </span>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="container px-4 md:px-6">
        {userModules.length === 0 ? (
          <div className="rounded-lg border p-4 text-sm text-muted-foreground">
            {isOnlyUserRole
              ? "El módulo de usuario web está deshabilitado. La gestión de usuario se realiza desde la aplicación mobile."
              : "No tienes módulos habilitados por ahora. Contacta al administrador para asignación de roles."}
          </div>
        ) : (
          <div className="space-y-6">
            {userModules.map((module) => (
              <div key={module.id} className="rounded-lg border p-4">
                <div className="mb-3">
                  <h2 className="text-lg font-semibold">{module.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {module.description}
                  </p>
                </div>

                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {module.items.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="rounded-md border p-3 hover:bg-accent"
                    >
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
