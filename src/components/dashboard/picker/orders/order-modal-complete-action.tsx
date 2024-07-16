"use client";

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { OrderItem } from '@/types/orders'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Material } from '@/types/materilas';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from 'lucide-react'

type OrderModalCompleteActionProps = {
  orderItems: OrderItem[]
  allMaterials: Material[]
}

export default function OrderModalCompleteAction({ orderItems, allMaterials }: OrderModalCompleteActionProps) {
  const [open, setOpen] = useState(false)
  const [additionalMaterials, setAdditionalMaterials] = useState<{id: string, name: string, quantity: number}[]>([])

  // Create a dynamic schema based on orderItems and additionalMaterials
  const formSchema = yup.object().shape({
    ...orderItems.reduce((acc, item) => ({
      ...acc,
      [item.id]: yup.number().min(0, "La cantidad no puede ser negativa").required("Este campo es requerido"),
    }), {}),
    ...additionalMaterials.reduce((acc, item, index) => ({
      ...acc,
      [`additional_${index}`]: yup.number().min(0, "La cantidad no puede ser negativa").required("Este campo es requerido"),
    }), {}),
  })

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      ...orderItems.reduce((acc, item) => ({
        ...acc,
        [item.id]: item.quantity,
      }), {}),
      ...additionalMaterials.reduce((acc, item, index) => ({
        ...acc,
        [`additional_${index}`]: item.quantity,
      }), {}),
    },
  })

  function onSubmit(values: any) {
    const updatedOrderItems = orderItems.map(item => ({
      ...item,
      quantity: values[item.id]
    }))
    const newMaterials = additionalMaterials.map((item, index) => ({
      id: item.id,
      name: item.name,
      quantity: values[`additional_${index}`]
    }))
    console.log('Updated order items:', updatedOrderItems)
    console.log('New materials:', newMaterials)
    setOpen(false)
  }

  const addNewMaterial = () => {
    setAdditionalMaterials([...additionalMaterials, { id: '', name: '', quantity: 0 }])
  }

  const removeMaterial = (index: number) => {
    const newAdditionalMaterials = [...additionalMaterials]
    newAdditionalMaterials.splice(index, 1)
    setAdditionalMaterials(newAdditionalMaterials)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Completar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmar cantidades</DialogTitle>
          <DialogDescription>
            Por favor, verifique y ajuste las cantidades si es necesario.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            {orderItems.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name={item.id as never}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{item.recyclableMaterial.name}</FormLabel>
                    <FormControl>
                      <Input type="number"  {...field} onChange={(e) => field.onChange(e.target.value)} />
                    </FormControl>
                    <FormDescription>
                      Cantidad en {item.recyclableMaterial.priceBy}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            {additionalMaterials.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <FormLabel>{item.name || 'Nuevo material'}</FormLabel>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeMaterial(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Select 
                    onValueChange={(value) => {
                      const newAdditionalMaterials = [...additionalMaterials]
                      const selectedMaterial = allMaterials.find(m => m.id === value)
                      newAdditionalMaterials[index] = { 
                        id: value, 
                        name: selectedMaterial ? `${selectedMaterial.name} [${selectedMaterial.priceBy}]` : '', 
                        quantity: 0 
                      }
                      setAdditionalMaterials(newAdditionalMaterials)
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Seleccionar material" />
                    </SelectTrigger>
                    <SelectContent>
                      {allMaterials.map((material) => (
                        <SelectItem key={material.id} value={material.id}>{material.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormField
                    control={form.control}
                    name={`additional_${index}` as never}
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(e.target.value)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
            <Button type="button" onClick={addNewMaterial}>Añadir nuevo material</Button>
            <DialogFooter>
              <Button type="submit">Confirmar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}