"use client"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ButtonServerAction from "@/components/ui/button-server-action";
import { CreateUserProfileDto } from "@/types/user-profile";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import useToastActionResponse from "@/hooks/useToastActionResponse";

type ProfileFormProps = {
    action: (state:any, formData:FormData) => Promise<ActionResponse>;
    labelButton: string;
    userProfile?: CreateUserProfileDto
}
export default function ProfileForm({action, labelButton, userProfile}:ProfileFormProps) {
    const [state,formAction] = useFormState(action,{
        error:false,
        message:''
    })
    const {toastActionResponse}= useToastActionResponse()
    useEffect(() => {
        if(state.message){
            toastActionResponse(state)
        }  
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])
  return (
    <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input required name="name" id="name" placeholder="Ingresa tu nombre"
            defaultValue={userProfile?.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastname">Apellido</Label>
            <Input required name="lastname" id="lastname" defaultValue={userProfile?.lastname} placeholder="Ingresa tu apellido" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">Ciudad</Label>
          <Input required  name="city" id="city" placeholder="Ingresa tu ciudad" defaultValue={userProfile?.city} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Dirección</Label>
          <Textarea
            className="min-h-[100px]"
            id="address"
            name="address"
            minLength={10}
            required
            defaultValue={userProfile?.address}
            placeholder="Ingresa tu dirección (mínimo 10 caracteres)"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            name="phone"
            required
            pattern="[0-9]*"
            defaultValue={userProfile?.phone}
            placeholder="Ingresa tu número de teléfono"
            type="tel"
          />
        </div>
        <ButtonServerAction className="w-full">{labelButton}</ButtonServerAction>
      </form>
  )
}
