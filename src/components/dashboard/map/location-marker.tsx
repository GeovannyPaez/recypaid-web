import React from 'react'
import { Marker } from "react-map-gl";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { LocateIcon, LucideIcon } from 'lucide-react';
import { LocationDto } from '@/types/orders';
type OrderLocationMarkerProps = {
    location: LocationDto
    redirectPath?: string
    Icon?: LucideIcon
    children?: React.ReactNode
}

export default function LocationMarker({ location, redirectPath, Icon, children }: OrderLocationMarkerProps) {
    return (
        <Marker latitude={location.latitude} longitude={location.longitude}>
            <Link href={redirectPath || "#"}>
                <TooltipProvider>
                    <Tooltip delayDuration={0.2}>
                        <TooltipTrigger>
                            {Icon ? <Icon className="h-8 w-8 text-primary fill-primary-foreground" /> : <LocateIcon name="MapPin" className="h-6 w-6 text-blue-500" />}
                        </TooltipTrigger>
                        <TooltipContent>
                            {children}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </Link>
        </Marker>
    )
}
