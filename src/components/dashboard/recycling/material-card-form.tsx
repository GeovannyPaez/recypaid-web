import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Recycle, X } from "lucide-react";

import { Material } from "@/types/materilas";

const ValuesByKilo = [
  { value: "2", label: "2 kg" },
  { value: "5", label: "5 kg" },
  { value: "7", label: "7 kg" },
  { value: "10", label: "10 kg" },
  { value: "15", label: "15 kg" },
  { value: "20", label: "20 kg" },
];

const ValuesByUnit = [
  { value: "0", label: "0 unidades" },
  { value: "1", label: "1 unidad" },
  { value: "2", label: "2 unidades" },
  { value: "3", label: "3 unidades" },
  { value: "4", label: "4 unidades" },
  { value: "5", label: "5 unidades" },
  { value: "10", label: "10 unidades" },
  { value: "15", label: "15 unidades" },
  { value: "20", label: "20 unidades" },
];

type MaterialCardFormProps = {
  material: Material;
  onChangeQuantityMaterial: (value: number, materialId: string) => void;
  onRemoveMaterial: (materia: Material) => void;
};

export default function MaterialCardForm({
  material,
  onChangeQuantityMaterial,
  onRemoveMaterial
}: MaterialCardFormProps) {
  const { id, name, price, priceBy } = material;

  const handleChange = (value: string) => {
    onChangeQuantityMaterial(Number(value), id);
  };

  const handleRemove = () => {
    onRemoveMaterial(material);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full text-primary">
              <Recycle size={16} />
            </div>
            {name}
          </div>
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={handleRemove}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Select onValueChange={handleChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Cantidad Aprx" />
            </SelectTrigger>
            <SelectContent>
              {(priceBy === "KILO" ? ValuesByKilo : ValuesByUnit).map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm font-medium text-primary">
            Pago: ${price}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}