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
                    <Logo /></Link>
                <h1>
                    RecyPaid
                </h1>
            </header>
            <Separator />
            {children}
        </>
    )
}
