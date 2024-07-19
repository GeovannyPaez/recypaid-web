import { Button } from "@/components/ui/button";
import GoBackCLient from "@/components/ui/go-back-client";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-primary text-gray-900">
            <div className="max-w-md px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-5xl font-bold mb-4">Oops! Página no encontrada</h1>
                <p className="text-lg mb-8">
                    Lo sentimos, la página que buscas no se encuentra disponible.
                </p>
                <GoBackCLient>
                    <Button variant={"secondary"}>
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Volver atrás
                    </Button>
                </GoBackCLient>
            </div>
        </div>
    );
}
