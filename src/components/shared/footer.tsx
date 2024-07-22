import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-muted p-6 md:py-12 w-full">
            <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
                <div className="grid gap-1">
                    <h3 className="font-semibold text-foreground">Empresa</h3>
                    <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                        Sobre nosotros
                    </Link>
                </div>
                <div className="grid gap-1">
                    <h3 className="font-semibold text-foreground">Servicios</h3>

                    <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                        Precios
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                        Beneficios
                    </Link>
                </div>

                <div className="grid gap-1">
                    <h3 className="font-semibold text-foreground">Legal</h3>
                    <Link href="/legal/privacy_policy" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                        Política de privacidad
                    </Link>
                    <Link href="/legal/terms_conditions" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                        Términos de servicio
                    </Link>
                    {/* <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                        Política de cookies
                    </Link> */}
                </div>
                <div className="grid gap-1">
                    <h3 className="font-semibold text-foreground">Contacto</h3>
                    <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                        Soporte
                    </Link>
                </div>
            </div>
        </footer>
    )
}
