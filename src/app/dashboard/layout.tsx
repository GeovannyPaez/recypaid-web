import { Metadata } from "next";
import Header from "../../components/dashboard/header";

type Props = Readonly<{
  children: React.ReactNode;
}>;
export const metadata: Metadata = {
  title: {
    default: "Dashboard | Recypaid",
    template: "%s | Recypaid Dashboard"
  },
  description: "Gestiona tus actividades de reciclaje, ve tus recompensas y contribuye al medio ambiente con Recypaid.",
  keywords: "dashboard, reciclaje, recompensas, medio ambiente, Recypaid, Colombia",
  robots: "noindex, nofollow", // Typically, dashboard pages are not indexed for privacy reasons
}
export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}
