import AdminOrganizationFormPage from "@/components/dashboard/admin/organizations/admin-organization-form-page";
import OrganizationService from "@/services/server/OrganizationService";
import UsersService from "@/services/server/UsersService";

type Props = {
  params: {
    id: string;
  };
};

export default async function AdminOrganizationEditPage({ params }: Props) {
  const [organization, users] = await Promise.all([
    OrganizationService.getOrganizationById(params.id),
    UsersService.findAll(),
  ]);

  return (
    <AdminOrganizationFormPage
      mode="edit"
      organization={organization}
      users={users}
    />
  );
}
