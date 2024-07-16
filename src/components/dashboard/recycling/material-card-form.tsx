import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";

import { Material } from "@/types/materilas";
import { Paperclip } from "lucide-react";
const ValuesByKilo = [
  {
    value: "0",
    label: "0 kg",
  },
  {
    value: "5",
    label: "5 kg",
  },
  {
    value: "10",
    label: "10 kg",
  },
  {
    value: "15",
    label: "15 kg",
  },
  {
    value: "20",
    label: "20 kg",
  },
];

const ValuesByUnit = [
  {
    value: "0",
    label: "0 unidades",
  },
  {
    value: "1",
    label: "1 unidad",
  },
  {
    value: "2",
    label: "2 unidades",
  },
  {
    value: "3",
    label: "3 unidades",
  },
  {
    value: "4",
    label: "4 unidades",
  },
  {
    value: "5",
    label: "5 unidades",
  },
];
type MaterialCardFormProps = {
  material: Material;
  onChageQuantityMaterial: (value: number, materialId: string) => void;
};

export default function MaterialCardForm({material, onChageQuantityMaterial}: MaterialCardFormProps) {
  const { name, price, priceBy } = material;
  return (
    <div className="rounded-lg border border-gray-200 p-6 shadow-sm dark:border-gray-800">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
            <Paperclip />
          </div>
          <h3 className="text-lg font-semibold">{name}</h3>
        </div>
        <Select
          onValueChange={(value) => onChageQuantityMaterial(Number(value), material.id)}
        >
          <SelectTrigger className="w-27">
            <SelectValue placeholder="Cantidad Aprx" />
          </SelectTrigger>
          <SelectContent>
            {priceBy == "KILO"
              ? ValuesByKilo.map((value) => (
                  <SelectItem key={value.value} value={value.value}>
                    {value.label}
                  </SelectItem>
                ))
              : ValuesByUnit.map((value) => (
                  <SelectItem key={value.value} value={value.value}>
                    {value.label}
                  </SelectItem>
                ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className="text-sm font-medium text-blue-500">
          Pago: ${price}
        </span>
      </div>
    </div>
  );
}
