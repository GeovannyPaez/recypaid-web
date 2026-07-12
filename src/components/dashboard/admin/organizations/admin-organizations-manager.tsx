"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { UpdateOrganizationStatusAction } from "@/actions/organization.actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Organization, OrganizationStatus } from "@/types/organization";

type StatusFilter = OrganizationStatus | "ALL";
type StatusAction = "activate" | "suspend" | "deactivate";

type AdminOrganizationsManagerProps = {
  organizations: Organization[];
  selectedStatus: StatusFilter;
};

const STATUS_FILTERS: StatusFilter[] = ["ALL", "PENDING", "ACTIVE", "SUSPENDED", "INACTIVE"];

const NEXT_STATUS_BY_ACTION: Record<StatusAction, OrganizationStatus> = {
  activate: "ACTIVE",
  suspend: "SUSPENDED",
  deactivate: "INACTIVE",
};

export default function AdminOrganizationsManager({
  organizations,
  selectedStatus,
}: AdminOrganizationsManagerProps) {
  const router = useRouter();
  const { toast } = useToast();

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
      title: result.error ? "Error" : "Exito",
      description: result.message,
      variant: result.error ? "destructive" : "default",
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
          description: "No fue posible actualizar el estado de la organizacion.",
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
            Lista de organizaciones. Crea y edita en paginas separadas para un flujo mas simple.
          </p>
        </div>
        <Link href="/dashboard/admin/organizations/new">
          <Button>Crear organizacion</Button>
        </Link>
      </div>

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
          <div className="col-span-3">Organizacion</div>
          <div className="col-span-2">Estado</div>
          <div className="col-span-2">Tipo</div>
          <div className="col-span-2">Coordenadas</div>
          <div className="col-span-3 text-right">Acciones</div>
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

                  <div className="col-span-2">
                    <span className="rounded bg-muted px-2 py-1 text-xs">{organization.status}</span>
                  </div>

                  <div className="col-span-2">{organization.organizationType}</div>

                  <div className="col-span-2 text-xs text-muted-foreground">
                    {organization.location?.latitude?.toFixed(6)}, {organization.location?.longitude?.toFixed(6)}
                  </div>

                  <div className="col-span-3 flex justify-end gap-2">
                    <Link href={`/dashboard/admin/organizations/${organization.id}/orders`}>
                      <Button type="button" variant="outline" size="sm">Solicitudes</Button>
                    </Link>
                    <Link href={`/dashboard/admin/organizations/${organization.id}/prices`}>
                      <Button type="button" variant="outline" size="sm">Precios</Button>
                    </Link>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      isLoading={isUpdatingCurrentOrg && updatingStatusContext?.action === "activate"}
                      disabled={
                        (isUpdatingCurrentOrg && updatingStatusContext?.action === "activate") ||
                        organization.status === "ACTIVE" ||
                        (isUpdatingStatus && !isUpdatingCurrentOrg)
                      }
                      onClick={() => handleUpdateOrganizationStatus(organization.id, "activate")}
                      className="border-green-600 text-green-700"
                    >
                      Activar
                    </Button>
                    <Link href={`/dashboard/admin/organizations/${organization.id}/edit`}>
                      <Button type="button" variant="outline" size="sm">Editar</Button>
                    </Link>
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
