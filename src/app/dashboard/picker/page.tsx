import Footer from "@/components/shared/footer"
import UserBasicStatisticsSkeleton from "@/components/shared/skeletons/user-basic-statistics-skeleton"
import UserBasicStatistics from "@/components/shared/user-basic-statistics"
import WelcomeBackUser from "@/components/shared/welcome-back-user"
import { Role } from "@/config/routes"
import { Suspense } from "react"

export default async function UserHomePage() {
    return (
        <>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
                <div className="container px-4 md:px-6 flex flex-col items-center text-center">
                    <WelcomeBackUser />
                    <p className="max-w-[700px] text-muted-foreground md:text-xl mt-4">
                        Aquí tienes un resumen rápido de tus actividades de reciclaje.
                    </p>
                    <Suspense fallback={<UserBasicStatisticsSkeleton role={Role.PICKER} />}>
                        <UserBasicStatistics role={Role.PICKER} />
                    </Suspense>
                </div>
            </section>
            <Footer />
        </>
    )
}