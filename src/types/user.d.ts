import { Role } from "@/config/routes";


export type User = {
    id: string;
    email: string;
    isEmailVerified: boolean;
    token: string;
    role: Role;
}
