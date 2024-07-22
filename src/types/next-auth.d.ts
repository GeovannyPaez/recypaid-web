import "next-auth";

declare module "next-auth" {
    // eslint-disable-next-line 
    interface Session {
        user: {
            id: string;
            email: string;
            isEmailVerified: boolean;
            token: string;
            role: Role;
        }
    }
    interface User {
        id: string;
        email: string;
        isEmailVerified: boolean;
        token: string;
        role: Role;
    }
}