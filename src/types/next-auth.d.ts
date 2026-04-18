import "next-auth";
import { Role } from "@/core/config/routes";

declare module "next-auth" {
    // eslint-disable-next-line
    interface Session {
        user: {
            id: string;
            email: string;
            isEmailVerified: boolean;
            token: string;
            role: Role; // Para compatibilidad con versión anterior
            roles?: Role[]; // Array de roles para múltiples funcionalidades (opcional)
        }
    }
    interface User {
        id: string;
        email: string;
        isEmailVerified: boolean;
        token: string;
        role: Role; // Para compatibilidad con versión anterior
        roles?: Role[]; // Array de roles para múltiples funcionalidades (opcional)
    }
}
