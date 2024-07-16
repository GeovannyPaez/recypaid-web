
export enum Role {
    ADMIM,
    USER,
    PICKER
}

export type User = {
    id: string;
    email: string;
    isEmailVerified: boolean;
    token: string;
    role: Role;
}
