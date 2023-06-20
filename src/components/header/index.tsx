"use client";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
export default function Header() {
    const { data: session } = useSession();
    const pathname = usePathname();

    return (
        <header>
            <nav
                className="container mx-auto flex w-full items-center justify-between px-4 py-6 lg:py-8"
                aria-label="Global"
            >
                <div className="flex">
                    <a href="/" className="-m-1.5 p-1.5">
                        <Image
                            className=""
                            src="/images/logo.png"
                            alt="Logo do site"
                            width={42}
                            height={42}
                        />
                    </a>
                </div>
                <nav className="flex justify-between items-center gap-6">
                    <Link
                        href="/"
                        className={[
                            "text-md font-medium leading-6 transition-all hover:text-red-400",
                            pathname === "/"
                                ? "text-red-400"
                                : "text-black dark:text-white",
                        ].join(" ")}
                    >
                        Inicio
                    </Link>
                    <Link
                        href="/configuracoes"
                        className={[
                            "text-md font-medium leading-6 transition-all hover:text-red-400",
                            pathname.startsWith("/configuracoes")
                                ? "text-red-400"
                                : "text-black dark:text-white",
                        ].join(" ")}
                    >
                        Configurações
                    </Link>
                </nav>

                <div className="flex justify-end">
                    {session !== undefined && (
                        <>
                            {!session && (
                                <button
                                    className="text-md font-medium leading-6 transition-all hover:text-red-400"
                                    onClick={() => signIn("credentials")}
                                >
                                    Entrar
                                    <span aria-hidden="true">&rarr;</span>
                                </button>
                            )}
                            {session && (
                                <button
                                    className="text-md font-medium leading-6 transition-all hover:text-red-400"
                                    onClick={() => signOut()}
                                >
                                    Sair <span aria-hidden="true">&rarr;</span>
                                </button>
                            )}
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
