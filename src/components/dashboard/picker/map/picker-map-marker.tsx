import { useToast } from '@/components/ui/use-toast'
import { useUserLocation } from '@/hooks/useUserLocation'
import { CarFront } from 'lucide-react'
import React, { useEffect } from 'react'
import { Marker } from 'react-map-gl'

export default function PickerMapMarker() {
    const { getLocation, error, location } = useUserLocation()
    const { toast } = useToast();
    const loadLocation = async () => {
        await getLocation()
    }
    useEffect(() => {
        loadLocation()
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        if (error) {
            toast({
                title: 'Error',
                description: error,
            })
        }
        // eslint-disable-next-line
    }, [error])
    if (!location) return null;
    return (
        <Marker latitude={location?.latitude} longitude={location?.longitude}>
            <CarFront name="MapPin" className="h-6 w-6 text-primary fill-primary" />
        </Marker>
    )
}
