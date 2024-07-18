"use client"
import useUpdateSearchParams from '@/hooks/useUpdateSearchParams'
import { MapIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type GoToOrdersLocationsMapProps = {
    goWithCurrentSearchParam?: boolean
    pahtName?: string
}
export default function GoToOrdersLocationsMap({ goWithCurrentSearchParam = true, pahtName = "/dashboard/picker/map" }: GoToOrdersLocationsMapProps) {
    const { getCurrentSearchParams } = useUpdateSearchParams({
        searchParamsInPage: ["initDate", "endDate"],
    })
    const href = `${pahtName}?${goWithCurrentSearchParam && getCurrentSearchParams()}`
    return (
        <Link href={href}>
            <MapIcon className="h-6 w-6" />
        </Link>
    )
}
