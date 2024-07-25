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
    quote: "RecyPaid ha sido una increíble ayuda para mi familia. Ahora reciclamos mucho más y estamos orgullosos de contribuir a un mundo más sostenible. ¡Además, nos pagan por hacerlo!",
    name: "María Gómez",
    since: "Usuario desde abril de 2024"
  },
  {
    quote: "RecyPaid ha sido un excelente aliado en mi camino hacia una vida más sostenible. Ahora reciclo casi todo y me siento mucho más comprometido con el medio ambiente. ¡Y lo mejor es que me pagan por ello!",
    name: "Juan Pérez",
    since: "Usuario desde marzo de 2024"
  },
  {
    quote: "RecyPaid ha sido fundamental para mí y mi familia. Hemos aumentado nuestra cantidad de reciclaje y nos sentimos bien al saber que estamos haciendo algo positivo por el planeta. ¡Y encima nos pagan por ello!",
    name: "Ana Martínez",
    since: "Usuario desde junio de 2024"
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
