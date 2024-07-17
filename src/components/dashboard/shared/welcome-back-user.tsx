import ProfileService from "@/services/server/ProfileService"


export default async function WelcomeBackUser() {
    const userProfile = await ProfileService.get()
    if (!userProfile) {
        return (
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground">¡Bienvenido de vuelta!</h1>
        )
    }
    const welcomeMessage = `¡Bienvenido de vuelta, ${userProfile.name}!`
    return (
        <>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground">{welcomeMessage}</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl mt-4">
                Aquí tienes un resumen rápido de tus actividades de reciclaje.
            </p>
        </>
    )
}
