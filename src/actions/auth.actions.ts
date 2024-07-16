"use server";
import { RegisterService } from "@/services/server/AuthService";
import { redirect } from "next/navigation";
import { LoginDto } from "@/dtos/auth.dto";
import { ResponseError } from "@/errors/ResponseError";
import { ValidationError } from "yup";

export const RegisterAction = async (_: ActionResponse, formData: FormData): Promise<ActionResponse> => {
    try {
        const email = formData.get('email');
        const password = formData.get('password');
        await LoginDto.validate({ email, password });
        await RegisterService(email as string, password as string);
    } catch (e) {
        console.log(e);
        if (e instanceof ResponseError) {
            return { error: true, message: e.message };
        }
        if (e instanceof ValidationError)
            return { error: true, message: e.message };
        return { error: true, message: 'Error registering user' };
    }
    redirect('/auth/login');

}