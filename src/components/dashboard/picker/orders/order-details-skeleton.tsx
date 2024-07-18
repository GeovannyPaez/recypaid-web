import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { CalendarIcon, ClipboardCheck, Map, Phone, UserIcon } from "lucide-react"

const OrderDetailsSkeleton = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Solicitud de reciclaje</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                        <UserIcon className="h-5 w-5 text-muted-foreground" />
                        <Skeleton className="h-4 w-40" />
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5 text-muted-foreground" />
                    <Skeleton className="h-6 w-20" />
                </div>
                <div className="flex items-center gap-2">
                    <Map className="h-5 w-5 text-muted-foreground" />
                    <Skeleton className="h-4 w-48" />
                </div>
                <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <Skeleton className="h-4 w-32" />
                </div>

                <Separator />
                <div className="grid gap-2">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-center justify-between">
                            <Skeleton className="h-4 w-32" />
                            <div className="flex items-center gap-1">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-16" />
                            </div>
                        </div>
                    ))}
                </div>
                <Separator />
                <div className="flex items-center justify-between font-medium">
                    <span>Total</span>
                    <Skeleton className="h-6 w-20" />
                </div>
            </CardContent>
            <CardFooter className="flex justify-between flex-wrap gap-2">
                <Skeleton className="h-10 w-32" />
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-24" />
                    <Skeleton className="h-9 w-24" />
                </div>
            </CardFooter>
        </Card>
    )
}

export default OrderDetailsSkeleton;