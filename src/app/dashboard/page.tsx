import Link from "next/link";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { ArrowRight, Recycle, Trophy, Wallet } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="container px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Dinero Acumulado</CardTitle>
            <Wallet className="h-6 w-6 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">$245.00</div>
            <p className="text-gray-500 dark:text-gray-400">
              El dinero se pagará una vez que los materiales sean recolectados
              desde tu casa.
            </p>
          </CardContent>
          <CardFooter>
            <Link
              className="inline-flex items-center gap-1 text-green-600 hover:underline"
              href="#"
            >
              Ver programa
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Reciclaje Mensual</CardTitle>
            <Recycle className="h-6 w-6 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">$12.00</div>
            <p className="text-gray-500 dark:text-gray-400">
              Dinero ganado este mes por reciclar
            </p>
          </CardContent>
          <CardFooter>
            <Link
              className="inline-flex items-center gap-1 text-green-600 hover:underline"
              href="#"
            >
              Ver historial
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Puntos Acumulados</CardTitle>
            <Trophy className="h-6 w-6 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">1250</div>
            <p className="text-gray-500 dark:text-gray-400">
              Canjea tus puntos por premios
            </p>
          </CardContent>
          <CardFooter>
            <Link
              className="inline-flex items-center gap-1 text-green-600 hover:underline"
              href="#"
            >
              Ver catálogo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardFooter>
        </Card>
      </div>
      <div className="mt-12 md:mt-16">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Últimas Actividades</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Revisa tus últimas acciones en la plataforma
            </p>
          </div>
          <Link
            className="inline-flex items-center gap-1 text-green-600 hover:underline"
            href="#"
          >
            Ver todo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Juan Díaz</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Recicló 15 kg
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Hace 2 días
              </div>
            </CardHeader>
            <CardContent>
              <p>
                Juan recicló 15 kg de residuos y ganó 150 puntos. ¡Buen trabajo!
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>LD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Laura Díaz</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Recicló 20 kg
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Hace 2 días
              </div>
            </CardHeader>
            <CardContent>
              <p>
                Laura recicló 20 kg de residuos y ganó 200 puntos. ¡Excelente
                trabajo!
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>RM</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Raúl Martínez</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Recicló 10 kg
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Hace 1 semana
              </div>
            </CardHeader>
            <CardContent>
              <p>
                Raúl recicló 10 kg de residuos y ganó 100 puntos. ¡Sigue
                reciclando!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
