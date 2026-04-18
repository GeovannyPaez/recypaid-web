"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import {
  AssignOrganizationPickerAction,
  RemoveOrganizationPickerAction,
} from "@/actions/organization.actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Organization,
  OrganizationAvailablePicker,
  OrganizationPickerMember,
} from "@/types/organization";

type OrganizationPickersManagerProps = {
  organizations: Organization[];
  selectedOrgId: string;
  assignedPickers: OrganizationPickerMember[];
  availablePickers: OrganizationAvailablePicker[];
};

export default function OrganizationPickersManager({
  organizations,
  selectedOrgId,
  assignedPickers,
  availablePickers,
}: OrganizationPickersManagerProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [isAssigning, startAssignTransition] = useTransition();
  const [isRemoving, startRemoveTransition] = useTransition();

  const [assigningPickerId, setAssigningPickerId] = useState<string | null>(null);
  const [removingMembershipId, setRemovingMembershipId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [assignedState, setAssignedState] = useState<OrganizationPickerMember[]>(
    assignedPickers,
  );
  const [availableState, setAvailableState] = useState<OrganizationAvailablePicker[]>(
    availablePickers,
  );

  useEffect(() => {
    setAssignedState(assignedPickers);
  }, [assignedPickers]);

  useEffect(() => {
    setAvailableState(availablePickers);
  }, [availablePickers]);

  const normalizedSearch = search.trim().toLowerCase();
  const filteredAvailable = useMemo(() => {
    if (!normalizedSearch) return availableState;
    return availableState.filter((picker) => {
      const name = `${picker.profile?.name || ""} ${picker.profile?.lastname || ""}`.toLowerCase();
      const email = picker.profile?.user?.email?.toLowerCase() || "";
      const phone = picker.profile?.phone?.toLowerCase() || "";
      return (
        name.includes(normalizedSearch) ||
        email.includes(normalizedSearch) ||
        phone.includes(normalizedSearch)
      );
    });
  }, [availableState, normalizedSearch]);

  const filteredAssigned = useMemo(() => {
    if (!normalizedSearch) return assignedState;
    return assignedState.filter((membership) => {
      const name = `${membership.picker.profile?.name || ""} ${membership.picker.profile?.lastname || ""}`.toLowerCase();
      const email = membership.picker.profile?.user?.email?.toLowerCase() || "";
      const phone = membership.picker.profile?.phone?.toLowerCase() || "";
      return (
        name.includes(normalizedSearch) ||
        email.includes(normalizedSearch) ||
        phone.includes(normalizedSearch)
      );
    });
  }, [assignedState, normalizedSearch]);

  const showActionToast = (result: ActionResponse) => {
    toast({
      title: result.error ? "Error" : "Éxito",
      description: result.message,
      variant: result.error ? "destructive" : "default",
    });
  };

  const handleAssignPicker = (picker: OrganizationAvailablePicker) => {
    setAssigningPickerId(picker.userId);
    startAssignTransition(async () => {
      try {
        const result = await AssignOrganizationPickerAction(selectedOrgId, {
          pickerId: picker.userId,
        });
        showActionToast(result);

        if (!result.error && result.picker) {
          setAssignedState((prev) => [result.picker as OrganizationPickerMember, ...prev]);
          setAvailableState((prev) => prev.filter((item) => item.userId !== picker.userId));
          router.refresh();
        }
      } catch {
        toast({
          title: "Error",
          description: "No fue posible vincular el reciclador.",
          variant: "destructive",
        });
      } finally {
        setAssigningPickerId(null);
      }
    });
  };

  const handleRemovePicker = (membership: OrganizationPickerMember) => {
    setRemovingMembershipId(membership.id);
    startRemoveTransition(async () => {
      try {
        const result = await RemoveOrganizationPickerAction(selectedOrgId, membership.id);
        showActionToast(result);

        if (!result.error) {
          setAssignedState((prev) => prev.filter((item) => item.id !== membership.id));

          const recycledAvailable: OrganizationAvailablePicker = {
            userId: membership.pickerId,
            status: membership.picker.status,
            isBusy: membership.picker.isBusy,
            createdAt: membership.createdAt,
            updatedAt: membership.updatedAt,
            profile: membership.picker.profile || undefined,
          };

          setAvailableState((prev) => [
            recycledAvailable,
            ...prev.filter((item) => item.userId !== recycledAvailable.userId),
          ]);
          router.refresh();
        }
      } catch {
        toast({
          title: "Error",
          description: "No fue posible desvincular el reciclador.",
          variant: "destructive",
        });
      } finally {
        setRemovingMembershipId(null);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Recicladores</h1>
        <Link href="/dashboard/organization" className="text-sm text-primary hover:underline">
          Volver a organización
        </Link>
      </div>

      <p className="text-sm text-muted-foreground">
        Selecciona recicladores ya registrados en la app mobile para vincularlos a tu organización.
        No se crean usuarios nuevos ni se duplica el proceso de registro.
      </p>

      <div className="flex flex-wrap gap-2">
        {organizations.map((organization) => (
          <Link
            key={organization.id}
            href={`/dashboard/organization/pickers?orgId=${organization.id}`}
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

      <div className="rounded-lg border p-4">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por nombre, correo o teléfono"
          className="w-full rounded border px-3 py-2 text-sm"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border">
          <div className="border-b p-4">
            <h2 className="text-lg font-semibold">Disponibles en mobile</h2>
            <p className="text-xs text-muted-foreground">
              Solo recicladores aprobados y no vinculados actualmente.
            </p>
          </div>
          <div className="space-y-3 p-4">
            {filteredAvailable.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No hay recicladores disponibles para este filtro.
              </p>
            ) : (
              filteredAvailable.map((picker) => {
                const fullName = `${picker.profile?.name || "Sin nombre"} ${picker.profile?.lastname || ""}`.trim();
                const isAssigningCurrent = isAssigning && assigningPickerId === picker.userId;
                return (
                  <div key={picker.userId} className="rounded-md border p-3">
                    <p className="font-medium">{fullName}</p>
                    <p className="text-xs text-muted-foreground">
                      {picker.profile?.user?.email || "Sin email"} | {picker.profile?.phone || "Sin teléfono"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Estado: {picker.status} {picker.isBusy ? "(ocupado)" : "(disponible)"}
                    </p>
                    <div className="mt-2">
                      <Button
                        type="button"
                        size="sm"
                        isLoading={isAssigningCurrent}
                        disabled={isRemoving || (isAssigning && !isAssigningCurrent)}
                        onClick={() => handleAssignPicker(picker)}
                      >
                        Vincular
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="rounded-lg border">
          <div className="border-b p-4">
            <h2 className="text-lg font-semibold">Vinculados a la organización</h2>
            <p className="text-xs text-muted-foreground">
              Recicladores que podrán operar rutas privadas de la organización.
            </p>
          </div>
          <div className="space-y-3 p-4">
            {filteredAssigned.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No hay recicladores vinculados para este filtro.
              </p>
            ) : (
              filteredAssigned.map((membership) => {
                const fullName = `${membership.picker.profile?.name || "Sin nombre"} ${membership.picker.profile?.lastname || ""}`.trim();
                const isRemovingCurrent = isRemoving && removingMembershipId === membership.id;
                return (
                  <div key={membership.id} className="rounded-md border p-3">
                    <p className="font-medium">{fullName}</p>
                    <p className="text-xs text-muted-foreground">
                      {membership.picker.profile?.user?.email || "Sin email"} |{" "}
                      {membership.picker.profile?.phone || "Sin teléfono"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Vinculado: {new Date(membership.joinedAt).toLocaleDateString()}
                    </p>
                    <div className="mt-2">
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        isLoading={isRemovingCurrent}
                        disabled={isAssigning || (isRemoving && !isRemovingCurrent)}
                        onClick={() => handleRemovePicker(membership)}
                      >
                        Desvincular
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
