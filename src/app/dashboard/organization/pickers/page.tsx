import OrganizationPickersManager from "@/components/dashboard/organization/pickers/organization-pickers-manager";
import OrganizationService from "@/services/server/OrganizationService";

type OrganizationPickersPageProps = {
  searchParams?: {
    orgId?: string;
  };
};

export default async function OrganizationPickersPage({
  searchParams,
}: OrganizationPickersPageProps) {
  const organizations = await OrganizationService.getMyOrganizations();

  if (!organizations.length) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Recicladores</h1>
        <p className="text-sm text-muted-foreground">
          No tienes organizaciones disponibles para gestionar recicladores.
        </p>
      </div>
    );
  }

  const selectedOrgId =
    searchParams?.orgId && organizations.some((org) => org.id === searchParams.orgId)
      ? searchParams.orgId
      : organizations[0].id;

  const [assignedPickers, availablePickers] = await Promise.all([
    OrganizationService.getOrganizationPickers(selectedOrgId),
    OrganizationService.getAvailablePickers(selectedOrgId),
  ]);

  return (
    <OrganizationPickersManager
      organizations={organizations}
      selectedOrgId={selectedOrgId}
      assignedPickers={assignedPickers}
      availablePickers={availablePickers}
    />
  );
}
