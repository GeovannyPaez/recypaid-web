import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Users,
  Calendar,
  Leaf,
  UserPlus,
  FileText,
  Gift,
  Download,
  Facebook,
  Instagram,
  DollarSign,
  Heart,
  TreePine,
  HandHeart,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CicloLanding() {
  return (
    <>
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-app-highlight">
                Ciclo: vende o dona tus reciclables
              </h1>
              <p className="text-xl md:text-2xl text-app-muted">
                Monetiza o dona tus materiales reciclables mientras cuidas el planeta
              </p>
              <Button
                size="lg"
                className="text-lg px-8 py-6 rounded-full font-semibold bg-app-primary text-app-tint hover:opacity-90 border-none"
              >
                <Download className="mr-2 h-5 w-5" />
                Descárgala ahora
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 rounded-full flex items-center justify-center bg-app-tint">
                  {/* <Recycle className="w-32 h-32 text-app-primary" /> */}
                  <Logo width={100} height={100}/>
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center bg-app-secondary">
                  <DollarSign className="w-8 h-8 text-app-tint" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full flex items-center justify-center bg-app-primary">
                  <Heart className="w-8 h-8 text-app-tint" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ¿De qué va? Section */}
      <section className="px-4 py-16 bg-app-tint">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-app-highlight">¿De qué va?</h2>
          <p className="text-lg md:text-xl mb-12 leading-relaxed text-app-muted">
            Ciclo es una plataforma móvil que conecta hogares con recicladores, permitiéndote vender tus materiales
            reciclables para obtener ingresos extra o donarlos a quienes los necesiten, contribuyendo al medio ambiente.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-sm bg-app-bg">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-12 h-12 mx-auto mb-4 text-app-primary" />
                <p className="font-medium text-app-highlight">Vende tus reciclables y genera ingresos extra</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-app-bg">
              <CardContent className="p-6 text-center">
                <Heart className="w-12 h-12 mx-auto mb-4 text-app-secondary" />
                <p className="font-medium text-app-highlight">Dona materiales a quienes los necesiten</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-app-bg">
              <CardContent className="p-6 text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-app-primary" />
                <p className="font-medium text-app-highlight">Agenda recolecciones de forma fácil</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-app-bg">
              <CardContent className="p-6 text-center">
                <Leaf className="w-12 h-12 mx-auto mb-4 text-app-secondary" />
                <p className="font-medium text-app-highlight">Contribuye al cuidado del medio ambiente</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cómo funciona Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-app-highlight">Cómo funciona</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto bg-app-primary">
                <UserPlus className="w-10 h-10 text-app-tint" />
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto text-white font-bold bg-app-secondary">
                1
              </div>
              <h3 className="text-xl font-semibold text-app-highlight">Regístrate en segundos</h3>
              <p className="text-app-muted">Crea tu cuenta rápidamente con tu información básica</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto bg-app-primary">
                <FileText className="w-10 h-10 text-app-tint" />
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto text-white font-bold bg-app-secondary">
                2
              </div>
              <h3 className="text-xl font-semibold text-app-highlight">Publica tu oferta</h3>
              <p className="text-app-muted">Describe qué materiales tienes para vender o donar</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto bg-app-primary">
                <Users className="w-10 h-10 text-app-tint" />
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto text-white font-bold bg-app-secondary">
                3
              </div>
              <h3 className="text-xl font-semibold text-app-highlight">Conecta con interesados</h3>
              <p className="text-app-muted">Recicladores o personas interesadas responden a tu oferta</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto bg-app-primary">
                <Gift className="w-10 h-10 text-app-tint" />
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto text-white font-bold bg-app-secondary">
                4
              </div>
              <h3 className="text-xl font-semibold text-app-highlight">¡Impacto completado!</h3>
              <p className="text-app-muted">Gana dinero o ayuda a otros mientras cuidas el planeta</p>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section className="px-4 py-16 bg-app-tint">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-app-highlight">
            Doble impacto: económico y ambiental
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-0 shadow-lg bg-app-bg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-app-secondary mr-4">
                    <DollarSign className="w-8 h-8 text-app-tint" />
                  </div>
                  <h3 className="text-2xl font-semibold text-app-highlight">Genera ingresos</h3>
                </div>
                <ul className="space-y-3 text-app-muted">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-app-secondary mt-2 mr-3 flex-shrink-0"></div>
                    Vende papel, cartón, plástico y metales
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-app-secondary mt-2 mr-3 flex-shrink-0"></div>
                    Precios justos basados en el mercado local
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-app-secondary mt-2 mr-3 flex-shrink-0"></div>
                    Pagos seguros y rápidos
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-app-bg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-app-primary mr-4">
                    <Heart className="w-8 h-8 text-app-tint" />
                  </div>
                  <h3 className="text-2xl font-semibold text-app-highlight">Ayuda a otros</h3>
                </div>
                <ul className="space-y-3 text-app-muted">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-app-primary mt-2 mr-3 flex-shrink-0"></div>
                    Dona a familias que necesitan materiales
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-app-primary mt-2 mr-3 flex-shrink-0"></div>
                    Apoya proyectos comunitarios de reciclaje
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-app-primary mt-2 mr-3 flex-shrink-0"></div>
                    Construye una comunidad más sostenible
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Objetivos ODS Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-app-highlight">Nuestro impacto social</h2>
          <p className="text-lg text-center mb-12 text-app-muted">
            Ciclo contribuye directamente a los Objetivos de Desarrollo Sostenible de la ONU
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-0 shadow-sm bg-app-tint">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-app-primary">
                  <DollarSign className="w-8 h-8 text-app-tint" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-app-highlight">Fin de la pobreza</h3>
                <p className="text-app-muted">Creamos oportunidades de ingresos adicionales para familias vulnerables a través de la venta de materiales reciclables</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-app-tint">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-app-primary">
                  <HandHeart className="w-8 h-8 text-app-tint" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-app-highlight">Reducción de desigualdades</h3>
                <p className="text-app-muted">Facilitamos el acceso a materiales reciclables para comunidades de bajos recursos mediante donaciones solidarias</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-app-tint">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-app-primary">
                  <TreePine className="w-8 h-8 text-app-tint" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-app-highlight">Acción por el clima</h3>
                <p className="text-app-muted">Promovemos la economía circular y reducimos residuos que terminan en vertederos, protegiendo nuestro medio ambiente</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="px-4 py-16 bg-app-tint">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-app-highlight">
            Disponible en App Store y Google Play
          </h2>
          <p className="text-lg mb-12 text-app-muted">
            Descarga Ciclo y comienza a generar ingresos o ayudar a tu comunidad
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              size="lg"
              className="px-8 py-6 rounded-xl font-semibold bg-app-highlight text-app-tint hover:opacity-90 border-none"
            >
              <Image
                src="/app-store.png"
                alt="App Store"
                width={24}
                height={24}
                className="mr-3"
              />
              Descargar para iOS
            </Button>
            <Button
              size="lg"
              className="px-8 py-6 rounded-xl font-semibold bg-app-secondary text-app-tint hover:opacity-90 border-none"
            >
              <Image
                src="/google-play.png"
                alt="Google Play"
                width={24}
                height={24}
                className="mr-3"
              />
              Descargar para Android
            </Button>
          </div>
          <Button
            size="lg"
            className="text-lg px-8 py-6 rounded-full font-semibold bg-app-primary text-app-tint hover:opacity-90 border-none"
          >
            <Download className="mr-2 h-5 w-5" />
            Descárgala ahora
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 bg-app-highlight">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center mb-4">
                <Logo width={25} height={25}/>
                {/* <Recycle className="w-8 h-8 mr-2 text-app-primary" /> */}
                <span className="text-2xl font-bold text-app-tint ml-2">Ciclo</span>
              </div>
              <p className="text-app-text">
                Conectando hogares con oportunidades de reciclaje para un futuro más sostenible y próspero
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-app-tint">Enlaces</h3>
              <div className="space-y-2">
                <Link href="#" className="block hover:underline text-app-text">
                  Acerca de
                </Link>
                <Link href="#" className="block hover:underline text-app-text">
                  Contacto
                </Link>
                <Link href="/legal/privacy_policy" className="block hover:underline text-app-text" prefetch={false}>
                        Política de privacidad
                </Link>
                <Link href="/legal/terms_conditions" className="block hover:underline text-app-text" prefetch={false}>
                    Términos de servicio
                </Link>

              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-app-tint">Síguenos</h3>
              <div className="flex space-x-4">
                <Link href="https://www.facebook.com/people/Ciclo/61563588954013/" className="hover:opacity-80">
                  <Facebook className="w-6 h-6 text-app-icon" />
                </Link>
                <Link href="https://www.instagram.com/Ciclo/" className="hover:opacity-80">
                  <Instagram className="w-6 h-6 text-app-icon" />
                </Link> 
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 border-app-muted">
            <p className="text-center text-app-icon">
              © {new Date().getFullYear()} Ciclo. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
      </>
  )
}