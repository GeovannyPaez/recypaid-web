import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import MaterialCardForm from "./material-card-form";
import { MoreVerticalIcon, PlusCircle, X } from "lucide-react";

import { Material } from "@/types/materilas";
type SelectMaterialFormProps = {
  materials: Material[];
  handleDeleteMaterial: (material: Material) => void;
  onSelectMaterial: (id: string) => void;
  onChageQuantityMaterial: (value: number, materialId: string) => void;
  selectedMaterials: Material[];
}

export default function SelectMaterialForm({ materials, selectedMaterials, onSelectMaterial, handleDeleteMaterial, onChageQuantityMaterial }: SelectMaterialFormProps) {

  const ValuesMaterials = materials.map((material) => ({
    value: material.name,
    label: material.name,
  }));

  return (
    <>
      <div className="flex gap-2 flex-wrap my-2">
        {selectedMaterials.map((material) => (
          <Badge
            key={material.id}
            className="relative rounded-full bg-gray-900 px-3 py-1 text-sm font-medium text-gray-50 dark:bg-gray-50 dark:text-gray-900"
          >
            <span>{material.name}</span>
            <button
              type="button"
              onClick={() => handleDeleteMaterial(material)}
              className="absolute top-1 right-1 rounded-full bg-gray-900 p-1 text-gray-50 hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <Select onValueChange={onSelectMaterial} >
        <SelectTrigger className="w-full" icon={<PlusCircle className="w-5 h-5" />}>
          <p>
            Click Para Añadir Más Materiales
          </p>

        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {ValuesMaterials.map((material) => (
              <SelectItem key={material.value} value={material.value}>
                {material.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {selectedMaterials.map((material) => (
          <MaterialCardForm onChageQuantityMaterial={onChageQuantityMaterial} key={material.description} material={material} />
        ))}
      </div>
    </>
  );
}
