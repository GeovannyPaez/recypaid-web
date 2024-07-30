import VehicleTripBasicDetails from "@/components/dashboard/picker/vehicle-trips/vehicle-trip-basic-details"
import VehicleTripsService from "@/services/server/VehicleTripsService";

export default async function Component() {
    const trips = [
        {
            id: "1",
            totalWeight: 250.5,
            orders: 12,
            status: "En progreso",
            totalCost: 125.75,
        },
        {
            id: "2",
            totalWeight: 180.2,
            orders: 8,
            status: "Completado",
            totalCost: 92.5,
        },
        {
            id: "3",
            totalWeight: 300.1,
            orders: 15,
            status: "En progreso",
            totalCost: 150.05,
        },
        {
            id: "4",
            totalWeight: 215.3,
            orders: 10,
            status: "Completado",
            totalCost: 107.65,
        },
    ];
    const vehicleTrips = await VehicleTripsService.getVehicleTrips();

    return (
        <>
            <section>
                <h2 className="text-2xl font-semibold mb-4">Viajes</h2>
            </section>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {vehicleTrips.map((trip, i) => (
                    <VehicleTripBasicDetails key={i} trip={trip}
                    />
                ))}
            </section>
        </>
    );
}