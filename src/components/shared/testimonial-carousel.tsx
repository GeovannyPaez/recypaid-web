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
    quote: "RecyPaid ha revolucionado nuestra vida familiar. Antes, apenas separábamos la basura, pero ahora es toda una actividad en casa. Ver cómo se llenan las bolsas de reciclaje y saber que estamos cuidando nuestro hermoso país (¡y ganando algo de platica!) nos llena de orgullo.",
    name: "María Gómez",
    since: "Con nosotros desde abril pasado"
  },
  {
    quote: "Jamás imaginé que reciclar pudiera ser tan sencillo y motivador. RecyPaid me ha hecho más consciente de lo que consumo y desecho. Ahora, antes de botar algo, siempre me pregunto si se puede reciclar. Y pues, el ingreso extra no cae nada mal en estos tiempos.",
    name: "Juan Pérez",
    since: "Reciclando con RecyPaid hace ya medio año"
  },
  {
    quote: "Al comienzo no estaba muy convencida, pero RecyPaid me demostró que pequeñas acciones pueden generar grandes cambios. Me encanta ver mi barrio más limpio y cómo entre vecinos nos animamos a reciclar más. ¡Es como si hubiéramos empezado una revolución verde en nuestra comunidad!",
    name: "Ana Martínez",
    since: "Parte de la familia RecyPaid desde junio"
  }
]

export default function TestimonialCarousel() {
  return (
    <section className="bg-foreground py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-primary-foreground sm:text-4xl md:text-5xl">
              Voces de nuestra comunidad RecyPaid
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Descubre cómo RecyPaid está cambiando la forma en que los colombianos vemos el reciclaje.
            </p>
          </div>
          <Carousel opts={{
            loop: true,
          }} className="w-3/4 max-w-4xl">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="bg-white border-primary">
                    <CardHeader>
                      <blockquote className="text-lg font-semibold text-muted-foreground leading-relaxed">
                        &quot;{testimonial.quote}&quot;
                      </blockquote>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-center gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" alt="Foto de perfil" />
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