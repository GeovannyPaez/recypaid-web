"use server"
import { errorAction, successAction } from "@/errors/ResponseError";
import getPathNameFromHeaders from "@/lib/get-pathname-from-headers";
import VehicleTripsService from "@/services/server/VehicleTripsService";
import { revalidatePath } from "next/cache";

export const sellVehicleTripAction = async (tripId: string) => {
    try {
        await VehicleTripsService.sellVehicleTrip(tripId);
        revalidatePath(getPathNameFromHeaders());
        return successAction("Viaje vendido correctamente");

    } catch (error) {
        const e = error as Error;
        return errorAction(e.message);
    }
}