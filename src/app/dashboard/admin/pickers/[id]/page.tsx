import PickerManagementWrapper from "@/components/admin/picker/picker-management-wrapper";
import BackButtonLayout from "@/components/shared/back-button-layout";
import DataLoader from "@/components/shared/data-loader";
import { CicloPickerService } from "@/services/admin/picker/ciclo-picker.service";
import { PageProps, PaginationSearchParamsPage } from "@/types/pagination";

export default async function Page(props: PageProps<PaginationSearchParamsPage>) {
  const params = await props.params;

  return (
    <BackButtonLayout title="Gestionar Reciclador de Oficio">
      <DataLoader 
        service={new CicloPickerService().getPickerInfo}
        params={params?.id || ''}
      >
        {(data) => (
          <PickerManagementWrapper 
            picker={data}
          />
        )}
      </DataLoader>
    </BackButtonLayout>
  )
}