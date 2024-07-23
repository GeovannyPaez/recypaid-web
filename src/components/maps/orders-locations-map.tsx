"use client";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_TOKEN } from "@/config/client";
import { OrdersWithLocations } from "@/types/orders";
import { calculateInitialStateToMapBox } from "@/lib/map";
import LocationMarker from "../dashboard/map/location-marker";
import PickerMapMarker from "../dashboard/picker/map/picker-map-marker";
import { Recycle } from "lucide-react";

type OrdersLocationsMap = {
    orders: OrdersWithLocations[]
}
export default function OrdersLocationsMap({ orders }: OrdersLocationsMap) {
    const locations = orders.map((order) => order.location);
    const initialViewState = calculateInitialStateToMapBox(locations);

    return (
        <div className="w-full">
            <Map
                mapboxAccessToken={MAPBOX_TOKEN}
                initialViewState={initialViewState}
                style={{
                    width: "100%",
                    height: "calc(100vh - 160px)",
                    overflow: "hidden",
                    borderRadius: "50px",
                }}
                mapStyle="mapbox://styles/mapbox/dark-v10"
            >
                {orders.map((order) => (

                    <LocationMarker
                        Icon={Recycle}
                        key={order.id} location={order.location} redirectPath={`/dashboard/picker/orders/${order.id}`}>
                        <div>
                            <h1 className="text-sm">{order.user} ${order.total}</h1>
                            <p className="text-xs text-muted-foreground">{order.address}</p>
                        </div>
                    </LocationMarker>
                ))}
                <PickerMapMarker />
            </Map>
        </div>
    )
}
