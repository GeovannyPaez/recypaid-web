import OrganizationService from "@/services/server/OrganizationService";
import OrganizationCoverageManager from "@/components/dashboard/organization/coverage/organization-coverage-manager";

type CoveragePageProps = {
  searchParams?: {
    orgId?: string;
  };
};

export default async function OrganizationCoveragePage({ searchParams }: CoveragePageProps) {
  const organizations = await OrganizationService.getMyOrganizations();

  if (!organizations.length) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Cobertura</h1>
        <p className="text-sm text-muted-foreground">
          No tienes organizaciones disponibles para gestionar cobertura.
        </p>
      </div>
    );
  }

  const selectedOrgId =
    searchParams?.orgId && organizations.some((org) => org.id === searchParams.orgId)
      ? searchParams.orgId
      : organizations[0].id;
  const coveragePoints = await OrganizationService.getCoverage(selectedOrgId);
  return (
    <OrganizationCoverageManager
      organizations={organizations}
      selectedOrgId={selectedOrgId}
      coveragePoints={coveragePoints}
    />
  );
}
