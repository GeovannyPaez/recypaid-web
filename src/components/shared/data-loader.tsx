import { Suspense } from 'react'
import { AlertCircle } from 'lucide-react'
import { ServiceResponse } from '@/core/service/service-response'

// Importar tipos de ServiceResponse

// Tipos genéricos para el loader
type ServiceMethod<T, P = string> = (params: P) => Promise<ServiceResponse<T>>

interface DataLoaderProps<T, P = string> {
  service: ServiceMethod<T, P>
  params: P
  children: (data: T) => React.ReactNode
  fallback?: React.ReactNode
  errorComponent?: React.ComponentType<{ error: string }>
  notFoundComponent?: React.ComponentType
}

// Componente de error por defecto
function DefaultErrorComponent({ error }: { error: string }) {
  return (
    <div className="flex items-center justify-center p-8 text-center">
      <div className="flex flex-col items-center space-y-3">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <div>
          <h3 className="text-lg font-semibold text-destructive">Error al cargar datos</h3>
          <p className="text-sm text-muted-foreground mt-1">{error}</p>
        </div>
      </div>
    </div>
  )
}

// Componente de "no encontrado" por defecto
function DefaultNotFoundComponent() {
  return (
    <div className="flex items-center justify-center p-8 text-center">
      <div className="flex flex-col items-center space-y-3">
        <AlertCircle className="h-12 w-12 text-muted-foreground" />
        <div>
          <h3 className="text-lg font-semibold">No encontrado</h3>
          <p className="text-sm text-muted-foreground mt-1">
            No se pudo encontrar la información solicitada
          </p>
        </div>
      </div>
    </div>
  )
}

function DefaultSkeleton() {
  return (
    <div className="space-y-4 p-6">
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-1/4 animate-pulse"></div>
        <div className="h-8 bg-muted rounded w-3/4 animate-pulse"></div>
      </div>
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 bg-muted rounded w-1/3 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 pt-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 bg-muted rounded animate-pulse"></div>
        ))}
      </div>
    </div>
  )
}

// Componente interno que maneja la carga de datos
async function DataFetcher<T, P = string>({
  service,
  params,
  children,
  errorComponent: ErrorComponent = DefaultErrorComponent,
  notFoundComponent: NotFoundComponent = DefaultNotFoundComponent,
}: Omit<DataLoaderProps<T, P>, 'fallback'>) {
  try {
    const response = await service(params)
    // Si hay un error en la respuesta del servicio
    if (response.error) {
      return <ErrorComponent error={response.error.message || 'Error en el servicio'} />
    }
    
    // Si no hay datos
    if (!response.data) {
      return <NotFoundComponent />
    }

    return <>{children(response.data)}</>
  } catch (error) {
    // Error de red o excepción no controlada
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    return <ErrorComponent error={errorMessage} />
  }
}

// Componente principal con Suspense
export default function DataLoader<T, P = string>({
  service,
  params,
  children,
  fallback = <DefaultSkeleton />,
  errorComponent,
  notFoundComponent,
}: DataLoaderProps<T, P>) {
  return (
    <Suspense fallback={fallback}>
      <DataFetcher
        service={service}
        params={params}
        errorComponent={errorComponent}
        notFoundComponent={notFoundComponent}
      >
        {children}
      </DataFetcher>
    </Suspense>
  )
}

// Hook personalizado para usar con el patrón (opcional)
export function useDataLoader<T, P = string>(
  service: ServiceMethod<T, P>,
  params: P
) {
  return {
    service,
    params,
    render: (children: (data: T) => React.ReactNode) => children,
  }
}

// Componente HOC alternativo para casos más complejos
export function withDataLoader<T, P = string>(
  service: ServiceMethod<T, P>,
  options?: {
    fallback?: React.ReactNode
    errorComponent?: React.ComponentType<{ error: string }>
    notFoundComponent?: React.ComponentType
  }
) {
  return function WrappedComponent(
    Component: React.ComponentType<{ data: T; [key: string]: any }>
  ) {
    return function DataLoaderWrapper(props: { params: P; [key: string]: any }) {
      const { params, ...componentProps } = props
      
      return (
        <DataLoader
          service={service}
          params={params}
          fallback={options?.fallback}
          errorComponent={options?.errorComponent}
          notFoundComponent={options?.notFoundComponent}
        >
          {(data) => <Component data={data} {...componentProps} />}
        </DataLoader>
      )
    }
  }
}

// Ejemplo de uso del componente refactorizado
/*
// Antes:
export default async function ClientePage(props: PageProps<PaginationSearchParamsPage>) {
  const params = await props?.params 
  const response = await ClienteService.getServerInstance().consultar(params?.id || '');
  if (response.error) {
    return <div>Error: {response.error.message}</div>
  }
  if (!response.data) {
    return <div>No se encontro ningun cliente</div>
  }
  return (
    <BackButtonLayout title='Cliente'>
      <VisualizacionCliente datosCliente={{...}} datosEntrega={[...]} />
    </BackButtonLayout>
  )
}

// Después:
export default async function ClientePage(props: PageProps<PaginationSearchParamsPage>) {
  const params = await props?.params 
  
  return (
    <BackButtonLayout title='Cliente'>
      <DataLoader
        service={ClienteService.getServerInstance().consultar}
        params={params?.id || ''}
      >
        {(data) => (
          <VisualizacionCliente 
            datosCliente={{
              nombre: data.nombre,
              documento: data.documento,
              direccion: data.direccion,
              contactoPrincipal: data.contactoPrincipal,
              contactoPagos: data.contactoPagos,
              telefono: data.telefono,
              telefonoPagos: data.telefonoPagos,
              email: data.email,
              tipoDocumento: data.tipoDocumento,
              idMunicipio: data.idMunicipio,
              zone: data.zonaBarrio,
              municipio: data.municipio?.nombre
            }}
            datosEntrega={
              data.lugaresEntrega?.map((lugar) => ({
                nombre: lugar.nombre,
                ciudad: lugar.ciudad?.nombre,
                direccion: lugar.direccion,
                contacto: lugar.contacto,
                telefonoEntregas: lugar.telefonoEntregas
              })) || []
            }
          />
        )}
      </DataLoader>
    </BackButtonLayout>
  )
}

// O usando el HOC:
const ClientePageWithData = withDataLoader(
  ClienteService.getServerInstance().consultar,
  { fallback: <CustomSkeleton /> }
)(({ data }) => (
  <VisualizacionCliente 
    datosCliente={{
      nombre: data.nombre,
      documento: data.documento,
      direccion: data.direccion,
      contactoPrincipal: data.contactoPrincipal,
      contactoPagos: data.contactoPagos,
      telefono: data.telefono,
      telefonoPagos: data.telefonoPagos,
      email: data.email,
      tipoDocumento: data.tipoDocumento,
      idMunicipio: data.idMunicipio,
      zone: data.zonaBarrio,
      municipio: data.municipio?.nombre
    }}
    datosEntrega={
      data.lugaresEntrega?.map((lugar) => ({
        nombre: lugar.nombre,
        ciudad: lugar.ciudad?.nombre,
        direccion: lugar.direccion,
        contacto: lugar.contacto,
        telefonoEntregas: lugar.telefonoEntregas
      })) || []
    }
  />
))

export default async function ClientePage(props: PageProps<PaginationSearchParamsPage>) {
  const params = await props?.params 
  
  return (
    <BackButtonLayout title='Cliente'>
      <ClientePageWithData params={params?.id || ''} />
    </BackButtonLayout>
  )
}
*/