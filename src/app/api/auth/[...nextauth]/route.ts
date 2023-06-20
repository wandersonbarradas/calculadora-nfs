import Api from "@/libs/api";
import { User } from "@/types/User";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: "credentials",
            credentials: {
                email: { label: "E-email", type: "text" },
                password: { label: "Senha", type: "password" },
            },
            authorize: async (credentials, req) => {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                const user = await Api.getUserFromEmail(credentials.email);
                if (!user) {
                    return null;
                }
                if (user.password !== credentials.password) {
                    return null;
                }

                return {
                    email: user.email,
                    id: user.id.toString(),
                    name: user.name,
                };
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = user;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (token) {
                session.user = token.user as User;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
