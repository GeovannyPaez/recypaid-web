"use client";
import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectMaterialsForm from "./select-materials-form";
import { Material, SelectMaterialItem } from "@/types/materilas";
import { CreateOrderDto, CreateOrderItemDto, LocationDto } from "@/types/orders";
import { CreateOrderAction } from "@/actions/orders-actions";
import useToastActionResponse from "@/hooks/useToastActionResponse";

type RecyclingFormUserProps = {
  materials: Material[];
  address?: string
  materialIdSelect?: string;
}

export default function RecyclingFormUser({ materials, address, materialIdSelect }: RecyclingFormUserProps) {
  const initialSelectedMaterial = React.useMemo(() => {
    if (!materialIdSelect) return null;
    return materials.find((materia) => materia.id == materialIdSelect);
  }, [materialIdSelect, materials]);

  const { toastActionResponse } = useToastActionResponse();
  const [isLoading, handleTransition] = useTransition();
  const [selectedMaterials, setSelectedMaterials] = useState<SelectMaterialItem[]>(initialSelectedMaterial ? [initialSelectedMaterial] : []);
  const [userLocation, setUserLocation] = useState<LocationDto | null>(null);

  const onSelectMaterial = (value: string) => {
    const index = materials.findIndex((materia) => materia.name == value);
    if (index === -1) return;
    if (selectedMaterials.find((material) => material.name === value)) return;
    setSelectedMaterials((prev) => [...prev, materials[index]]);
  };

  const handleDeleteMaterial = (material: Material) => {
    setSelectedMaterials((prev) =>
      prev.filter((prevMaterial) => prevMaterial.name !== material.name)
    );
  };

  const onChageQuantityMaterial = (value: number, materialId: string) => {
    const index = selectedMaterials.findIndex((materia) => materia.id == materialId);
    if (index === -1) return;
    setSelectedMaterials((prev) => {
      const newMaterials = [...prev];
      newMaterials[index].quantity = value;
      return newMaterials;
    });
  }

  const getUserLocation = (): Promise<GeolocationCoordinates> => {
    return new Promise((resolve, reject) => {
      const handleSuccess = (position: GeolocationPosition) => {
        resolve(position.coords);
      };

      const handleError = (error: GeolocationPositionError) => {
        if (error.code === error.PERMISSION_DENIED) {
          toastActionResponse({
            error: true,
            message: "Acceso a la ubicación denegado. Por favor, permite el acceso en la configuración de tu navegador y vuelve a intentarlo."
          });
        } else {
          toastActionResponse({
            error: true,
            message: "Error al obtener la ubicación. Por favor, inténtalo de nuevo."
          });
        }
        reject(error);
      };

      navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    });
  };

  const handleGetLocation = async () => {
    try {
      const coords = await getUserLocation();
      setUserLocation({ latitude: coords.latitude, longitude: coords.longitude });
      toastActionResponse({ error: false, message: "Ubicación obtenida correctamente" });
    } catch (error) {
      console.error("Error getting location:", error);
      // No establecemos userLocation a null aquí para permitir reintentos
    }
  };



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userLocation) {
      toastActionResponse({ error: true, message: "Por favor, obtén tu ubicación antes de enviar el formulario" });
      return;
    }
    if (selectedMaterials.length === 0) {
      toastActionResponse({ error: true, message: "Seleccione al menos un material" });
      return;
    }
    if (selectedMaterials.some(material => material.quantity === undefined)) {
      toastActionResponse({ error: true, message: "Especifique la cantidad aproximada de cada material" });
      return;
    }

    const materials: CreateOrderItemDto[] = selectedMaterials.map((material) => ({
      materialId: material.id,
      quantity: material.quantity,
    })) as CreateOrderItemDto[];

    const data: CreateOrderDto = {
      materials,
      location: userLocation,
      address: address
    }

    handleTransition(async () => {
      const res = await CreateOrderAction(data);
      toastActionResponse(res);
      if (!res.error) setSelectedMaterials([]);
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <h3 className="text-lg font-semibold">
          Seleccione los materiales a reciclar y especifique la cantidad.
        </h3>
        <SelectMaterialsForm
          onChageQuantityMaterial={onChageQuantityMaterial}
          onSelectMaterial={onSelectMaterial}
          handleDeleteMaterial={handleDeleteMaterial}
          selectedMaterials={selectedMaterials}
          materials={materials}
        />
      </div>
      <div className="grid gap-2">
        <Label>Dirección de recogida</Label>
        <Input defaultValue={address} name="address" placeholder="Dirección de recogida" />
      </div>
      <div className="flex justify-between items-center">
        <Button type="button" onClick={handleGetLocation} disabled={userLocation !== null}>
          {userLocation ? "Ubicación obtenida" : "Obtener ubicación"}
        </Button>
        <Button isLoading={isLoading} className="max-w-[200px]" type="submit">
          Enviar solicitud
        </Button>
      </div>
    </form>
  );
}