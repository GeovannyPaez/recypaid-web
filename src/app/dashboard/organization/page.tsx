import Link from "next/link";
import OrganizationService from "@/services/server/OrganizationService";

type PageProps = {
  searchParams?: {
    orgId?: string;
  };
};

export default async function OrganizationDashboardPage({ searchParams }: PageProps) {
  const organizations = await OrganizationService.getMyOrganizations();

  if (!organizations.length) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Organización</h1>
        <p className="text-sm text-muted-foreground">
          No tienes organizaciones asignadas o tu usuario no cuenta con permisos de organización.
        </p>
      </div>
    );
  }

  const selectedOrgId =
    searchParams?.orgId && organizations.some((org) => org.id === searchParams.orgId)
      ? searchParams.orgId
      : organizations[0].id;
  const selectedOrganization = organizations.find((org) => org.id === selectedOrgId) || organizations[0];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Gestión de Organización</h1>
        <p className="text-sm text-muted-foreground">
          Administra cobertura y rutas programadas desde este módulo.
        </p>
      </div>

      <div className="rounded-lg border p-4">
        <h2 className="text-lg font-semibold">{selectedOrganization.businessName}</h2>
        <p className="text-sm text-muted-foreground">
          Estado: {selectedOrganization.status} | Tipo: {selectedOrganization.organizationType}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {organizations.map((organization) => (
          <Link
            key={organization.id}
            href={`/dashboard/organization?orgId=${organization.id}`}
            className={`rounded-md border px-3 py-2 text-sm ${
              organization.id === selectedOrganization.id
                ? "border-primary bg-primary/10 font-medium"
                : "border-border"
            }`}
          >
            {organization.businessName}
          </Link>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Link
          href={`/dashboard/organization/coverage?orgId=${selectedOrganization.id}`}
          className="rounded-lg border p-4 hover:bg-accent"
        >
          <h3 className="font-semibold">Cobertura</h3>
          <p className="text-sm text-muted-foreground">
            Configura zonas y puntos de cobertura.
          </p>
        </Link>

        <Link
          href={`/dashboard/organization/routes?orgId=${selectedOrganization.id}`}
          className="rounded-lg border p-4 hover:bg-accent"
        >
          <h3 className="font-semibold">Rutas</h3>
          <p className="text-sm text-muted-foreground">
            Crea y gestiona rutas programadas.
          </p>
        </Link>

        <Link
          href={`/dashboard/organization/pickers?orgId=${selectedOrganization.id}`}
          className="rounded-lg border p-4 hover:bg-accent"
        >
          <h3 className="font-semibold">Recicladores</h3>
          <p className="text-sm text-muted-foreground">
            Vincula recicladores registrados en la app mobile.
          </p>
        </Link>

        <Link
          href={`/dashboard/organization/statistics?orgId=${selectedOrganization.id}`}
          className="rounded-lg border p-4 hover:bg-accent"
        >
          <h3 className="font-semibold">Estadísticas</h3>
          <p className="text-sm text-muted-foreground">
            Revisa indicadores operativos del piloto.
          </p>
        </Link>
      </div>
    </div>
  );
}
