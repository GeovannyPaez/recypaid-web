"use client";

import { useState } from "react";
import PickerManagement from "./picker-managment";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CicloPickerService } from "@/services/admin/picker/ciclo-picker.service";
import { PickerEntity } from "@/services/admin/picker/entity/list-all-picker-entity";
import { useToast } from "@/hooks/use-toast";
import { BlockPickerModel, RejectPickerModel } from "@/services/admin/picker/model/picker.model";

interface PickerManagementWrapperProps {
  picker: PickerEntity;
}

export default function PickerManagementWrapper({ picker }: PickerManagementWrapperProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { data } = useSession();
  const pickerService = new CicloPickerService(data?.user.token);

  const handleAcceptPicker = async (pickerId: string) => {
    setIsLoading(true);
    try {
      const response = await pickerService.acceptPicker(pickerId);
      
      if (response.data) {
        toast({
          title: "Éxito",
          description: "Picker aceptado exitosamente",
          variant: "default",
        });
        
        // Recargar para mostrar los cambios
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: response.error?.message || "Error al aceptar el picker",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error accepting picker:', error);
      toast({
        title: "Error",
        description: "Error inesperado al aceptar el picker",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejectPicker = async (data: RejectPickerModel) => {
    setIsLoading(true);
    try {
      const response = await pickerService.rejectPicker(data);
      
      if (response.data?.message) {
        toast({
          title: "Éxito",
          description: "Picker rechazado exitosamente",
          variant: "default",
        });
        
        // Recargar para mostrar los cambios
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: response.error?.message || "Error al rechazar el picker",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error rejecting picker:', error);
      toast({
        title: "Error",
        description: "Error inesperado al rechazar el picker",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlockPicker = async (data: BlockPickerModel) => {
    setIsLoading(true);
    try {
      const response = await pickerService.blockPicker(data);
      
      if (response.data) {
        toast({
          title: "Éxito",
          description: "Picker bloqueado exitosamente",
          variant: "default",
        });
        
        // Recargar para mostrar los cambios
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: response.error?.message || "Error al bloquear el picker",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error blocking picker:', error);
      toast({
        title: "Error",
        description: "Error inesperado al bloquear el picker",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PickerManagement
      picker={picker}
      onAccept={handleAcceptPicker}
      onReject={handleRejectPicker}
      onBlock={handleBlockPicker}
      isLoading={isLoading}
    />
  );
}