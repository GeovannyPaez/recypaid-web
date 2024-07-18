import { Suspense } from "react"
import UserBasicStatisticsSkeleton from "@/components/shared/skeletons/user-basic-statistics-skeleton"
import WelcomeBackUser from "@/components/shared/welcome-back-user"
import UserBasicStatistics from "@/components/shared/user-basic-statistics"
import Footer from "@/components/shared/footer"
import { GetServerSession } from "@/services/server/AuthService"
import { redirect } from "next/navigation"
import { Role } from "@/config/routes"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function UserHomePage() {
  const session = await GetServerSession()
  if (session.role == Role.PICKER) {
    redirect("/dashboard/picker")
  }
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center">
          <WelcomeBackUser />
          <p className="max-w-[700px] text-muted-foreground md:text-xl mt-4">
            Aquí tienes un resumen rápido de tus actividades de reciclaje.
          </p>
          <p className="max-w-[700px] text-muted-foreground md:text-xl mt-4">
            <Button size={"sm"}>
              <Link href="/dashboard/recycling">
                Reciclar</Link>
            </Button>
          </p>
          <Suspense fallback={<UserBasicStatisticsSkeleton />}>
            <UserBasicStatistics />
          </Suspense>
        </div>
      </section>
      <Footer />
    </>
  )
}