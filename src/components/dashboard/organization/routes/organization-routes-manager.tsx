"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  CreateRouteAction,
  DeleteRouteAction,
  SyncRouteStopsAction,
  UpdateRouteAction,
} from "@/actions/organization.actions";
import {
  Organization,
  OrganizationCoverage,
  OrganizationRoute,
} from "@/types/organization";

type OrganizationRoutesManagerProps = {
  organizations: Organization[];
  selectedOrgId: string;
  coveragePoints: OrganizationCoverage[];
  routes: OrganizationRoute[];
};

const DAYS_OF_WEEK = [
  { value: "MONDAY", label: "Lunes" },
  { value: "TUESDAY", label: "Martes" },
  { value: "WEDNESDAY", label: "Miércoles" },
  { value: "THURSDAY", label: "Jueves" },
  { value: "FRIDAY", label: "Viernes" },
  { value: "SATURDAY", label: "Sábado" },
  { value: "SUNDAY", label: "Domingo" },
];

export default function OrganizationRoutesManager({
  organizations,
  selectedOrgId,
  coveragePoints,
  routes,
}: OrganizationRoutesManagerProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [isCreating, startCreateTransition] = useTransition();
  const [isUpdating, startUpdateTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();
  const [routesState, setRoutesState] = useState<OrganizationRoute[]>(routes);

  const [updatingRouteId, setUpdatingRouteId] = useState<string | null>(null);
  const [updatingRouteAction, setUpdatingRouteAction] = useState<"save" | "toggle" | null>(null);
  const [deletingRouteId, setDeletingRouteId] = useState<string | null>(null);

  useEffect(() => {
    setRoutesState(routes);
  }, [routes]);

  const showActionToast = (result: ActionResponse) => {
    toast({
      title: result.error ? "Error" : "Éxito",
      description: result.message,
      variant: result.error ? "destructive" : "default",
    });
  };

  const handleCreateRoute = (formData: FormData) => {
    startCreateTransition(async () => {
      try {
        const coveragePointIds = formData
          .getAll("coveragePointIds")
          .map((value) => String(value))
          .filter(Boolean);
        const daysOfWeek = formData
          .getAll("daysOfWeek")
          .map((value) => String(value))
          .filter(Boolean);

        const result = await CreateRouteAction(selectedOrgId, {
          name: String(formData.get("name") || "").trim() || undefined,
          startTime: String(formData.get("startTime") || "").trim() || undefined,
          endTime: String(formData.get("endTime") || "").trim() || undefined,
          notes: String(formData.get("notes") || "").trim() || undefined,
          coveragePointIds,
          daysOfWeek,
        });

        showActionToast(result);
        if (!result.error) {
          if (result.route) {
            setRoutesState((prev) => [result.route as OrganizationRoute, ...prev]);
          }
          router.refresh();
        }
      } catch {
        toast({
          title: "Error",
          description: "No fue posible crear la ruta.",
          variant: "destructive",
        });
      }
    });
  };

  const handleUpdateRoute = (routeId: string, formData: FormData) => {
    setUpdatingRouteId(routeId);
    setUpdatingRouteAction("save");
    startUpdateTransition(async () => {
      try {
        const daysOfWeek = formData
          .getAll("daysOfWeek")
          .map((value) => String(value))
          .filter(Boolean);
        const coveragePointIds = formData
          .getAll("coveragePointIds")
          .map((value) => String(value))
          .filter(Boolean);

        const updateResult = await UpdateRouteAction(selectedOrgId, routeId, {
          name: String(formData.get("name") || "").trim() || undefined,
          startTime: String(formData.get("startTime") || "").trim() || undefined,
          endTime: String(formData.get("endTime") || "").trim() || undefined,
          notes: String(formData.get("notes") || "").trim() || undefined,
          daysOfWeek,
        });

        if (updateResult.error) {
          showActionToast(updateResult);
          return;
        }

        const syncResult = await SyncRouteStopsAction(
          selectedOrgId,
          routeId,
          coveragePointIds,
        );
        showActionToast(syncResult);

        if (!syncResult.error) {
          setRoutesState((prev) =>
            prev.map((route) => {
              if (route.id !== routeId) return route;

              const routeByUpdate =
                (updateResult.route as OrganizationRoute | undefined) ?? route;
              const stops = coveragePointIds.map((coveragePointId, index) => {
                const previousStop = route.stops?.find(
                  (stop) => stop.coveragePointId === coveragePointId,
                );
                const coveragePoint = coveragePoints.find(
                  (point) => point.id === coveragePointId,
                );

                return {
                  id: previousStop?.id ?? `tmp-${routeId}-${coveragePointId}`,
                  routeId,
                  coveragePointId,
                  sequence: index,
                  radiusMeters: previousStop?.radiusMeters ?? 600,
                  isActive: true,
                  coveragePoint: coveragePoint
                    ? {
                        id: coveragePoint.id,
                        name: coveragePoint.name,
                        address: coveragePoint.address,
                        city: coveragePoint.city ?? null,
                        latitude: coveragePoint.latitude,
                        longitude: coveragePoint.longitude,
                      }
                    : undefined,
                };
              });

              return {
                ...route,
                ...routeByUpdate,
                daysOfWeek,
                stops,
              };
            }),
          );
          router.refresh();
        }
      } catch {
        toast({
          title: "Error",
          description: "No fue posible actualizar la ruta.",
          variant: "destructive",
        });
      } finally {
        setUpdatingRouteId(null);
        setUpdatingRouteAction(null);
      }
    });
  };

  const handleToggleRouteActive = (route: OrganizationRoute) => {
    setUpdatingRouteId(route.id);
    setUpdatingRouteAction("toggle");
    startUpdateTransition(async () => {
      try {
        const nextIsActive = !route.isActive;
        const result = await UpdateRouteAction(selectedOrgId, route.id, {
          isActive: nextIsActive,
        });
        showActionToast(result);

        if (!result.error) {
          const updatedRoute = result.route as OrganizationRoute | undefined;
          setRoutesState((prev) =>
            prev.map((currentRoute) =>
              currentRoute.id === route.id
                ? {
                    ...currentRoute,
                    ...(updatedRoute || {}),
                    isActive: updatedRoute?.isActive ?? nextIsActive,
                  }
                : currentRoute,
            ),
          );
          router.refresh();
        }
      } catch {
        toast({
          title: "Error",
          description: "No fue posible actualizar el estado de la ruta.",
          variant: "destructive",
        });
      } finally {
        setUpdatingRouteId(null);
        setUpdatingRouteAction(null);
      }
    });
  };

  const handleDeleteRoute = (routeId: string) => {
    setDeletingRouteId(routeId);
    startDeleteTransition(async () => {
      try {
        const result = await DeleteRouteAction(selectedOrgId, routeId);
        showActionToast(result);
        if (!result.error) {
          setRoutesState((prev) => prev.filter((route) => route.id !== routeId));
          router.refresh();
        }
      } catch {
        toast({
          title: "Error",
          description: "No fue posible eliminar la ruta.",
          variant: "destructive",
        });
      } finally {
        setDeletingRouteId(null);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Rutas por horario</h1>
        <Link href="/dashboard/organization" className="text-sm text-primary hover:underline">
          Volver a organización
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {organizations.map((organization) => (
          <Link
            key={organization.id}
            href={`/dashboard/organization/routes?orgId=${organization.id}`}
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
        action={handleCreateRoute}
        className="space-y-4 rounded-lg border p-4"
      >
        <h2 className="text-lg font-semibold">Crear ruta</h2>

        <div className="grid gap-3 md:grid-cols-2">
          <input
            name="name"
            placeholder="Nombre de la ruta (opcional)"
            className="rounded border px-3 py-2 text-sm md:col-span-2"
          />
          <input
            name="startTime"
            type="time"
            className="rounded border px-3 py-2 text-sm"
            required
          />
          <input
            name="endTime"
            type="time"
            className="rounded border px-3 py-2 text-sm"
            required
          />
          <input
            name="notes"
            placeholder="Notas operativas de la ruta"
            className="rounded border px-3 py-2 text-sm md:col-span-2"
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Días de operación</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {DAYS_OF_WEEK.map((day) => (
              <label key={day.value} className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="daysOfWeek" value={day.value} />
                {day.label}
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Puntos de cobertura de la ruta</p>
          <div className="grid gap-2 md:grid-cols-2">
            {coveragePoints.map((coverage) => (
              <label
                key={coverage.id}
                className="flex items-start gap-2 rounded border p-2 text-sm"
              >
                <input type="checkbox" name="coveragePointIds" value={coverage.id} />
                <span>
                  <span className="font-medium">{coverage.name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {coverage.address}
                  </span>
                </span>
              </label>
            ))}
          </div>
          {coveragePoints.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              Debes crear puntos de cobertura antes de crear rutas.
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          isLoading={isCreating}
          disabled={coveragePoints.length === 0 || isUpdating || isDeleting}
        >
          Crear ruta
        </Button>
      </form>

      <div className="rounded-lg border">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">Listado de rutas</h2>
        </div>
        <div className="space-y-4 p-4">
          {routesState.length === 0 ? (
            <p className="text-sm text-muted-foreground">No hay rutas registradas.</p>
          ) : (
            routesState.map((route) => {
              const stopCoverageIds = new Set(
                (route.stops || []).map((stop) => stop.coveragePointId),
              );
              const routeDays = new Set(route.daysOfWeek || []);
              const isUpdatingThisRoute = isUpdating && updatingRouteId === route.id;
              const isSavingThisRoute =
                isUpdatingThisRoute && updatingRouteAction === "save";
              const isTogglingThisRoute =
                isUpdatingThisRoute && updatingRouteAction === "toggle";
              const isDeletingThisRoute = isDeleting && deletingRouteId === route.id;

              return (
                <div key={route.id} className="rounded-md border p-4 space-y-3">
                  <p className="text-sm font-semibold">
                    {route.name || `Ruta #${route.id.slice(0, 8)}`}
                  </p>
                  <form
                    action={(formData) => handleUpdateRoute(route.id, formData)}
                    className="space-y-3"
                  >
                    <div className="grid gap-3 md:grid-cols-2">
                      <input
                        name="name"
                        defaultValue={route.name || ""}
                        placeholder="Nombre de la ruta"
                        className="rounded border px-3 py-2 text-sm md:col-span-2"
                      />
                      <input
                        name="startTime"
                        type="time"
                        defaultValue={route.startTime || route.scheduledTime || ""}
                        className="rounded border px-3 py-2 text-sm"
                      />
                      <input
                        name="endTime"
                        type="time"
                        defaultValue={route.endTime || ""}
                        className="rounded border px-3 py-2 text-sm"
                      />
                      <input
                        name="notes"
                        defaultValue={route.notes || ""}
                        placeholder="Notas"
                        className="rounded border px-3 py-2 text-sm md:col-span-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">Días</p>
                      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                        {DAYS_OF_WEEK.map((day) => (
                          <label
                            key={`${route.id}-${day.value}`}
                            className="flex items-center gap-2 text-sm"
                          >
                            <input
                              type="checkbox"
                              name="daysOfWeek"
                              value={day.value}
                              defaultChecked={routeDays.has(day.value)}
                            />
                            {day.label}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">
                        Puntos de cobertura
                      </p>
                      <div className="grid gap-2 md:grid-cols-2">
                        {coveragePoints.map((coverage) => (
                          <label
                            key={`${route.id}-${coverage.id}`}
                            className="flex items-start gap-2 rounded border p-2 text-sm"
                          >
                            <input
                              type="checkbox"
                              name="coveragePointIds"
                              value={coverage.id}
                              defaultChecked={stopCoverageIds.has(coverage.id)}
                            />
                            <span>
                              <span className="font-medium">{coverage.name}</span>
                              <span className="block text-xs text-muted-foreground">
                                {coverage.address}
                              </span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button type="submit" isLoading={isSavingThisRoute}>
                        Guardar cambios
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        isLoading={isTogglingThisRoute}
                        disabled={isCreating || isDeleting || (isUpdating && !isUpdatingThisRoute)}
                        onClick={() => handleToggleRouteActive(route)}
                      >
                        {route.isActive ? "Inactivar ruta" : "Activar ruta"}
                      </Button>
                      <span className="text-xs text-muted-foreground self-center">
                        Estado: {route.status} | Activa: {route.isActive ? "Sí" : "No"}
                      </span>
                    </div>
                  </form>

                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    isLoading={isDeletingThisRoute}
                    disabled={isCreating || isUpdating}
                    onClick={() => {
                      const confirmed = window.confirm(
                        "¿Seguro que deseas eliminar esta ruta?",
                      );
                      if (!confirmed) return;
                      handleDeleteRoute(route.id);
                    }}
                  >
                    Eliminar ruta
                  </Button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
