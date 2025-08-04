import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Trash2, Shield, Clock, Database, Mail, Phone, User, AlertTriangle } from "lucide-react"

export default function Component() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Eliminación de Cuenta - Ciclo</h1>
          <p className="text-muted-foreground">Desarrollado por Geovanny Paez</p>
          <Badge variant="secondary" className="mt-2">
            Aplicación de Reciclaje
          </Badge>
        </div>

        {/* Métodos de Autenticación Soportados */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Métodos de Creación de Cuentas Soportados
            </CardTitle>
            <CardDescription>
              Ciclo admite los siguientes métodos para crear y autenticar cuentas de usuario:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Nombre de usuario y contraseña</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Correo electrónico y contraseña</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Número de teléfono y verificación</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">OAuth (Google, Facebook)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Proceso de Eliminación */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              Solicitud de Eliminación de Cuenta
            </CardTitle>
            <CardDescription>
              Sigue estos pasos para solicitar la eliminación de tu cuenta y datos asociados en Ciclo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Completa el formulario de solicitud</h3>
                  <p className="text-gray-600">
                    Proporciona la información requerida en el formulario a continuación para verificar tu identidad.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Verificación de identidad</h3>
                  <p className="text-gray-600">
                    Nuestro equipo verificará tu solicitud y confirmará tu identidad para procesar la eliminación de
                    forma segura.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Procesamiento de la eliminación</h3>
                  <p className="text-gray-600">
                    Una vez verificada, procederemos a eliminar tu cuenta y los datos asociados según nuestra política
                    de retención.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Información sobre Datos */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Información sobre Datos y Retención
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  Datos que se eliminan inmediatamente:
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Información personal del perfil (nombre, foto, biografía)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Historial de actividades de reciclaje
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Puntos y recompensas acumuladas
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Preferencias y configuraciones de la aplicación
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Datos de ubicación y rutas de reciclaje
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Datos conservados temporalmente:
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    Registros de transacciones (30 días) - Por requisitos legales
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    Logs de seguridad (90 días) - Para prevenir fraudes
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    Datos de facturación (7 años) - Por obligaciones fiscales
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    Reportes de problemas técnicos (1 año) - Para mejoras del servicio
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formulario de Solicitud */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Formulario de Solicitud de Eliminación</CardTitle>
            <CardDescription>Completa todos los campos requeridos para procesar tu solicitud</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Importante:</strong> Esta acción es irreversible. Una vez eliminada tu cuenta, no podrás
                recuperar tus datos, puntos de reciclaje o historial de actividades.
              </AlertDescription>
            </Alert>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nombre completo *</Label>
                  <Input id="fullName" placeholder="Tu nombre completo" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico *</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Nombre de usuario en Ciclo *</Label>
                  <Input id="username" placeholder="Tu nombre de usuario" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Número de teléfono</Label>
                  <Input id="phone" type="tel" placeholder="+1234567890" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Motivo de la eliminación *</Label>
                <Textarea
                  id="reason"
                  placeholder="Por favor, explica brevemente por qué deseas eliminar tu cuenta"
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Información adicional</Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Cualquier información adicional que consideres relevante"
                  className="min-h-[80px]"
                />
              </div>

              <Separator />

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button type="submit" className="flex-1" variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Solicitar Eliminación de Cuenta
                </Button>
                <Button type="button" variant="outline" className="flex-1 bg-transparent">
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Información de Contacto */}
        <Card>
          <CardHeader>
            <CardTitle>Información de Contacto</CardTitle>
            <CardDescription>Si tienes preguntas sobre el proceso de eliminación de cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Desarrollador</h3>
                <p className="text-muted-foreground">Geovanny Paez</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Aplicación</h3>
                <p className="text-muted-foreground">Ciclo - Aplicación de Reciclaje</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Soporte</h3>
                <p className="text-muted-foreground">soporte@cicloapp.com</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Tiempo de respuesta</h3>
                <p className="text-muted-foreground">5-7 días hábiles</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Esta página cumple con los requisitos de Google Play Store para la eliminación de cuentas de usuario.</p>
          <p className="mt-1">Última actualización: {new Date().toLocaleDateString("es-ES")}</p>
        </div>
      </div>
    </div>
  )
}
