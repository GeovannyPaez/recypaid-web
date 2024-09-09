"use client";
import { useEffect, useState, useTransition, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectMaterialsForm from "./select-materials-form";
import { Material, SelectMaterialItem } from "@/types/materilas";
import { CreateOrderDto, CreateOrderItemDto } from "@/types/orders";
import { CreateOrderAction } from "@/actions/orders-actions";
import useToastActionResponse from "@/hooks/useToastActionResponse";
import { useRouter } from "next/navigation";
import { useUserLocation } from "@/hooks/useUserLocation";
import Link from "next/link";
import LocationDialog from "@/components/shared/location-dialog";
import { Switch } from "@/components/ui/switch";

type RecyclingFormUserProps = {
  materials: Material[];
  address?: string;
  materialIdSelect?: string;
};

export default function RecyclingFormUser({ materials, address, materialIdSelect }: RecyclingFormUserProps) {
  const router = useRouter();
  const { toastActionResponse } = useToastActionResponse();
  const [isLoading, startTransition] = useTransition();
  const [selectedMaterials, setSelectedMaterials] = useState<SelectMaterialItem[]>([]);
  const { location, error, getLocation, setLocation } = useUserLocation();
  const [addressState, setAddressState] = useState<string>(address || "");
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);

  const initialSelectedMaterial = useMemo(() => {
    return materialIdSelect ? materials.find(materia => materia.id === materialIdSelect) : null;
  }, [materialIdSelect, materials]);

  useEffect(() => {
    if (initialSelectedMaterial) {
      setSelectedMaterials([initialSelectedMaterial]);
    }
  }, [initialSelectedMaterial]);

  useEffect(() => {
    const hasSeenDialogBefore = localStorage.getItem('hasSeenLocationDialog');
    if (hasSeenDialogBefore) {
      getLocation();
    } else if (!location) {
      openDialogLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectMaterial = (value: string) => {
    const selectedMaterial = materials.find(materia => materia.name === value);
    if (selectedMaterial && !selectedMaterials.some(material => material.name === value)) {
      setSelectedMaterials(prev => [...prev, selectedMaterial]);
    }
  };

  const handleDeleteMaterial = (material: Material) => {
    setSelectedMaterials(prev => prev.filter(prevMaterial => prevMaterial.name !== material.name));
  };

  const handleChangeQuantity = (value: number, materialId: string) => {
    setSelectedMaterials(prev =>
      prev.map(material =>
        material.id === materialId ? { ...material, quantity: value } : material
      )
    );
  };

  const handleGetLocation = async () => {
    await getLocation();
    if (error) {
      toastActionResponse({ error: true, message: error });
    } else if (location) {
      toastActionResponse({ error: false, message: "Ubicación obtenida correctamente" });
    }
    closeDialogLocation();
    localStorage.setItem('hasSeenLocationDialog', 'true');
  };

  const openDialogLocation = () => setIsLocationDialogOpen(true);
  const closeDialogLocation = () => setIsLocationDialogOpen(false);

  const validateForm = (): boolean => {
    if (!addressState?.trim()) {
      toastActionResponse({ error: true, message: "Por favor, ingrese la dirección de recogida" });
      return false;
    }
    if (selectedMaterials.length === 0) {
      toastActionResponse({ error: true, message: "Seleccione al menos un material" });
      return false;
    }
    if (selectedMaterials.some(material => material.quantity === undefined)) {
      toastActionResponse({ error: true, message: "Especifique la cantidad aproximada de cada material" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return;

    const materials: CreateOrderItemDto[] = selectedMaterials.map(material => ({
      materialId: material.id,
      quantity: material.quantity || 0 // solo para evitar error de tipo, igual ya se validó que no sea undefined 
    }));

    const data: CreateOrderDto = {
      materials,
      location: location || undefined,
      address: addressState,
    };

    startTransition(async () => {
      const res = await CreateOrderAction(data);
      toastActionResponse(res);
      if (!res.error) router.push("/dashboard/orders");
    });
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <h3 className="text-lg font-semibold my-1">
            Seleccione los materiales a reciclar y especifique la cantidad.
            <Link href="/dashboard/recyclable-materials">
              <p className="inline-flex mx-1 underline">Ver precios</p>
            </Link>
          </h3>
          <SelectMaterialsForm
            onChangeQuantityMaterial={handleChangeQuantity}
            onSelectMaterial={handleSelectMaterial}
            handleDeleteMaterial={handleDeleteMaterial}
            selectedMaterials={selectedMaterials}
            materials={materials}
          />
        </div>
        <div className="grid gap-2">
          <Label>Dirección de recogida</Label>
          <div className="flex gap-2">
            <Input
              defaultValue={addressState}
              onChange={e => setAddressState(e.target.value)}
              name="address"
              required
              placeholder="Dirección de recogida"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="share-location"
              onCheckedChange={(checked) => {
                if (checked) return openDialogLocation();
                setLocation(null);
              }}
              checked={location !== null}
            />
            <Label className=" text-muted-foreground" htmlFor="share-location">Compartir ubicación actual</Label>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <Button isLoading={isLoading} className="max-w-[200px]" type="submit">
            Enviar solicitud
          </Button>
        </div>
      </form>

      <LocationDialog
        isOpen={isLocationDialogOpen}
        onClose={closeDialogLocation}
        onGetLocation={handleGetLocation}
      />
    </>
  );
}
