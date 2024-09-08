import { useState, useCallback } from 'react';
import { LocationDto } from '@/types/orders';

interface UseUserLocationResult {
    location: LocationDto | null;
    error: string | null;
    isLoading: boolean;
    permissionGranted: boolean | null;
    getLocation: () => Promise<void>;
}

export const useUserLocation = (): UseUserLocationResult => {
    const [location, setLocation] = useState<LocationDto | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);

    const checkPermission = useCallback(async () => {
        try {
            const { state } = await navigator.permissions.query({ name: 'geolocation' });
            setPermissionGranted(state === 'granted');
        } catch (err) {
            setError("Error al verificar el permiso de ubicación.");
        }
    }, []);

    const getLocation = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        await checkPermission();  // Verifica el estado del permiso antes de intentar obtener la ubicación

        if (permissionGranted === false) {
            setError("Acceso a la ubicación denegado. Por favor, permite el acceso en la configuración de tu navegador y vuelve a intentarlo.");
            setIsLoading(false);
            return;
        }

        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                });
            });

            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        } catch (err) {
            if (err instanceof GeolocationPositionError) {
                switch (err.code) {
                    case err.PERMISSION_DENIED:
                        setError("Acceso a la ubicación denegado. Por favor, permite el acceso en la configuración de tu navegador y vuelve a intentarlo.");
                        break;
                    case err.POSITION_UNAVAILABLE:
                        setError("La información de ubicación no está disponible.");
                        break;
                    case err.TIMEOUT:
                        setError("Se agotó el tiempo de espera al obtener la ubicación.");
                        break;
                    default:
                        setError("Error desconocido al obtener la ubicación.");
                }
            } else {
                setError("Error al obtener la ubicación. Por favor, inténtalo de nuevo.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [checkPermission, permissionGranted]);

    return { location, error, isLoading, permissionGranted, getLocation };
};
