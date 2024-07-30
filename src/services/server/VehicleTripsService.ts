import { VehicleTripDetails, VehicleTripStats } from "@/types/vehicle-trip";
import { ApiService } from "./ApiService";

class VehicleTripsService extends ApiService {

    private constructor(readonly pathName: string) {
        super(pathName);
    }

    private static privateInstance: VehicleTripsService;

    public static getInstance(): VehicleTripsService {
        if (!VehicleTripsService.privateInstance) {
            VehicleTripsService.privateInstance = new VehicleTripsService("/vehicle-trip");
        }
        return VehicleTripsService.privateInstance;
    }

    async sellVehicleTrip(tripId: string) {
        return this.makeRequest({
            method: 'put',
            endpoint: '/sell-last-vehicle-trip/' + tripId
        })
    }

    async getLastPickerVehicleTrip() {
        return this.makeRequest({
            method: 'get',
            endpoint: '/last-picker-vehicle-trip'
        })
    }

    async getVehicleTrips(): Promise<VehicleTripStats[]> {
        return this.makeRequest({
            method: 'get',
            endpoint: ''
        })
    }

    async getVehicleTripDetails(vehicleTripId: string): Promise<VehicleTripDetails> {
        return this.makeRequest({
            method: 'get',
            endpoint: `/${vehicleTripId}`
        })
    }
}

export default VehicleTripsService.getInstance();