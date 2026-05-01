"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import Map, { Layer, MapRef, Marker, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { LocateFixed, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
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
import { OrganizationRoute } from "@/types/organization";

type RoutePointInput = {
  coveragePointId?: string;
  latitude: number;
  longitude: number;
  address: string;
  name: string;
};

type Props = {
  orgId: string;
  mode: "create" | "edit";
  route?: OrganizationRoute;
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

export default function RouteFormPage({ orgId, mode, route }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [points, setPoints] = useState<RoutePointInput[]>(
    (route?.stops || [])
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
      .filter(Boolean) as RoutePointInput[],
  );

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

  const syncRouteCoveragePoints = async (routeName: string | undefined): Promise<string[]> => {
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
        const update = await UpdateCoverageAction(orgId, point.coveragePointId, payload);
        if (update.error || !update.coverage) throw new Error(update.message);
        ids.push(update.coverage.id);
      } else {
        const created = await CreateCoverageAction(orgId, payload);
        if (created.error || !created.coverage) throw new Error(created.message);
        ids.push(created.coverage.id);
      }
    }
    return ids;
  };

  const onSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        if (!points.length) {
          toast({ title: "Error", description: "Agrega al menos un punto.", variant: "destructive" });
          return;
        }

        const name = String(formData.get("name") || "").trim() || undefined;
        const coveragePointIds = await syncRouteCoveragePoints(name);
        const daysOfWeek = formData.getAll("daysOfWeek").map((v) => String(v)).filter(Boolean);

        if (mode === "create") {
          const created = await CreateRouteAction(orgId, {
            name,
            startTime: String(formData.get("startTime") || "").trim() || undefined,
            endTime: String(formData.get("endTime") || "").trim() || undefined,
            notes: String(formData.get("notes") || "").trim() || undefined,
            daysOfWeek,
            coveragePointIds,
          });
          if (created.error || !created.route) throw new Error(created.message);
          router.push(`/dashboard/organization/routes/${created.route.id}?orgId=${orgId}`);
          router.refresh();
          return;
        }

        if (!route) return;
        const updated = await UpdateRouteAction(orgId, route.id, {
          name,
          startTime: String(formData.get("startTime") || "").trim() || undefined,
          endTime: String(formData.get("endTime") || "").trim() || undefined,
          notes: String(formData.get("notes") || "").trim() || undefined,
          daysOfWeek,
        });
        if (updated.error) throw new Error(updated.message);

        const sync = await SyncRouteStopsAction(orgId, route.id, coveragePointIds);
        if (sync.error) throw new Error(sync.message);

        toast({ title: "Exito", description: "Ruta actualizada." });
        router.refresh();
      } catch (error) {
        toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{mode === "create" ? "Crear ruta" : "Editar ruta"}</h1>
        <Link href={`/dashboard/organization/routes?orgId=${orgId}`} className="text-sm text-primary hover:underline">
          Volver a rutas
        </Link>
      </div>

      <form action={onSubmit} className="space-y-4 rounded-lg border p-4">
        <div className="grid gap-3 md:grid-cols-2">
          <input name="name" defaultValue={route?.name || ""} placeholder="Nombre" className="rounded border px-3 py-2 text-sm md:col-span-2" />
          <input name="startTime" type="time" defaultValue={route?.startTime || route?.scheduledTime || ""} className="rounded border px-3 py-2 text-sm" required={mode === "create"} />
          <input name="endTime" type="time" defaultValue={route?.endTime || ""} className="rounded border px-3 py-2 text-sm" required={mode === "create"} />
          <input name="notes" defaultValue={route?.notes || ""} placeholder="Notas" className="rounded border px-3 py-2 text-sm md:col-span-2" />
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {DAYS_OF_WEEK.map((day) => (
            <label key={day.value} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="daysOfWeek"
                value={day.value}
                defaultChecked={Boolean(route?.daysOfWeek?.includes(day.value))}
              />
              {day.label}
            </label>
          ))}
        </div>

        <RouteMapEditor points={points} setPoints={setPoints} reverseGeocode={reverseGeocode} />

        <div className="flex gap-2">
          <Button type="submit" isLoading={isPending}>{mode === "create" ? "Crear ruta" : "Guardar"}</Button>
          {mode === "edit" && route ? (
            <Button
              type="button"
              variant="destructive"
              isLoading={isPending}
              onClick={() => {
                const ok = window.confirm("Seguro que deseas eliminar esta ruta?");
                if (!ok) return;
                startTransition(async () => {
                  const deleted = await DeleteRouteAction(orgId, route.id);
                  if (deleted.error) {
                    toast({ title: "Error", description: deleted.message, variant: "destructive" });
                    return;
                  }
                  router.push(`/dashboard/organization/routes?orgId=${orgId}`);
                  router.refresh();
                });
              }}
            >
              Eliminar
            </Button>
          ) : null}
        </div>
      </form>
    </div>
  );
}

function RouteMapEditor({
  points,
  setPoints,
  reverseGeocode,
}: {
  points: RoutePointInput[];
  setPoints: React.Dispatch<React.SetStateAction<RoutePointInput[]>>;
  reverseGeocode: (latitude: number, longitude: number) => Promise<string>;
}) {
  const mapRef = useRef<MapRef | null>(null);
  const { getLocation, location, isLoading } = useUserLocation();

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
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium">Puntos de la ruta</p>
        <Button type="button" variant="outline" size="sm" isLoading={isLoading} onClick={() => getLocation()}>
          <LocateFixed className="h-4 w-4 mr-1" /> Mi ubicacion
        </Button>
      </div>

      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          latitude: points[0]?.latitude ?? 4.711,
          longitude: points[0]?.longitude ?? -74.0721,
          zoom: 12,
        }}
        ref={mapRef}
        onClick={(evt) => addPoint(evt.lngLat.lat, evt.lngLat.lng)}
        style={{ width: "100%", height: 340, borderRadius: 12 }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        {location ? <Marker latitude={location.latitude} longitude={location.longitude} color="#1d4ed8" /> : null}
        {points.length > 1 ? (
          <Source id="route-line" type="geojson" data={lineGeoJson as never}>
            <Layer id="route-line-layer" type="line" paint={{ "line-color": "#16a34a", "line-width": 4 }} />
          </Source>
        ) : null}
        {points.map((point, index) => (
          <Marker
            key={`${index}-${point.coveragePointId || "new"}`}
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

      {points.length > 0 ? (
        <div className="space-y-2">
          {points.map((point, index) => (
            <div key={index} className="grid gap-2 rounded border p-2 md:grid-cols-12">
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
          ))}
        </div>
      ) : null}
    </div>
  );
}
