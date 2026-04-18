import { Role } from "@/core/config/routes";


export type User = {
    id: string;
    email: string;
    isEmailVerified: boolean;
    token: string;
    role: Role; // Para compatibilidad con versión anterior
    roles?: Role[]; // Array de roles para múltiples funcionalidades (opcional)
}

export type UserPublic = {
    id: string;
    email: string;
    role: Role;
    createdAt: string;
    updatedAt: string;
}


export type ResetPasswordDto = {
    email: string;
    password: string;
    code: string;
}
