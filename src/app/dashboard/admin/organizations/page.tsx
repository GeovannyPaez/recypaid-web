import AdminOrganizationsManager from "@/components/dashboard/admin/organizations/admin-organizations-manager";
import OrganizationService from "@/services/server/OrganizationService";
import { OrganizationStatus } from "@/types/organization";

type OrganizationsPageProps = {
  searchParams?: {
    status?: OrganizationStatus | "ALL";
  };
};

export default async function AdminOrganizationsPage({
  searchParams,
}: OrganizationsPageProps) {
  const selectedStatus = searchParams?.status ?? "ALL";
  const organizations = await OrganizationService.getOrganizations(
    selectedStatus === "ALL" ? {} : { status: selectedStatus },
  );
  return (
    <AdminOrganizationsManager
      organizations={organizations}
      selectedStatus={selectedStatus}
    />
  );
}
