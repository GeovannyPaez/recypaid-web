import Logo from '@/components/logo'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import React from 'react'

type LayaoutAuthProps = {
    children: React.ReactNode
}
export default function LayaoutAuth({ children }: LayaoutAuthProps) {
    return (
        <>
            <header
                className=' ms-4 flex gap-2 items-center h-16'
            >
                <Link
                    href={"/"}
                >
                    <Logo width={45} height={45} /></Link>
                <h1>
                    Recypaid
                </h1>
            </header>
            <Separator />
            {children}
        </>
    )
}
