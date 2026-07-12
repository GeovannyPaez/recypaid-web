import AdminOrganizationFormPage from "@/components/dashboard/admin/organizations/admin-organization-form-page";
import UsersService from "@/services/server/UsersService";

export default async function AdminOrganizationCreatePage() {
  const users = await UsersService.findAll();
  return <AdminOrganizationFormPage mode="create" users={users} />;
}
