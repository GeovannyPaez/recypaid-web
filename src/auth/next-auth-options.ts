import { LoginService } from "@/services/server/AuthService";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const EIGHT_HOURS = 60 * 60 * 8;

const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email", placeholder: "test@test.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // conect here to backend
                if (!credentials?.email || !credentials.password) throw { message: "Invalid Credentials" };
                try {
                    const user = await LoginService(credentials.email, credentials.password);
                    return {
                        email: user.email,
                        id: user.id,
                        role: user.role,
                        token: user.token,
                    };
                } catch (error) {
                    throw error;
                }
            },
        }),

    ],

    session: {
        maxAge: EIGHT_HOURS,
    },
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token as any;
            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
        "signOut": "/auth/logout",
    }
};

export default nextAuthOptions;