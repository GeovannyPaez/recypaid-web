
"use server"

import ProfileService from "@/services/server/ProfileService";
import { CreateUserProfileDto } from "@/types/user-profile";
import { revalidatePath } from "next/cache";

export const CreateUserProfileAction = async (FormData: FormData) => {
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
        console.log(error);
    }
    revalidatePath("/dashboard/profile");
}

export const UpdateUserProfileAction = async (FormData: FormData) => {
    try {
        const data: CreateUserProfileDto = {
            name: FormData.get('name') as string,
            lastname: FormData.get('lastname') as string,
            city: FormData.get('city') as string,
            address: FormData.get('address') as string,
            phone: FormData.get('phone') as string,
        }
        await ProfileService.update(data);

    } catch (error) {
        console.log(error);
    }
}