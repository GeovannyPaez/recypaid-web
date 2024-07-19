import React from 'react'
import { Card, CardHeader, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"

const testimonials = [
  {
    quote: "RecyPaid ha sido una gran ayuda para mí y mi familia. Ahora reciclamos mucho más y nos sentimos orgullosos de contribuir a un mundo más sostenible. ¡Y encima nos pagan por ello!",
    name: "María Gómez",
    since: "Usuario desde 2020"
  },
  {
    quote: "RecyPaid ha sido un gran aliado en mi camino hacia una vida más sostenible. Ahora reciclo casi todo y me siento mucho más comprometido con el medio ambiente. ¡Y lo mejor es que me pagan por ello!",
    name: "Juan Pérez",
    since: "Usuario desde 2021"
  },
  {
    quote: "RecyPaid ha sido una gran ayuda para mí y mi familia. Ahora reciclamos mucho más y nos sentimos orgullosos de contribuir a un mundo más sostenible. ¡Y lo mejor es que nos pagan por ello!",
    name: "Ana Martínez",
    since: "Usuario desde 2019"
  }
]

export default function TestimonialCarousel() {
  return (
    <section className="bg-foreground py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-primary-foreground sm:text-4xl md:text-5xl">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Escucha las experiencias de otros usuarios que se han unido a
              nuestra comunidad de reciclaje.
            </p>
          </div>
          <Carousel opts={{
            loop: true,
          }} className=" w-3/4 max-w-4xl">
            <CarouselContent >
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className=" bg-white border-primary">
                    <CardHeader>
                      <blockquote className="text-lg font-semibold text-muted-foreground leading-relaxed">
                        &quot;{testimonial.quote}&quot;
                      </blockquote>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-center gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" alt="User Avatar" />
                        <AvatarFallback className='text-primary dark:text-white'>{testimonial.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-primary">
                          {testimonial.name}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {testimonial.since}
                        </p>
                      </div>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  )
}