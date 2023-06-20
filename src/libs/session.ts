import { NextAuthOptions, Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const checkSession = async (
    authOptions: NextAuthOptions,
): Promise<Session> => {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect(
            "/api/auth/signin?error=SessionRequired&callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fconfiguracoes",
        );
    }
    return session;
};
