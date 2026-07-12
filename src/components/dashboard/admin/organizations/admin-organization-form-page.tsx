"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MAPBOX_TOKEN } from "@/core/config/client";
import {
  CreateOrganizationAsAdminAction,
  UpdateOrganizationAsAdminAction,
} from "@/actions/organization.actions";
import { Organization, OrganizationStatus, OrganizationType } from "@/types/organization";
import { UserPublic } from "@/types/user";

const ORGANIZATION_TYPES: OrganizationType[] = ["ECA", "COOPERATIVE", "ENTERPRISE", "NGO"];

type Props = {
  mode: "create" | "edit";
  users: UserPublic[];
  organization?: Organization;
};

export default function AdminOrganizationFormPage({ mode, users, organization }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const defaultLat = 7.8939;
  const defaultLng = -72.5078;
  const isLatitudeInRange = (value: number) => Number.isFinite(value) && value >= -90 && value <= 90;
  const isLongitudeInRange = (value: number) => Number.isFinite(value) && value >= -180 && value <= 180;

  const initialLatitude = isLatitudeInRange(organization?.location?.latitude ?? Number.NaN)
    ? (organization?.location?.latitude as number)
    : defaultLat;
  const initialLongitude = isLongitudeInRange(organization?.location?.longitude ?? Number.NaN)
    ? (organization?.location?.longitude as number)
    : defaultLng;

  const [latitude, setLatitude] = useState<number>(initialLatitude);
  const [longitude, setLongitude] = useState<number>(initialLongitude);
  const hasValidCoordinates = isLatitudeInRange(latitude) && isLongitudeInRange(longitude);

  const title = useMemo(
    () => (mode === "create" ? "Crear organización" : "Editar organización"),
    [mode],
  );

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        const payload = {
          businessName: String(formData.get("businessName") || "").trim(),
          taxId: String(formData.get("taxId") || "").trim() || null,
          status: String(formData.get("status") || "PENDING") as OrganizationStatus,
          organizationType: String(formData.get("organizationType") || "ECA") as OrganizationType,
          canBuyMaterials: String(formData.get("canBuyMaterials") || "") === "on",
          canManageRoutes: String(formData.get("canManageRoutes") || "") === "on",
          latitude,
          longitude,
        };

        if (mode === "create") {
          const profileId = String(formData.get("ownerUserId") || "").trim();
          if (!profileId || !payload.businessName) {
            toast({
              title: "Error",
              description: "Selecciona dueño y razón social.",
              variant: "destructive",
            });
            return;
          }
          const result = await CreateOrganizationAsAdminAction({
            profileId,
            ...payload,
            taxId: payload.taxId || undefined,
          });
          toast({
            title: result.error ? "Error" : "Éxito",
            description: result.message,
            variant: result.error ? "destructive" : "default",
          });
          if (!result.error) {
            router.push("/dashboard/admin/organizations");
            router.refresh();
          }
          return;
        }

        if (!organization?.id) return;
        const result = await UpdateOrganizationAsAdminAction(organization.id, payload);
        toast({
          title: result.error ? "Error" : "Éxito",
          description: result.message,
          variant: result.error ? "destructive" : "default",
        });
        if (!result.error) {
          router.push("/dashboard/admin/organizations");
          router.refresh();
        }
      } catch {
        toast({
          title: "Error",
          description: "No fue posible guardar la organización.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{title}</h1>
        <Link href="/dashboard/admin/organizations" className="text-sm text-primary hover:underline">
          Volver al listado
        </Link>
      </div>

      <form action={handleSubmit} className="space-y-4 rounded-lg border p-4">
        <div className="grid gap-3 md:grid-cols-2">
          {mode === "create" ? (
            <label className="space-y-1 text-sm md:col-span-2">
              <span className="text-muted-foreground">Usuario dueño</span>
              <select name="ownerUserId" className="w-full rounded border px-3 py-2 text-sm" required defaultValue="">
                <option value="" disabled>Selecciona un usuario</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.email} ({user.id})
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <input name="businessName" defaultValue={organization?.businessName || ""} placeholder="Razón social" className="rounded border px-3 py-2 text-sm" required />
          <input name="taxId" defaultValue={organization?.taxId || ""} placeholder="NIT (opcional)" className="rounded border px-3 py-2 text-sm" />

          <select name="organizationType" className="rounded border px-3 py-2 text-sm" defaultValue={organization?.organizationType || "ECA"}>
            {ORGANIZATION_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
          <select name="status" className="rounded border px-3 py-2 text-sm" defaultValue={organization?.status || "PENDING"}>
            <option value="PENDING">PENDING</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="SUSPENDED">SUSPENDED</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="canBuyMaterials" defaultChecked={organization?.canBuyMaterials ?? true} />
            <span>Puede comprar materiales</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="canManageRoutes" defaultChecked={organization?.canManageRoutes ?? true} />
            <span>Puede gestionar rutas</span>
          </label>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Ubicación (click en el mapa)</p>
          {hasValidCoordinates ? (
            <Map
              mapboxAccessToken={MAPBOX_TOKEN}
              initialViewState={{ latitude, longitude, zoom: 12 }}
              onClick={(event) => {
                setLatitude(event.lngLat.lat);
                setLongitude(event.lngLat.lng);
              }}
              style={{ width: "100%", height: 360, borderRadius: 12 }}
              mapStyle="mapbox://styles/mapbox/streets-v12"
            >
              <Marker
                latitude={latitude}
                longitude={longitude}
                draggable
                onDragEnd={(event) => {
                  setLatitude(event.lngLat.lat);
                  setLongitude(event.lngLat.lng);
                }}
              />
            </Map>
          ) : (
            <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              Coordenadas inválidas. Ajusta latitud/longitud para mostrar el mapa.
            </div>
          )}
          <div className="grid gap-3 md:grid-cols-2">
            <input
              value={Number.isFinite(latitude) ? latitude : ""}
              onChange={(e) => {
                const next = Number(e.target.value);
                if (e.target.value === "") return setLatitude(Number.NaN);
                setLatitude(next);
              }}
              type="number"
              step="any"
              className="rounded border px-3 py-2 text-sm"
            />
            <input
              value={Number.isFinite(longitude) ? longitude : ""}
              onChange={(e) => {
                const next = Number(e.target.value);
                if (e.target.value === "") return setLongitude(Number.NaN);
                setLongitude(next);
              }}
              type="number"
              step="any"
              className="rounded border px-3 py-2 text-sm"
            />
          </div>
        </div>

        <Button type="submit" isLoading={isPending} disabled={isPending}>
          {mode === "create" ? "Crear organización" : "Guardar cambios"}
        </Button>
      </form>
    </div>
  );
}
