"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState, useTransition } from "react";
import {
  CreateOrganizationMaterialPriceAction,
  UpdateOrganizationMaterialPriceAction,
} from "@/actions/organization.actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Organization,
  OrganizationMaterialPrice,
  OrganizationMaterialPriceBy,
  OrganizationMaterialPriceMaterial,
} from "@/types/organization";

type Props = {
  organizations: Organization[];
  selectedOrgId: string;
  prices: OrganizationMaterialPrice[];
  materialsWithoutActivePrice: OrganizationMaterialPriceMaterial[];
  backHref: string;
  showOrganizationSelector?: boolean;
};

type FormState = {
  id?: string;
  materialId: string;
  priceBy: OrganizationMaterialPriceBy;
  buyPrice: string;
  isActive: boolean;
};

const EMPTY_FORM: FormState = {
  materialId: "",
  priceBy: "KILO",
  buyPrice: "",
  isActive: true,
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);

export default function OrganizationMaterialPricesManager({
  organizations,
  selectedOrgId,
  prices,
  materialsWithoutActivePrice,
  backHref,
  showOrganizationSelector = false,
}: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSaving, startSavingTransition] = useTransition();
  const [pricesState, setPricesState] = useState(prices);
  const [missingState, setMissingState] = useState(materialsWithoutActivePrice);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  useEffect(() => {
    setPricesState(prices);
  }, [prices]);

  useEffect(() => {
    setMissingState(materialsWithoutActivePrice);
  }, [materialsWithoutActivePrice]);

  const selectedOrganization = organizations.find((item) => item.id === selectedOrgId);
  const materialsById = useMemo(() => {
    const map = new Map<string, OrganizationMaterialPriceMaterial>();
    pricesState.forEach((price) => map.set(price.material.id, price.material));
    missingState.forEach((material) => map.set(material.id, material));
    return map;
  }, [missingState, pricesState]);

  const materialOptions = Array.from(materialsById.values()).sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const showActionToast = (result: ActionResponse) => {
    toast({
      title: result.error ? "Error" : "Exito",
      description: result.message,
      variant: result.error ? "destructive" : "default",
    });
  };

  const resetForm = () => setForm(EMPTY_FORM);

  const handleEdit = (price: OrganizationMaterialPrice) => {
    setForm({
      id: price.id,
      materialId: price.materialId,
      priceBy: price.priceBy,
      buyPrice: String(price.buyPrice),
      isActive: price.isActive,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const buyPrice = Number(form.buyPrice);
    if (!form.materialId || !Number.isFinite(buyPrice) || buyPrice < 0) {
      toast({
        title: "Error",
        description: "Selecciona material y un precio valido.",
        variant: "destructive",
      });
      return;
    }

    startSavingTransition(async () => {
      const payload = {
        materialId: form.materialId,
        priceBy: form.priceBy,
        buyPrice,
        isActive: form.isActive,
      };
      const result = form.id
        ? await UpdateOrganizationMaterialPriceAction(selectedOrgId, form.id, payload)
        : await CreateOrganizationMaterialPriceAction(selectedOrgId, payload);
      showActionToast(result);

      if (!result.error && result.price) {
        setPricesState((prev) => {
          const withoutCurrent = prev.filter((item) => item.id !== result.price?.id);
          return [result.price as OrganizationMaterialPrice, ...withoutCurrent];
        });
        setMissingState((prev) => {
          if (result.price?.isActive) {
            return prev.filter((material) => material.id !== result.price?.materialId);
          }
          const material = result.price?.material;
          if (!material || prev.some((item) => item.id === material.id)) return prev;
          return [material, ...prev].sort((a, b) => a.name.localeCompare(b.name));
        });
        resetForm();
        router.refresh();
      }
    });
  };

  const handleToggleActive = (price: OrganizationMaterialPrice) => {
    startSavingTransition(async () => {
      const result = await UpdateOrganizationMaterialPriceAction(
        selectedOrgId,
        price.id,
        { isActive: !price.isActive },
      );
      showActionToast(result);
      if (!result.error && result.price) {
        setPricesState((prev) =>
          prev.map((item) => (item.id === result.price?.id ? result.price : item)),
        );
        router.refresh();
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Precios por material</h1>
          <p className="text-sm text-muted-foreground">
            {selectedOrganization?.businessName || "Organizacion seleccionada"}
          </p>
        </div>
        <Link href={backHref} className="text-sm text-primary hover:underline">
          Volver
        </Link>
      </div>

      {showOrganizationSelector ? (
        <div className="flex flex-wrap gap-2">
          {organizations.map((organization) => (
            <Link
              key={organization.id}
              href={`/dashboard/organization/prices?orgId=${organization.id}`}
              className={`rounded-md border px-3 py-2 text-sm ${
                organization.id === selectedOrgId
                  ? "border-primary bg-primary/10 font-medium"
                  : "border-border"
              }`}
            >
              {organization.businessName}
            </Link>
          ))}
        </div>
      ) : null}

      <div className="rounded-lg border p-4">
        <h2 className="text-lg font-semibold">Materiales sin precio activo</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {missingState.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Todos los materiales disponibles tienen precio activo.
            </p>
          ) : (
            missingState.map((material) => (
              <button
                key={material.id}
                type="button"
                className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900"
                onClick={() =>
                  setForm({
                    ...EMPTY_FORM,
                    materialId: material.id,
                    priceBy: material.priceBy,
                  })
                }
              >
                {material.name}
              </button>
            ))
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-lg border p-4">
        <div className="grid gap-3 md:grid-cols-5">
          <label className="space-y-1 md:col-span-2">
            <span className="text-sm font-medium">Material</span>
            <select
              value={form.materialId}
              onChange={(event) => {
                const material = materialsById.get(event.target.value);
                setForm((prev) => ({
                  ...prev,
                  materialId: event.target.value,
                  priceBy: material?.priceBy || prev.priceBy,
                }));
              }}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            >
              <option value="">Seleccionar material</option>
              {materialOptions.map((material) => (
                <option key={material.id} value={material.id}>
                  {material.name}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium">Tipo</span>
            <select
              value={form.priceBy}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  priceBy: event.target.value as OrganizationMaterialPriceBy,
                }))
              }
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            >
              <option value="KILO">Kilo</option>
              <option value="UNIT">Unidad</option>
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium">Precio compra</span>
            <input
              type="number"
              min="0"
              step="1"
              value={form.buyPrice}
              onChange={(event) => setForm((prev) => ({ ...prev, buyPrice: event.target.value }))}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            />
          </label>

          <div className="flex items-end gap-2">
            <label className="flex h-10 items-center gap-2 rounded-md border px-3 text-sm">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, isActive: event.target.checked }))
                }
              />
              Activo
            </label>
            <Button type="submit" isLoading={isSaving}>
              {form.id ? "Guardar" : "Crear"}
            </Button>
            {form.id ? (
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancelar
              </Button>
            ) : null}
          </div>
        </div>
      </form>

      <div className="rounded-lg border">
        <div className="grid grid-cols-12 border-b bg-muted/30 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <div className="col-span-4">Material</div>
          <div className="col-span-2">Tipo</div>
          <div className="col-span-2">Precio</div>
          <div className="col-span-2">Estado</div>
          <div className="col-span-2 text-right">Acciones</div>
        </div>
        <div className="divide-y">
          {pricesState.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground">
              No hay precios configurados para esta organizacion.
            </p>
          ) : (
            pricesState.map((price) => (
              <div key={price.id} className="grid grid-cols-12 items-center gap-2 px-4 py-3 text-sm">
                <div className="col-span-4">
                  <p className="font-medium">{price.material.name}</p>
                  <p className="text-xs text-muted-foreground">{price.materialId}</p>
                </div>
                <div className="col-span-2">{price.priceBy === "KILO" ? "Kilo" : "Unidad"}</div>
                <div className="col-span-2 font-medium">{formatCurrency(price.buyPrice)}</div>
                <div className="col-span-2">
                  <span className={`rounded px-2 py-1 text-xs ${
                    price.isActive ? "bg-green-100 text-green-800" : "bg-muted text-muted-foreground"
                  }`}>
                    {price.isActive ? "Activo" : "Inactivo"}
                  </span>
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => handleEdit(price)}>
                    Editar
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={isSaving}
                    onClick={() => handleToggleActive(price)}
                  >
                    {price.isActive ? "Desactivar" : "Activar"}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
