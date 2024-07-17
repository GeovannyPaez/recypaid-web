import React from 'react'
import { ArrowRightIcon } from 'lucide-react'
import { Card, CardContent, CardHeader } from '../ui/card'
import Link from 'next/link'

const newsItems = [
    {
        id: 1,
        image: "/centro-reciclaje.jpg",
        title: "Nuevos centros de reciclaje abiertos en tu ciudad",
        description: "Descubre los nuevos puntos de reciclaje que hemos abierto para facilitar tu participación.",
        link: "#"
    },
    {
        id: 2,
        image: "/consejos-reciclaje.jpg",
        title: "Consejos para reciclar más en casa",
        description: "Aprende sencillas formas de aumentar tu reciclaje diario desde tu hogar.",
        link: "#"
    },
    {
        id: 3,
        image: "/incentivos-reciclaje.png",
        title: "Nuevos incentivos para reciclar",
        description: "Descubre los nuevos programas de incentivos que hemos lanzado para motivar el reciclaje.",
        link: "#"
    }
]

type NewsCardProps = {
    image: string
    title: string
    description: string
    link: string

}

const NewsCard = ({ image, title, description, link }: NewsCardProps) => (
    <Card>
        <CardHeader>
            <picture>
                <img
                    alt={title}
                    className="rounded-t-lg object-cover w-full aspect-[16/9]"
                    height="225"
                    src={image}
                    width="400"
                />
            </picture>
        </CardHeader>
        <CardContent className="p-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-muted-foreground mt-2">{description}</p>
            <Link
                className="inline-flex items-center gap-1 mt-4 text-green-600 hover:underline"
                href={link}
            >
                Leer más
                <ArrowRightIcon className="h-4 w-4" />
            </Link>
        </CardContent>
    </Card>
)

export default function LatestNewsSection() {
    return (
        <section className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Últimas noticias y actualizaciones
                        </h2>
                        <p className="max-w-[700px] text-muted-foreground md:text-xl">
                            Mantente al día con las últimas noticias y novedades sobre
                            reciclaje y sostenibilidad.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {newsItems.map((item) => (
                            <NewsCard key={item.id} {...item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}