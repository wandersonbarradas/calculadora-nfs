import Header from "@/components/header";
import ".././globals.css";
import { Roboto } from "next/font/google";
import { SessionProviderComponent } from "@/components/sessionProvider";

const roboto = Roboto({
    subsets: ["latin"],
    weight: "400",
});

export const metadata = {
    title: "Configurações",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR">
            <body
                suppressHydrationWarning={true}
                className={[
                    roboto.className,
                    "bg-gray-100 text-black dark:bg-gray-950 dark:text-white",
                ].join(" ")}
            >
                <SessionProviderComponent>
                    <>
                        <Header />
                        <main className="container mx-auto px-4">
                            {children}
                        </main>
                    </>
                </SessionProviderComponent>
            </body>
        </html>
    );
}
