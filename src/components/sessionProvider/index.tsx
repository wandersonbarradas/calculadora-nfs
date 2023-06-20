"use client";
import { SessionProvider } from "next-auth/react";

export type Props = {
    children: React.ReactNode;
};

export const SessionProviderComponent = ({ children }: Props) => {
    return <SessionProvider>{children}</SessionProvider>;
};
