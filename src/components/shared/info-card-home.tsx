import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type InfoCardHomeProps = {
    title: string
    value: string
    Icon: LucideIcon
    link?: string
}

export default function InfoCardHome({ title, value, Icon, link }: InfoCardHomeProps) {
    const CardContentInner = (
        <CardContent className={cn(link && "cursor-pointer ", "p-6  hover:bg-muted transition-colors duration-200 border rounded border-primary")}>
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-medium text-foreground">{title}</h3>
                    <p className="text-2xl font-bold text-foreground">{value}</p>
                </div>
                <Icon className="h-8 w-8 text-primary" />
            </div>
        </CardContent>
    )
    if (link) {
        return (
            <Link href={link} passHref legacyBehavior>
                <Card>{CardContentInner}</Card>
            </Link>
        )
    }
    return <Card>{CardContentInner}</Card>
}