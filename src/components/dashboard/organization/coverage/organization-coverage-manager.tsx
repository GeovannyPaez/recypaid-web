"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  CreateCoverageAction,
  DeleteCoverageAction,
  UpdateCoverageAction,
} from "@/actions/organization.actions";
import {
  Organization,
  OrganizationCoverage,
} from "@/types/organization";

type OrganizationCoverageManagerProps = {
  organizations: Organization[];
  selectedOrgId: string;
  coveragePoints: OrganizationCoverage[];
};

export default function OrganizationCoverageManager({
  organizations,
  selectedOrgId,
  coveragePoints,
}: OrganizationCoverageManagerProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [isCreating, startCreateTransition] = useTransition();
  const [isUpdating, startUpdateTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();

  const [updatingCoverageId, setUpdatingCoverageId] = useState<string | null>(null);
  const [deletingCoverageId, setDeletingCoverageId] = useState<string | null>(null);
  const [coverageState, setCoverageState] = useState<OrganizationCoverage[]>(coveragePoints);

  useEffect(() => {
    setCoverageState(coveragePoints);
  }, [coveragePoints]);

  const showActionToast = (result: ActionResponse) => {
    toast({
      title: result.error ? "Error" : "Éxito",
      description: result.message,
      variant: result.error ? "destructive" : "default",
    });
  };

  const handleCreateCoverage = (formData: FormData) => {
    startCreateTransition(async () => {
      try {
        const result = await CreateCoverageAction(selectedOrgId, {
          name: String(formData.get("name") || "").trim(),
          contactEmail: String(formData.get("contactEmail") || "").trim(),
          address: String(formData.get("address") || "").trim(),
          city: String(formData.get("city") || "").trim() || undefined,
          latitude: Number(formData.get("latitude") || 0),
          longitude: Number(formData.get("longitude") || 0),
          preferredTimeSlot:
            String(formData.get("preferredTimeSlot") || "").trim() || undefined,
        });

        showActionToast(result);
        if (!result.error) {
          if (result.coverage) {
            setCoverageState((prev) => [result.coverage as OrganizationCoverage, ...prev]);
          }
          router.refresh();
        }
      } catch {
        toast({
          title: "Error",
          description: "No fue posible crear el punto de cobertura.",
          variant: "destructive",
        });
      }
    });
  };

  const handleUpdateCoverage = (coverageId: string, formData: FormData) => {
    setUpdatingCoverageId(coverageId);
    startUpdateTransition(async () => {
      try {
        const payload = {
          name: String(formData.get("name") || "").trim() || undefined,
          contactEmail:
            String(formData.get("contactEmail") || "").trim() || undefined,
          address: String(formData.get("address") || "").trim() || undefined,
          city: String(formData.get("city") || "").trim() || undefined,
          latitude: Number(formData.get("latitude") || 0),
          longitude: Number(formData.get("longitude") || 0),
          preferredTimeSlot:
            String(formData.get("preferredTimeSlot") || "").trim() || undefined,
        };

        const result = await UpdateCoverageAction(selectedOrgId, coverageId, payload);
        showActionToast(result);

        if (!result.error) {
          const updatedCoverage = result.coverage as OrganizationCoverage | undefined;
          setCoverageState((prev) =>
            prev.map((coverage) =>
              coverage.id === coverageId
                ? updatedCoverage
                  ? { ...coverage, ...updatedCoverage }
                  : coverage
                : coverage,
            ),
          );
          router.refresh();
        }
      } catch {
        toast({
          title: "Error",
          description: "No fue posible actualizar el punto de cobertura.",
          variant: "destructive",
        });
      } finally {
        setUpdatingCoverageId(null);
      }
    });
  };

  const handleDeleteCoverage = (coverageId: string) => {
    setDeletingCoverageId(coverageId);
    startDeleteTransition(async () => {
      try {
        const result = await DeleteCoverageAction(selectedOrgId, coverageId);
        showActionToast(result);

        if (!result.error) {
          setCoverageState((prev) => prev.filter((coverage) => coverage.id !== coverageId));
          router.refresh();
        }
      } catch {
        toast({
          title: "Error",
          description: "No fue posible eliminar el punto de cobertura.",
          variant: "destructive",
        });
      } finally {
        setDeletingCoverageId(null);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Cobertura</h1>
        <Link href="/dashboard/organization" className="text-sm text-primary hover:underline">
          Volver a organización
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {organizations.map((organization) => (
          <Link
            key={organization.id}
            href={`/dashboard/organization/coverage?orgId=${organization.id}`}
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

      <form
        action={handleCreateCoverage}
        className="grid gap-3 rounded-lg border p-4 md:grid-cols-2"
      >
        <h2 className="md:col-span-2 text-lg font-semibold">Nuevo punto de cobertura</h2>
        <input
          name="name"
          placeholder="Nombre del punto"
          className="rounded border px-3 py-2 text-sm"
          required
        />
        <input
          name="contactEmail"
          type="email"
          placeholder="Email de contacto"
          className="rounded border px-3 py-2 text-sm"
          required
        />
        <input
          name="address"
          placeholder="Dirección"
          className="rounded border px-3 py-2 text-sm md:col-span-2"
          required
        />
        <input name="city" placeholder="Ciudad" className="rounded border px-3 py-2 text-sm" />
        <input
          name="preferredTimeSlot"
          placeholder="Franja (ej: 09:00-11:00)"
          className="rounded border px-3 py-2 text-sm"
        />
        <input
          name="latitude"
          type="number"
          step="any"
          placeholder="Latitud"
          className="rounded border px-3 py-2 text-sm"
          required
        />
        <input
          name="longitude"
          type="number"
          step="any"
          placeholder="Longitud"
          className="rounded border px-3 py-2 text-sm"
          required
        />
        <Button
          type="submit"
          isLoading={isCreating}
          disabled={isUpdating || isDeleting}
          className="md:col-span-2"
        >
          Guardar cobertura
        </Button>
      </form>

      <div className="rounded-lg border">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">Puntos de cobertura registrados</h2>
        </div>
        <div className="space-y-4 p-4">
          {coverageState.length === 0 ? (
            <p className="text-sm text-muted-foreground">No hay coberturas registradas.</p>
          ) : (
            coverageState.map((coverage) => {
              const isUpdatingCurrent = isUpdating && updatingCoverageId === coverage.id;
              const isDeletingCurrent = isDeleting && deletingCoverageId === coverage.id;

              return (
                <div key={coverage.id} className="rounded-md border p-4 space-y-3">
                  <form
                    action={(formData) => handleUpdateCoverage(coverage.id, formData)}
                    className="grid gap-3 md:grid-cols-2"
                  >
                    <input
                      name="name"
                      defaultValue={coverage.name}
                      placeholder="Nombre del punto"
                      className="rounded border px-3 py-2 text-sm"
                      required
                    />
                    <input
                      name="contactEmail"
                      type="email"
                      defaultValue={coverage.contactEmail}
                      placeholder="Email de contacto"
                      className="rounded border px-3 py-2 text-sm"
                      required
                    />
                    <input
                      name="address"
                      defaultValue={coverage.address}
                      placeholder="Dirección"
                      className="rounded border px-3 py-2 text-sm md:col-span-2"
                      required
                    />
                    <input
                      name="city"
                      defaultValue={coverage.city || ""}
                      placeholder="Ciudad"
                      className="rounded border px-3 py-2 text-sm"
                    />
                    <input
                      name="preferredTimeSlot"
                      defaultValue={coverage.preferredTimeSlot || ""}
                      placeholder="Franja (ej: 09:00-11:00)"
                      className="rounded border px-3 py-2 text-sm"
                    />
                    <input
                      name="latitude"
                      type="number"
                      step="any"
                      defaultValue={coverage.latitude}
                      placeholder="Latitud"
                      className="rounded border px-3 py-2 text-sm"
                      required
                    />
                    <input
                      name="longitude"
                      type="number"
                      step="any"
                      defaultValue={coverage.longitude}
                      placeholder="Longitud"
                      className="rounded border px-3 py-2 text-sm"
                      required
                    />

                    <div className="md:col-span-2 flex flex-wrap gap-2">
                      <Button type="submit" isLoading={isUpdatingCurrent}>
                        Guardar cambios
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        isLoading={isDeletingCurrent}
                        disabled={isCreating || isUpdating}
                        onClick={() => {
                          const confirmed = window.confirm(
                            "¿Seguro que deseas eliminar este punto de cobertura?",
                          );
                          if (!confirmed) return;
                          handleDeleteCoverage(coverage.id);
                        }}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </form>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
