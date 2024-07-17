import { Card, CardContent } from '@/components/ui/card'
import { DollarSign, LucideIcon } from 'lucide-react'
import React from 'react'

type InfoCardHomeProps = {
    title: string
    value: string
    Icon: LucideIcon
}

export default function InfoCardHome({ title, value, Icon }: InfoCardHomeProps) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-medium text-foreground">{title}</h3>
                        <p className="text-2xl font-bold text-foreground">{value}</p>
                    </div>
                    <Icon className="h-8 w-8 text-primary" />
                </div>
            </CardContent>
        </Card>

    )
}

// Example usage
<InfoCardHome
    title="Total Earnings"
    value="$1,234.56"
    Icon={DollarSign}
/>
