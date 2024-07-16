"use client";
import React, { useOptimistic, useState, useTransition } from "react";
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
  address?:string
  materialIdSelect?: string; // Material seleccionado por defecto en materiales reciclables page
}


export default function RecyclingFormUser( { materials,address, materialIdSelect}: RecyclingFormUserProps) {
  const initialSelectedMaterial = React.useMemo(() => {
      if (!materialIdSelect) return null;
    return materials.find((materia) => materia.id == materialIdSelect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialIdSelect]);
  const {toastActionResponse} = useToastActionResponse();
  const [isLoading,handleTransition] = useTransition();

  const [selectedMaterials, setSelectedMaterials] = useState<SelectMaterialItem[]>(initialSelectedMaterial ? [initialSelectedMaterial] : []);

  

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

  const onChageQuantityMaterial = (value:number, materialId:string) => {
    const index = selectedMaterials.findIndex((materia) => materia.id == materialId);
    if (index === -1) return;
    setSelectedMaterials((prev) => {
      const newMaterials = [...prev];
      newMaterials[index].quantity = value;
      return newMaterials;
    });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userPosition = await getUserLocation();
      const location: LocationDto = {
        latitude: userPosition.latitude,
        longitude: userPosition.longitude,
      };
      if(selectedMaterials.length === 0) {
        toastActionResponse({error:true,message:"Seleccione al menos un material"});
        return;
      }; 
      if(selectedMaterials.some(material => material.quantity === undefined)) {
        toastActionResponse({error:true,message:"Especifique la cantidad aproximada de cada material"});
        return;
      };
      const materials: CreateOrderItemDto[] = selectedMaterials.map((material) => ({
        materialId: material.id,
        quantity: material.quantity,
      })) as CreateOrderItemDto[];
      const data:CreateOrderDto ={
        materials,
        location,
        address: address
      }
      handleTransition(async()=>{
        const res = await CreateOrderAction(data);
        toastActionResponse(res);
        if(!res.error) setSelectedMaterials([]);
      })
      
    } catch (error) {
      console.error(error);
    }
  };

  const getUserLocation = (): Promise<GeolocationCoordinates> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position.coords),
        (error) => reject(error)
      );
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <h3 className="text-lg font-semibold">
          Seleccione los materiales a reciclar y especifique la cantidad.
        </h3>
        <SelectMaterialsForm onChageQuantityMaterial={onChageQuantityMaterial}  onSelectMaterial={onSelectMaterial} handleDeleteMaterial={handleDeleteMaterial} selectedMaterials={selectedMaterials}materials={materials}/>
      </div>
      <div className="grid gap-2">
        <Label>Dirección de recogida</Label>
        <Input defaultValue={address} name="address" placeholder="Dirección de recogida" />
      </div>
      <div className="flex justify-end">
        <Button isLoading={isLoading}  className="w-full max-w-[200px]" type="submit">
          Enviar solicitud
        </Button>
      </div>
    </form>
  );
}
