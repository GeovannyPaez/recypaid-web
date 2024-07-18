import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { DollarSign, Recycle, Clock, XCircle, ClipboardList, CheckCircle, User, Car, LucideIcon } from 'lucide-react'

type SkeletonCardHomeProps = {
    Icon: LucideIcon
}

const SkeletonCardHome = ({ Icon }: SkeletonCardHomeProps) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-[100px]" />
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <Skeleton className="h-8 w-[80px]" />
        </CardContent>
    </Card>
)

export default function UserBasicStatisticsSkeleton({ role = 'USER' }) {
    const isUser = role === 'USER'

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isUser ? (
                <>
                    <SkeletonCardHome Icon={DollarSign} />
                    <SkeletonCardHome Icon={Recycle} />
                    <SkeletonCardHome Icon={Clock} />
                    <SkeletonCardHome Icon={XCircle} />
                </>
            ) : (
                <>
                    <SkeletonCardHome Icon={User} />
                    <SkeletonCardHome Icon={DollarSign} />
                    <SkeletonCardHome Icon={Recycle} />
                    <SkeletonCardHome Icon={ClipboardList} />
                    <SkeletonCardHome Icon={CheckCircle} />
                </>
            )}
        </div>
    )
}