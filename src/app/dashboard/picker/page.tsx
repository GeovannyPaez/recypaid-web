import WelcomeBackUser from "@/components/dashboard/shared/welcome-back-user"
import UserBasicStatistics from "@/components/dashboard/shared/user-basic-statistics"
import Footer from "@/components/dashboard/shared/footer"
import { Role } from "@/config/routes"

export default async function UserHomePage() {

    return (
        <>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
                <div className="container px-4 md:px-6 flex flex-col items-center text-center">
                    <WelcomeBackUser />
                    <UserBasicStatistics role={Role.PICKER} />
                </div>
            </section>
            <Footer />
        </>
    )
}