import WelcomeBackUser from "@/components/dashboard/shared/welcome-back-user"
import UserBasicStatistics from "@/components/dashboard/shared/user-basic-statistics"
import Footer from "@/components/dashboard/shared/footer"
import { GetServerSession } from "@/services/server/AuthService"
import { Role } from "@/config/routes"
import { redirect } from "next/navigation"

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
          <UserBasicStatistics />
        </div>
      </section>
      <Footer />
    </>
  )
}