'use server'

import { errorAction, successAction } from '@/errors/ResponseError';
import { ResetPassWordService } from '@/services/server/AuthService';
import VerficationCodeService from '@/services/server/VerficationCodeService';
import { z } from 'zod';

const emailSchema = z.string().email();
const codeSchema = z.string().length(5);
const passwordSchema = z.string().min(6);


export async function sendVerificationCode(email: string): Promise<ActionResponse> {
    try {
        const parsedEmail = emailSchema.safeParse(email);
        if (parsedEmail.error) {
            return errorAction('email invalido');
        }
        await VerficationCodeService.sendCodeToEmail(email);

        return successAction('Email enviado correctamente');
    } catch (error) {
        const e = error as Error;
        return errorAction(e.message);

    }
}

export async function verifyCode(email: string, code: string): Promise<ActionResponse> {
    try {
        const parsedEmail = emailSchema.safeParse(email);
        const parsedCode = codeSchema.safeParse(code);

        const isVerified = await VerficationCodeService.verifyCode(email, code);
        if (parsedEmail.error || parsedCode.error || !isVerified) {
            return errorAction('Codigo incorrecto');
        }
        return successAction('Email verificado correctamente');
    } catch (error) {
        const e = error as Error;
        return errorAction(e.message);
    }
}

export async function resetPassword(email: string, code: string, newPassword: string): Promise<ActionResponse> {
    try {
        const parsedEmail = emailSchema.safeParse(email);
        const parsedCode = codeSchema.safeParse(code);
        const parsedPassword = passwordSchema.safeParse(newPassword);

        if (parsedEmail.error || parsedCode.error || parsedPassword.error) {
            return errorAction('Datos incorrectos');
        }
        await ResetPassWordService({ email, code, password: newPassword });
        return successAction('Contraseña actualizada correctamente');
    } catch (error) {
        const e = error as Error;
        return errorAction(e.message);
    }
}