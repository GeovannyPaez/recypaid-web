import type { Metadata } from "next"
import Link from "next/link"
import { AlertTriangle, Clock, Database, Mail, Shield, Trash2 } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const supportEmail = "soporte@cicloapp.com"
const deletionSubject = encodeURIComponent("Solicitud de eliminacion de cuenta Ciclo")
const deletionBody = encodeURIComponent(
  [
    "Hola, quiero solicitar la eliminacion de mi cuenta de Ciclo.",
    "",
    "Correo registrado:",
    "Nombre completo:",
    "Telefono registrado, si aplica:",
    "Motivo de la solicitud:",
    "",
    "Confirmo que entiendo que la eliminacion de la cuenta y los datos asociados puede ser irreversible.",
  ].join("\n"),
)

export const metadata: Metadata = {
  title: "Eliminacion de cuenta - Ciclo",
  description:
    "Pagina oficial para solicitar la eliminacion de una cuenta de Ciclo y los datos asociados.",
}

export default function AccountDeletionPage() {
  const mailtoHref = `mailto:${supportEmail}?subject=${deletionSubject}&body=${deletionBody}`

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Eliminacion de cuenta - Ciclo</h1>
          <p className="text-muted-foreground">Recurso oficial de Ciclo para solicitudes de eliminacion de cuenta.</p>
          <Badge variant="secondary" className="mt-3">
            Aplicacion de reciclaje
          </Badge>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              Solicitar eliminacion de cuenta
            </CardTitle>
            <CardDescription>
              Puedes solicitar la eliminacion de tu cuenta y los datos personales asociados, incluso si ya
              desinstalaste la aplicacion.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Por seguridad, verificaremos que la solicitud corresponda al titular de la cuenta antes de eliminar
                informacion personal.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Como enviar la solicitud</h2>
              <ol className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">1. Escribenos desde tu correo registrado.</span>{" "}
                  Esto ayuda a verificar que eres la persona titular de la cuenta.
                </li>
                <li>
                  <span className="font-medium text-foreground">2. Incluye tus datos de identificacion.</span>{" "}
                  Envia tu correo registrado, nombre completo y telefono registrado si aplica.
                </li>
                <li>
                  <span className="font-medium text-foreground">3. Espera la confirmacion.</span> Revisaremos la
                  solicitud y te responderemos con el estado del proceso.
                </li>
              </ol>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="destructive" className="flex-1">
                <Link href={mailtoHref}>
                  <Mail className="mr-2 h-4 w-4" />
                  Enviar solicitud por correo
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/">Volver al inicio</Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Si el boton no abre tu aplicacion de correo, envia manualmente tu solicitud a{" "}
              <a className="font-medium text-primary underline" href={`mailto:${supportEmail}`}>
                {supportEmail}
              </a>
              .
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Verificacion y seguridad
            </CardTitle>
            <CardDescription>Como protegemos tu cuenta durante el proceso de eliminacion.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              No eliminamos cuentas a partir de solicitudes anonimas. Si no puedes escribir desde el correo registrado,
              podemos pedir informacion adicional para confirmar la titularidad de la cuenta.
            </p>
            <p>
              Nunca solicitaremos tu contrasena. No envies claves, codigos de verificacion ni informacion financiera
              por correo.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Datos eliminados y retenidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                  <Trash2 className="h-4 w-4" />
                  Datos que se eliminan
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Informacion del perfil, como nombre, foto y telefono.</li>
                  <li>Datos de autenticacion asociados a la cuenta de Ciclo.</li>
                  <li>Preferencias y configuraciones de la aplicacion.</li>
                  <li>Ubicaciones guardadas y datos personales asociados al uso de Ciclo.</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                  <Clock className="h-4 w-4" />
                  Datos que pueden conservarse temporalmente
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Registros necesarios para seguridad, prevencion de fraude o soporte.</li>
                  <li>Informacion que deba conservarse por obligaciones legales, fiscales o regulatorias.</li>
                  <li>Copias de respaldo hasta que roten segun los ciclos operativos del servicio.</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informacion de contacto</CardTitle>
            <CardDescription>Canal oficial para consultas sobre eliminacion de cuenta.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 font-semibold">Aplicacion</h3>
                <p className="text-muted-foreground">Ciclo</p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Soporte</h3>
                <a className="text-primary underline" href={`mailto:${supportEmail}`}>
                  {supportEmail}
                </a>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Tiempo estimado de respuesta</h3>
                <p className="text-muted-foreground">5 a 7 dias habiles</p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Desarrollador</h3>
                <p className="text-muted-foreground">Geovanny Paez</p>
              </div>
            </div>

            <Separator />

            <p className="text-sm text-muted-foreground">
              Ultima actualizacion: 13 de julio de 2026.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
