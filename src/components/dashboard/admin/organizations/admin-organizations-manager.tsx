"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import {
  CreateOrganizationAsAdminAction,
  UpdateOrganizationStatusAction,
} from "@/actions/organization.actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Organization, OrganizationStatus, OrganizationType } from "@/types/organization";
import { UserPublic } from "@/types/user";

type StatusFilter = OrganizationStatus | "ALL";
type StatusAction = "activate" | "suspend" | "deactivate";

type AdminOrganizationsManagerProps = {
  users: UserPublic[];
  organizations: Organization[];
  selectedStatus: StatusFilter;
};

const STATUS_FILTERS: StatusFilter[] = ["ALL", "PENDING", "ACTIVE", "SUSPENDED", "INACTIVE"];

const NEXT_STATUS_BY_ACTION: Record<StatusAction, OrganizationStatus> = {
  activate: "ACTIVE",
  suspend: "SUSPENDED",
  deactivate: "INACTIVE",
};

const ORGANIZATION_TYPES: OrganizationType[] = ["ECA", "COOPERATIVE", "ENTERPRISE", "NGO"];

export default function AdminOrganizationsManager({
  users,
  organizations,
  selectedStatus,
}: AdminOrganizationsManagerProps) {
  const router = useRouter();
  const { toast } = useToast();
  const createFormRef = useRef<HTMLFormElement>(null);

  const [isCreating, startCreateTransition] = useTransition();
  const [isUpdatingStatus, startStatusTransition] = useTransition();
  const [updatingStatusContext, setUpdatingStatusContext] = useState<{
    organizationId: string;
    action: StatusAction;
  } | null>(null);
  const [organizationsState, setOrganizationsState] = useState<Organization[]>(organizations);

  useEffect(() => {
    setOrganizationsState(organizations);
  }, [organizations]);

  const showActionToast = (result: ActionResponse) => {
    toast({
      title: result.error ? "Error" : "Éxito",
      description: result.message,
      variant: result.error ? "destructive" : "default",
    });
  };

  const handleCreateOrganization = (formData: FormData) => {
    startCreateTransition(async () => {
      try {
        const ownerUserId = String(formData.get("ownerUserId") || "").trim();
        const businessName = String(formData.get("businessName") || "").trim();
        const taxId = String(formData.get("taxId") || "").trim();
        const status = String(formData.get("status") || "PENDING") as OrganizationStatus;
        const organizationType = String(formData.get("organizationType") || "ECA") as OrganizationType;
        const latitude = Number(formData.get("latitude") || 0);
        const longitude = Number(formData.get("longitude") || 0);
        const canBuyMaterials = String(formData.get("canBuyMaterials") || "") === "on";
        const canManageRoutes = String(formData.get("canManageRoutes") || "") === "on";

        if (!ownerUserId || !businessName) {
          toast({
            title: "Error",
            description: "Debes seleccionar usuario dueño y razón social.",
            variant: "destructive",
          });
          return;
        }

        if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
          toast({
            title: "Error",
            description: "Latitud y longitud deben ser numéricas.",
            variant: "destructive",
          });
          return;
        }

        const result = await CreateOrganizationAsAdminAction({
          profileId: ownerUserId,
          businessName,
          taxId: taxId || undefined,
          status,
          organizationType,
          latitude,
          longitude,
          canBuyMaterials,
          canManageRoutes,
        });

        showActionToast(result);
        if (!result.error) {
          const createdOrganization = result.organization;
          if (
            createdOrganization &&
            (selectedStatus === "ALL" || selectedStatus === createdOrganization.status)
          ) {
            setOrganizationsState((prev) => [createdOrganization, ...prev]);
          }
          createFormRef.current?.reset();
          router.refresh();
        }
      } catch {
        toast({
          title: "Error",
          description: "No fue posible crear la organización.",
          variant: "destructive",
        });
      }
    });
  };

  const handleUpdateOrganizationStatus = (organizationId: string, action: StatusAction) => {
    const nextStatus = NEXT_STATUS_BY_ACTION[action];

    setUpdatingStatusContext({ organizationId, action });
    startStatusTransition(async () => {
      try {
        const result = await UpdateOrganizationStatusAction(organizationId, nextStatus);
        showActionToast(result);

        if (!result.error) {
          setOrganizationsState((prev) => {
            const updated = prev.map((organization) =>
              organization.id === organizationId
                ? { ...organization, status: nextStatus }
                : organization,
            );

            if (selectedStatus !== "ALL") {
              return updated.filter((organization) => organization.status === selectedStatus);
            }

            return updated;
          });
          router.refresh();
        }
      } catch {
        toast({
          title: "Error",
          description: "No fue posible actualizar el estado de la organización.",
          variant: "destructive",
        });
      } finally {
        setUpdatingStatusContext(null);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Organizaciones</h1>
          <p className="text-sm text-muted-foreground">
            Crea organizaciones y controla su estado operativo. Solo las organizaciones creadas
            desde este panel tendrán acceso al módulo de gestión.
          </p>
        </div>
      </div>

      <form
        ref={createFormRef}
        action={handleCreateOrganization}
        className="grid gap-3 rounded-lg border p-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <h2 className="text-lg font-semibold md:col-span-2 lg:col-span-3">
          Crear organización (admin)
        </h2>

        <label className="space-y-1 text-sm md:col-span-2 lg:col-span-3">
          <span className="text-muted-foreground">Usuario dueño</span>
          <select
            name="ownerUserId"
            className="w-full rounded border px-3 py-2 text-sm"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Selecciona un usuario
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.email} ({user.id})
              </option>
            ))}
          </select>
        </label>

        <input
          name="businessName"
          placeholder="Razón social"
          className="rounded border px-3 py-2 text-sm"
          required
        />
        <input
          name="taxId"
          placeholder="NIT (opcional)"
          className="rounded border px-3 py-2 text-sm"
        />
        <select name="organizationType" className="rounded border px-3 py-2 text-sm" defaultValue="ECA">
          {ORGANIZATION_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select name="status" className="rounded border px-3 py-2 text-sm" defaultValue="PENDING">
          <option value="PENDING">PENDING</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="SUSPENDED">SUSPENDED</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>

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

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="canBuyMaterials" defaultChecked />
          <span>Puede comprar materiales</span>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="canManageRoutes" defaultChecked />
          <span>Puede gestionar rutas</span>
        </label>

        <Button
          type="submit"
          isLoading={isCreating}
          disabled={users.length === 0 || isUpdatingStatus || isCreating}
          className="md:col-span-2 lg:col-span-3"
        >
          Crear organización y asignar rol ORGANIZATION
        </Button>
        {users.length === 0 ? (
          <p className="text-sm text-muted-foreground md:col-span-2 lg:col-span-3">
            No hay usuarios disponibles para asignar como dueños.
          </p>
        ) : null}
      </form>

      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((status) => (
          <Link
            key={status}
            href={
              status === "ALL"
                ? "/dashboard/admin/organizations"
                : `/dashboard/admin/organizations?status=${status}`
            }
            className={`rounded-md border px-3 py-2 text-sm ${
              status === selectedStatus
                ? "border-primary bg-primary/10 font-medium"
                : "border-border"
            }`}
          >
            {status === "ALL" ? "Todos" : status}
          </Link>
        ))}
      </div>

      <div className="rounded-lg border">
        <div className="grid grid-cols-12 border-b bg-muted/30 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <div className="col-span-3">Organización</div>
          <div className="col-span-3">Estado</div>
          <div className="col-span-2">Tipo</div>
          <div className="col-span-2">Capacidad rutas</div>
          <div className="col-span-2 text-right">Acciones</div>
        </div>

        <div className="divide-y">
          {organizationsState.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground">
              No hay organizaciones para el filtro seleccionado.
            </p>
          ) : (
            organizationsState.map((organization) => {
              const isUpdatingCurrentOrg =
                isUpdatingStatus && updatingStatusContext?.organizationId === organization.id;

              return (
                <div
                  key={organization.id}
                  className="grid grid-cols-12 items-center gap-2 px-4 py-3 text-sm"
                >
                  <div className="col-span-3">
                    <p className="font-medium">{organization.businessName}</p>
                    <p className="text-xs text-muted-foreground">{organization.id}</p>
                  </div>

                  <div className="col-span-3">
                    <span className="rounded bg-muted px-2 py-1 text-xs">{organization.status}</span>
                  </div>

                  <div className="col-span-2">{organization.organizationType}</div>
                  <div className="col-span-2">
                    {organization.canManageRoutes ? "Sí" : "No"}
                  </div>

                  <div className="col-span-2 flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      isLoading={isUpdatingCurrentOrg && updatingStatusContext?.action === "activate"}
                      disabled={
                        isCreating ||
                        (isUpdatingCurrentOrg && updatingStatusContext?.action === "activate") ||
                        organization.status === "ACTIVE" ||
                        (isUpdatingStatus && !isUpdatingCurrentOrg)
                      }
                      onClick={() => handleUpdateOrganizationStatus(organization.id, "activate")}
                      className="border-green-600 text-green-700"
                    >
                      Activar
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      isLoading={isUpdatingCurrentOrg && updatingStatusContext?.action === "suspend"}
                      disabled={
                        isCreating ||
                        (isUpdatingCurrentOrg && updatingStatusContext?.action === "suspend") ||
                        organization.status === "SUSPENDED" ||
                        (isUpdatingStatus && !isUpdatingCurrentOrg)
                      }
                      onClick={() => handleUpdateOrganizationStatus(organization.id, "suspend")}
                      className="border-amber-600 text-amber-700"
                    >
                      Suspender
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      isLoading={isUpdatingCurrentOrg && updatingStatusContext?.action === "deactivate"}
                      disabled={
                        isCreating ||
                        (isUpdatingCurrentOrg && updatingStatusContext?.action === "deactivate") ||
                        organization.status === "INACTIVE" ||
                        (isUpdatingStatus && !isUpdatingCurrentOrg)
                      }
                      onClick={() => handleUpdateOrganizationStatus(organization.id, "deactivate")}
                    >
                      Inactivar
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
