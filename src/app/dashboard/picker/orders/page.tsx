import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import OrdersService from "@/services/server/OrdersService";
import { Check, Info, Map } from "lucide-react";

export default async function  PickerOrdersPage() {
  const {data} = await OrdersService.findAllPickerOrders();
  
  return (
    <div className="container p-0 overflow-hidden">
      <h1 className="text-3xl font-bold mb-6">Pedidos de Reciclaje</h1>
      <div className="w-full overflow-x-auto">
        <table className="w-full ">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                Nombre
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                Reciclaje
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                Dirección
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400">
                Total
              </th>
              <th className="px-4 py-3 text-center font-medium text-gray-500 dark:text-gray-400">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      alt="User Avatar"
                      src="/placeholder-user.jpg"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span>Juan Díaz</span>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500 text-white">Papel</Badge>
                  <Badge className="bg-green-500 text-white">Plástico</Badge>
                </div>
              </td>
              <td className="px-4 py-4">
                <div>Calle 123, Bogotá</div>
              </td>
              <td className="px-4 py-4 text-right">
                <span className="font-bold text-lg">$120.00</span>
              </td>
              <td className="px-4 py-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Button size="icon" variant="outline">
                    <Check className="h-4 w-4" />
                    <span className="sr-only">Aceptar</span>
                  </Button>
                  <Button size="icon" variant="outline">
                    <Map className="h-4 w-4" />
                    <span className="sr-only">Ver Mapa</span>
                  </Button>
                  <Button size="icon" variant="outline">
                    <Info className="h-4 w-4" />
                    <span className="sr-only">Ver Detalles</span>
                  </Button>
                </div>
              </td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      alt="User Avatar"
                      src="/placeholder-user.jpg"
                    />
                    <AvatarFallback>MD</AvatarFallback>
                  </Avatar>
                  <span>María Díaz</span>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500 text-white">Vidrio</Badge>
                  <Badge className="bg-green-500 text-white">Tela</Badge>
                </div>
              </td>
              <td className="px-4 py-4">
                <div>Carrera 456, Medellín</div>
              </td>
              <td className="px-4 py-4 text-right">
                <span className="font-bold text-lg">$89.00</span>
              </td>
              <td className="px-4 py-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Button size="icon" variant="outline">
                    <Check className="h-4 w-4" />
                    <span className="sr-only">Aceptar</span>
                  </Button>
                  <Button size="icon" variant="outline">
                    <Map className="h-4 w-4" />
                    <span className="sr-only">Ver Mapa</span>
                  </Button>
                  <Button size="icon" variant="outline">
                    <Info className="h-4 w-4" />
                    <span className="sr-only">Ver Detalles</span>
                  </Button>
                </div>
              </td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      alt="User Avatar"
                      src="/placeholder-user.jpg"
                    />
                    <AvatarFallback>JR</AvatarFallback>
                  </Avatar>
                  <span>José Rodríguez</span>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500 text-white">Metal</Badge>
                  <Badge className="bg-green-500 text-white">Cartón</Badge>
                </div>
              </td>
              <td className="px-4 py-4">
                <div>Avenida 789, Cali</div>
              </td>
              <td className="px-4 py-4 text-right">
                <span className="font-bold text-lg">$150.00</span>
              </td>
              <td className="px-4 py-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Button size="icon" variant="outline">
                    <Check className="h-4 w-4" />
                    <span className="sr-only">Aceptar</span>
                  </Button>
                  <Button size="icon" variant="outline">
                    <Map className="h-4 w-4" />
                    <span className="sr-only">Ver Mapa</span>
                  </Button>
                  <Button size="icon" variant="outline">
                    <Info className="h-4 w-4" />
                    <span className="sr-only">Ver Detalles</span>
                  </Button>
                </div>
              </td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      alt="User Avatar"
                      src="/placeholder-user.jpg"
                    />
                    <AvatarFallback>LG</AvatarFallback>
                  </Avatar>
                  <span>Laura Gómez</span>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500 text-white">Madera</Badge>
                  <Badge className="bg-green-500 text-white">Cuero</Badge>
                </div>
              </td>
              <td className="px-4 py-4">
                <div>Calle 456, Barranquilla</div>
              </td>
              <td className="px-4 py-4 text-right">
                <span className="font-bold text-lg">$99.00</span>
              </td>
              <td className="px-4 py-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Button size="icon" variant="outline">
                    <Check className="h-4 w-4" />
                    <span className="sr-only">Aceptar</span>
                  </Button>
                  <Button size="icon" variant="outline">
                    <Map className="h-4 w-4" />
                    <span className="sr-only">Ver Mapa</span>
                  </Button>
                  <Button size="icon" variant="outline">
                    <Info className="h-4 w-4" />
                    <span className="sr-only">Ver Detalles</span>
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
