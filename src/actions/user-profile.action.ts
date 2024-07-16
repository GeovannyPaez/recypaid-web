
"use server"

import { errorAction, successAction } from "@/errors/ResponseError";
import ProfileService from "@/services/server/ProfileService";
import { CreateUserProfileDto } from "@/types/user-profile";
import { revalidatePath } from "next/cache";

export const CreateUserProfileAction = async (state: any, FormData: FormData) => {
    try {
        const data: CreateUserProfileDto = {
            name: FormData.get('name') as string,
            lastname: FormData.get('lastname') as string,
            city: FormData.get('city') as string,
            address: FormData.get('address') as string,
            phone: FormData.get('phone') as string,
        }
        await ProfileService.create(data);
    } catch (error) {
        const e = error as Error;
        return errorAction(e.message);
    }
    revalidatePath("/dashboard/profile");
    return successAction("Perfil creado correctamente");
}

export const UpdateUserProfileAction = async (_: any, FormData: FormData) => {
    try {
        const data: CreateUserProfileDto = {
            name: FormData.get('name') as string,
            lastname: FormData.get('lastname') as string,
            city: FormData.get('city') as string,
            address: FormData.get('address') as string,
            phone: FormData.get('phone') as string,
        }
        await ProfileService.update(data);
        return successAction("Perfil actualizado correctamente");
    } catch (error) {
        const e = error as Error;
        return errorAction(e.message);
    }
}