"use server";
import { RegisterService } from "@/services/server/AuthService";
import { redirect } from "next/navigation";
import { LoginDto } from "@/dtos/auth.dto";
import { errorAction, ResponseError, successAction } from "@/errors/ResponseError";
import { ValidationError } from "yup";
import VerficationCodeService from "@/services/server/VerficationCodeService";
import { sendVerificationCode, verifyCode } from "./forgot-password.actions";

export const RegisterAction = async (_: ActionResponse, formData: FormData): Promise<ActionResponse> => {
    const email = formData.get('email');

    try {
        const password = formData.get('password');
        await LoginDto.validate({ email, password });
        await RegisterService(email as string, password as string);
    } catch (e) {
        if (e instanceof ResponseError) {
            return { error: true, message: e.message };
        }
        if (e instanceof ValidationError)
            return { error: true, message: e.message };
        return { error: true, message: 'Error registering user' };
    }
    redirect('/auth/email-validation?email=' + email);
}
export const verifyEmailCodeAction = async (_: any, formData: FormData): Promise<ActionResponse> => {
    const code = formData.get("code");
    const email = formData.get("email");
    return verifyCode(email as string, code as string);
}
export const sendEmailCodeValidationAction = async (_: any, formData: FormData): Promise<ActionResponse> => {
    const email = formData.get("email");
    return sendVerificationCode(email as string);
}
