"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import Map, { Layer, MapRef, Marker, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { LocateFixed, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MAPBOX_TOKEN } from "@/core/config/client";
import { useToast } from "@/hooks/use-toast";
import { useUserLocation } from "@/hooks/useUserLocation";
import {
  CreateCoverageAction,
  CreateRouteAction,
  DeleteRouteAction,
  SyncRouteStopsAction,
  UpdateCoverageAction,
  UpdateRouteAction,
} from "@/actions/organization.actions";
import { Organization, OrganizationRoute } from "@/types/organization";

type OrganizationRoutesManagerProps = {
  organizations: Organization[];
  selectedOrgId: string;
  routes: OrganizationRoute[];
};

type RoutePointInput = {
  coveragePointId?: string;
  latitude: number;
  longitude: number;
  address: string;
  name: string;
};

const DAYS_OF_WEEK = [
  { value: "MONDAY", label: "Lunes" },
  { value: "TUESDAY", label: "Martes" },
  { value: "WEDNESDAY", label: "Miercoles" },
  { value: "THURSDAY", label: "Jueves" },
  { value: "FRIDAY", label: "Viernes" },
  { value: "SATURDAY", label: "Sabado" },
  { value: "SUNDAY", label: "Domingo" },
];

export default function OrganizationRoutesManager({
  organizations,
  selectedOrgId,
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
      title: result.error ? "Error" : "Exito",
      description: result.message,
      variant: result.error ? "destructive" : "default",
    });
  };

  const reverseGeocode = async (latitude: number, longitude: number): Promise<string> => {
    if (!MAPBOX_TOKEN) return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_TOKEN}&language=es&limit=1`,
      );
      if (!response.ok) return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
      const payload = (await response.json()) as { features?: Array<{ place_name?: string }> };
      return payload.features?.[0]?.place_name || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
    } catch {
      return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
    }
  };

  const syncRouteCoveragePoints = async (
    points: RoutePointInput[],
    routeName: string | undefined,
  ): Promise<string[]> => {
    const ids: string[] = [];
    for (let index = 0; index < points.length; index += 1) {
      const point = points[index];
      const payload = {
        name: point.name?.trim() || `${routeName || "Ruta"} - Punto ${index + 1}`,
        contactEmail: "ruta@recypaid.local",
        address: point.address || `${point.latitude.toFixed(6)}, ${point.longitude.toFixed(6)}`,
        city: "",
        latitude: point.latitude,
        longitude: point.longitude,
        preferredDays: [],
        scheduleFrequency: "WEEKLY",
        clientType: "OTHER",
      };

      if (point.coveragePointId) {
        const update = await UpdateCoverageAction(selectedOrgId, point.coveragePointId, payload);
        if (update.error || !update.coverage) throw new Error(update.message);
        ids.push(update.coverage.id);
      } else {
        const created = await CreateCoverageAction(selectedOrgId, payload);
        if (created.error || !created.coverage) throw new Error(created.message);
        ids.push(created.coverage.id);
      }
    }
    return ids;
  };

  const handleCreateRoute = (formData: FormData) => {
    startCreateTransition(async () => {
      try {
        const daysOfWeek = formData.getAll("daysOfWeek").map((v) => String(v)).filter(Boolean);
        const points = JSON.parse(String(formData.get("routePoints") || "[]")) as RoutePointInput[];
        const name = String(formData.get("name") || "").trim() || undefined;

        if (!points.length) {
          toast({ title: "Error", description: "Agrega al menos un punto en el mapa.", variant: "destructive" });
          return;
        }

        const coveragePointIds = await syncRouteCoveragePoints(points, name);

        const result = await CreateRouteAction(selectedOrgId, {
          name,
          startTime: String(formData.get("startTime") || "").trim() || undefined,
          endTime: String(formData.get("endTime") || "").trim() || undefined,
          notes: String(formData.get("notes") || "").trim() || undefined,
          coveragePointIds,
          daysOfWeek,
        });

        showActionToast(result);
        if (!result.error) {
          router.refresh();
        }
      } catch {
        toast({ title: "Error", description: "No fue posible crear la ruta.", variant: "destructive" });
      }
    });
  };

  const handleUpdateRoute = (routeId: string, formData: FormData) => {
    setUpdatingRouteId(routeId);
    setUpdatingRouteAction("save");
    startUpdateTransition(async () => {
      try {
        const daysOfWeek = formData.getAll("daysOfWeek").map((v) => String(v)).filter(Boolean);
        const points = JSON.parse(String(formData.get("routePoints") || "[]")) as RoutePointInput[];
        const name = String(formData.get("name") || "").trim() || undefined;

        if (!points.length) {
          toast({ title: "Error", description: "La ruta debe tener al menos un punto.", variant: "destructive" });
          return;
        }

        const coveragePointIds = await syncRouteCoveragePoints(points, name);

        const updateResult = await UpdateRouteAction(selectedOrgId, routeId, {
          name,
          startTime: String(formData.get("startTime") || "").trim() || undefined,
          endTime: String(formData.get("endTime") || "").trim() || undefined,
          notes: String(formData.get("notes") || "").trim() || undefined,
          daysOfWeek,
        });

        if (updateResult.error) {
          showActionToast(updateResult);
          return;
        }

        const syncResult = await SyncRouteStopsAction(selectedOrgId, routeId, coveragePointIds);
        showActionToast(syncResult);
        if (!syncResult.error) router.refresh();
      } catch {
        toast({ title: "Error", description: "No fue posible actualizar la ruta.", variant: "destructive" });
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
        const result = await UpdateRouteAction(selectedOrgId, route.id, { isActive: nextIsActive });
        showActionToast(result);
        if (!result.error) router.refresh();
      } catch {
        toast({ title: "Error", description: "No fue posible actualizar el estado de la ruta.", variant: "destructive" });
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
        toast({ title: "Error", description: "No fue posible eliminar la ruta.", variant: "destructive" });
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
          Volver a organizacion
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {organizations.map((organization) => (
          <Link
            key={organization.id}
            href={`/dashboard/organization/routes?orgId=${organization.id}`}
            className={`rounded-md border px-3 py-2 text-sm ${organization.id === selectedOrgId ? "border-primary bg-primary/10 font-medium" : "border-border"}`}
          >
            {organization.businessName}
          </Link>
        ))}
      </div>

      <form action={handleCreateRoute} className="space-y-4 rounded-lg border p-4">
        <h2 className="text-lg font-semibold">Crear ruta</h2>

        <div className="grid gap-3 md:grid-cols-2">
          <input name="name" placeholder="Nombre de la ruta (opcional)" className="rounded border px-3 py-2 text-sm md:col-span-2" />
          <input name="startTime" type="time" className="rounded border px-3 py-2 text-sm" required />
          <input name="endTime" type="time" className="rounded border px-3 py-2 text-sm" required />
          <input name="notes" placeholder="Notas operativas de la ruta" className="rounded border px-3 py-2 text-sm md:col-span-2" />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Dias de operacion</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {DAYS_OF_WEEK.map((day) => (
              <label key={day.value} className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="daysOfWeek" value={day.value} />
                {day.label}
              </label>
            ))}
          </div>
        </div>

        <RouteMapEditor name="routePoints" reverseGeocode={reverseGeocode} />

        <Button type="submit" isLoading={isCreating} disabled={isUpdating || isDeleting}>
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
              const routeDays = new Set(route.daysOfWeek || []);
              const isUpdatingThisRoute = isUpdating && updatingRouteId === route.id;
              const isSavingThisRoute = isUpdatingThisRoute && updatingRouteAction === "save";
              const isTogglingThisRoute = isUpdatingThisRoute && updatingRouteAction === "toggle";
              const isDeletingThisRoute = isDeleting && deletingRouteId === route.id;

              return (
                <div key={route.id} className="rounded-md border p-4 space-y-3">
                  <p className="text-sm font-semibold">{route.name || `Ruta #${route.id.slice(0, 8)}`}</p>
                  <form action={(formData) => handleUpdateRoute(route.id, formData)} className="space-y-3">
                    <div className="grid gap-3 md:grid-cols-2">
                      <input name="name" defaultValue={route.name || ""} placeholder="Nombre de la ruta" className="rounded border px-3 py-2 text-sm md:col-span-2" />
                      <input name="startTime" type="time" defaultValue={route.startTime || route.scheduledTime || ""} className="rounded border px-3 py-2 text-sm" />
                      <input name="endTime" type="time" defaultValue={route.endTime || ""} className="rounded border px-3 py-2 text-sm" />
                      <input name="notes" defaultValue={route.notes || ""} placeholder="Notas" className="rounded border px-3 py-2 text-sm md:col-span-2" />
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">Dias</p>
                      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                        {DAYS_OF_WEEK.map((day) => (
                          <label key={`${route.id}-${day.value}`} className="flex items-center gap-2 text-sm">
                            <input type="checkbox" name="daysOfWeek" value={day.value} defaultChecked={routeDays.has(day.value)} />
                            {day.label}
                          </label>
                        ))}
                      </div>
                    </div>

                    <RouteMapEditor
                      name="routePoints"
                      reverseGeocode={reverseGeocode}
                      initialPoints={(route.stops || [])
                        .sort((a, b) => a.sequence - b.sequence)
                        .map((stop, index) => {
                          const p = stop.coveragePoint;
                          if (!p) return null;
                          return {
                            coveragePointId: stop.coveragePointId,
                            latitude: p.latitude,
                            longitude: p.longitude,
                            address: p.address,
                            name: p.name || `Punto ${index + 1}`,
                          };
                        })
                        .filter(Boolean) as RoutePointInput[]}
                    />

                    <div className="flex flex-wrap gap-2">
                      <Button type="submit" isLoading={isSavingThisRoute}>Guardar cambios</Button>
                      <Button
                        type="button"
                        variant="outline"
                        isLoading={isTogglingThisRoute}
                        disabled={isCreating || isDeleting || (isUpdating && !isUpdatingThisRoute)}
                        onClick={() => handleToggleRouteActive(route)}
                      >
                        {route.isActive ? "Inactivar ruta" : "Activar ruta"}
                      </Button>
                      <span className="text-xs text-muted-foreground self-center">Estado: {route.status} | Activa: {route.isActive ? "Si" : "No"}</span>
                    </div>
                  </form>

                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    isLoading={isDeletingThisRoute}
                    disabled={isCreating || isUpdating}
                    onClick={() => {
                      const confirmed = window.confirm("Seguro que deseas eliminar esta ruta?");
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

type RouteMapEditorProps = {
  name: string;
  initialPoints?: RoutePointInput[];
  reverseGeocode: (latitude: number, longitude: number) => Promise<string>;
};

const EMPTY_ROUTE_POINTS: RoutePointInput[] = [];

function RouteMapEditor({ name, initialPoints, reverseGeocode }: RouteMapEditorProps) {
  const safeInitialPoints = initialPoints ?? EMPTY_ROUTE_POINTS;
  const { getLocation, location, isLoading } = useUserLocation();
  const [points, setPoints] = useState<RoutePointInput[]>(safeInitialPoints);

  const mapRef = useRef<MapRef | null>(null);

  useEffect(() => {
    setPoints(safeInitialPoints);
  }, [safeInitialPoints]);

  useEffect(() => {
    if (!location) return;
    mapRef.current?.flyTo({ center: [location.longitude, location.latitude], zoom: 14, duration: 800 });
  }, [location]);

  const lineGeoJson = useMemo(
    () => ({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: points.map((point) => [point.longitude, point.latitude]),
      },
    }),
    [points],
  );

  const addPoint = async (latitude: number, longitude: number) => {
    const address = await reverseGeocode(latitude, longitude);
    setPoints((prev) => [...prev, { latitude, longitude, address, name: `Punto ${prev.length + 1}` }]);
  };

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={JSON.stringify(points)} />
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium">Puntos de la ruta (clic en el mapa para agregar)</p>
        <Button type="button" variant="outline" size="sm" isLoading={isLoading} onClick={() => getLocation()}>
          <LocateFixed className="h-4 w-4 mr-1" />
          Mi ubicacion
        </Button>
      </div>
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          latitude: safeInitialPoints[0]?.latitude ?? 4.711,
          longitude: safeInitialPoints[0]?.longitude ?? -74.0721,
          zoom: 12,
        }}
        ref={mapRef}
        onClick={(evt) => addPoint(evt.lngLat.lat, evt.lngLat.lng)}
        style={{ width: "100%", height: 360, borderRadius: 12 }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        {location ? <Marker latitude={location.latitude} longitude={location.longitude} color="#1d4ed8" /> : null}
        {points.length > 1 ? (
          <Source id={`${name}-line`} type="geojson" data={lineGeoJson as never}>
            <Layer id={`${name}-line-layer`} type="line" paint={{ "line-color": "#16a34a", "line-width": 4 }} />
          </Source>
        ) : null}
        {points.map((point, index) => (
          <Marker
            key={`${name}-${index}-${point.coveragePointId || "new"}`}
            latitude={point.latitude}
            longitude={point.longitude}
            draggable
            onDragEnd={async (event) => {
              const latitude = event.lngLat.lat;
              const longitude = event.lngLat.lng;
              const address = await reverseGeocode(latitude, longitude);
              setPoints((prev) => prev.map((p, i) => (i === index ? { ...p, latitude, longitude, address } : p)));
            }}
          />
        ))}
      </Map>

      <div className="space-y-2">
        {points.length === 0 ? (
          <p className="text-xs text-muted-foreground">Agrega puntos con clic en el mapa.</p>
        ) : (
          points.map((point, index) => (
            <div key={`${name}-point-${index}`} className="grid gap-2 rounded border p-2 md:grid-cols-12">
              <input
                value={point.name}
                onChange={(event) => setPoints((prev) => prev.map((p, i) => (i === index ? { ...p, name: event.target.value } : p)))}
                className="rounded border px-2 py-1 text-sm md:col-span-3"
              />
              <input
                value={point.address}
                onChange={(event) => setPoints((prev) => prev.map((p, i) => (i === index ? { ...p, address: event.target.value } : p)))}
                className="rounded border px-2 py-1 text-sm md:col-span-7"
              />
              <div className="flex items-center gap-1 md:col-span-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={index === 0}
                  onClick={() =>
                    setPoints((prev) => {
                      const next = [...prev];
                      [next[index - 1], next[index]] = [next[index], next[index - 1]];
                      return next;
                    })
                  }
                >
                  Up
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={index === points.length - 1}
                  onClick={() =>
                    setPoints((prev) => {
                      const next = [...prev];
                      [next[index], next[index + 1]] = [next[index + 1], next[index]];
                      return next;
                    })
                  }
                >
                  Down
                </Button>
                <Button type="button" variant="destructive" size="sm" onClick={() => setPoints((prev) => prev.filter((_, i) => i !== index))}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}



