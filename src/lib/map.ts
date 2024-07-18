import { LocationDto } from "@/types/orders";

type Coords = {
    minLat: number,
    maxLat: number,
    minLng: number,
    maxLng: number
}

export const calculateInitialStateToMapBox = (locations: LocationDto[]) => {
    // Calcular las coordenadas extremas de los usuarios
    const minLat = Math.min(...locations.map((location) => location.latitude));
    const maxLat = Math.max(...locations.map((location) => location.latitude));
    const minLng = Math.min(...locations.map((location) => location.longitude));
    const maxLng = Math.max(...locations.map((location) => location.longitude));
    const center = {
        latitude: (minLat + maxLat) / 2,
        longitude: (minLng + maxLng) / 2,
    };

    // Calcular el zoom del mapa para asegurarse de que todos los usuarios estén visibles
    const zoom = getZoom({ minLat, maxLat, minLng, maxLng });

    return { latitude: center.latitude, longitude: center.longitude, zoom };
};

const getZoom = (
    { minLat, maxLat, minLng, maxLng }: Coords
): number => {
    const latFraction = (maxLat - minLat) / 360;
    const lngFraction = (maxLng - minLng) / 360;

    const latZoom = Math.log2(1 / latFraction);
    const lngZoom = Math.log2(1 / lngFraction);

    const zoom = Math.min(latZoom, lngZoom);
    return Math.floor(zoom - 0.5); // Ajuste opcional
};