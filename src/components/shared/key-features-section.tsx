import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RecycleIcon, Wallet, Truck } from "lucide-react"
import AnimatedSection from './animated-section'

const features = [
    {
        icon: RecycleIcon,
        title: "Recicla desde casa",
        description: "Separa tus residuos reciclables cómodamente en tu hogar. Nuestro sistema te guiará sobre qué materiales aceptamos y cómo prepararlos."
    },
    {
        icon: Truck,
        title: "Recolección a domicilio",
        description: "Cuando acumules una cantidad suficiente, programa una recolección. Nuestro equipo pasará por tu domicilio para recoger tus reciclables."
    },
    {
        icon: Wallet,
        title: "Gana dinero reciclando",
        description: "Recibe pagos directos basados en el peso y tipo de materiales reciclados. Convierte tu compromiso ambiental en una fuente de ingresos extra."
    }
]

export default function KeyFeaturesSection() {
    return (
        <section className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
                            Cómo funciona Recypaid
                        </h2>
                        <p className="max-w-[700px] text-muted-foreground md:text-xl">
                            Descubre cómo Recypaid hace que reciclar sea fácil, conveniente y recompensante.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
                        {features.map((feature, index) => (
                            <AnimatedSection key={index}>
                                <Card className="bg-white border-green-200  shadow-inner hover:shadow-lg transition-shadow ">
                                    <CardHeader>
                                        <feature.icon className="h-12 w-12 text-primary mx-auto" />
                                        <CardTitle className="text-xl font-semibold text-center text-[#052e16]">
                                            {feature.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground text-center">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}