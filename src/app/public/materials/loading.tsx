import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonCard = () => (
    <Card className="overflow-hidden">
        <CardHeader className="">
            <CardTitle>
                <Skeleton className="h-6 w-32 mb-2" />
            </CardTitle>
            <CardDescription>
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-3/4" />
            </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
            <div className="flex justify-between items-center mb-2">
                <Skeleton className="h-4 w-24" />
                <Badge>
                    <Skeleton className="h-4 w-16" />
                </Badge>
            </div>
            <Skeleton className="h-4 w-32" />
        </CardContent>
    </Card>
);

const SkeletonGrid = () => (
    <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-primary-foreground text-center">Materiales Reciclables</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    </div>

);

export default SkeletonGrid;
