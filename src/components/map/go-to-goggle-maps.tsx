"use client";

import { LocationDto } from '@/types/orders'
import React from 'react'
import { Button } from '../ui/button'
import { MapPin } from 'lucide-react'

export default function GoToGoggleMaps({
    latitude,
    longitude
}:LocationDto) {
    const openGoogleMaps = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        window.open(url, '_blank');
    };
    return (
        <Button variant="outline" size="sm" onClick={openGoogleMaps}>
            <MapPin className="h-4 w-4" />
            Cómo llegar
        </Button>
    )
}
