import { LoginService, ValidateOauthGoogleToken } from "@/services/server/AuthService";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { API_URL } from "@/config";

const EIGHT_HOURS = 60 * 60 * 8;

const nextAuthOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "test@test.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error("Invalid Credentials");
                }
                try {
                    const user = await LoginService(credentials.email, credentials.password);
                    return {
                        email: user.email,
                        id: user.id,
                        role: user.role,
                        token: user.token,
                        isEmailVerified: user.isEmailVerified
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
            if (user) {
                token = { ...token, ...user };
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token as any;
            return session;
        },
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                try {
                    const userDb = await ValidateOauthGoogleToken(account?.id_token as string)
                    user.email = userDb.email;
                    user.id = userDb.id;
                    user.role = userDb.role;
                    user.token = userDb.token;
                    user.isEmailVerified = userDb.isEmailVerified;
                    return true;
                } catch (error) {
                    return false;
                }
            }
            if (account?.provider === "credentials") {
                return !!user;
            }
            return false;
        },
        // redirect: async ({ url, baseUrl }) => {
        //     return url.startsWith(baseUrl) ? url : baseUrl + "/dashboard";
        // }
    },
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/logout",
    },
};

export default nextAuthOptions;
