import AdminOrganizationsManager from "@/components/dashboard/admin/organizations/admin-organizations-manager";
import OrganizationService from "@/services/server/OrganizationService";
import UsersService from "@/services/server/UsersService";
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
  const users = await UsersService.findAll();
  const organizations = await OrganizationService.getOrganizations(
    selectedStatus === "ALL" ? {} : { status: selectedStatus },
  );
  return (
    <AdminOrganizationsManager
      users={users}
      organizations={organizations}
      selectedStatus={selectedStatus}
    />
  );
}
