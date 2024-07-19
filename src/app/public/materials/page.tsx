import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MaterialesService from '@/services/server/MaterilasService';
import { Material } from '@/types/materilas';
import AnimatedSection from '@/components/shared/animated-section';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Materiales Reciclables | Recypaid',
    description: 'Conoce los materiales reciclables que puedes vender y reciclar con nosotros. Descubre precios, disponibilidad y más.',
    keywords: 'reciclaje, materiales reciclables, reciclaje de materiales, precios de reciclaje, disponibilidad de materiales',
    authors: [{
        name: 'RecyPaid',
    }],
};

export default async function MaterialesReciclables() {
    const materials: Material[] = await MaterialesService.getAllMaterials();

    return (
        <div className="container mx-auto py-8 ">
            <h1 className="text-3xl font-bold mb-6 text-center">Materiales Reciclables</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {materials.map((material) => (
                    <AnimatedSection key={material.id}>
                        <Card key={material.id} className="overflow-hidden border-primary shadow-lg">
                            <CardHeader className="bg-white">
                                <CardTitle className='text-primary'>{material.name}</CardTitle>
                                <CardDescription className='text-muted-foreground'>{material.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-4 bg-muted dark:bg-background">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold">
                                        Precio: ${material.price} / {material.priceBy === 'UNIT' ? 'Unidad' : 'Kilo'}
                                    </span>
                                    <Badge variant={material.isAvailable ? "default" : "destructive"}>
                                        {material.isAvailable ? "Disponible" : "No disponible"}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Actualizado: {new Date(material.updatedAt).toLocaleDateString()}
                                </p>
                            </CardContent>
                        </Card>
                    </AnimatedSection>
                ))}
            </div>
        </div>
    );
}
