import { NextAuthOptions, Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const checkSession = async (
    authOptions: NextAuthOptions,
): Promise<Session> => {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect(
            "/api/auth/signin?error=SessionRequired&callbackUrl=https://calculadora-nfs.vercel.app/configuracoes",
        );
    }
    return session;
};
