import Header from "@/components/header";
import ".././globals.css";
import { Poppins } from "next/font/google";
import { SessionProviderComponent } from "@/components/sessionProvider";
const poppins = Poppins({
    subsets: ["latin"],
    weight: "400",
});

export const metadata = {
    title: "Calculadora",
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
                    poppins.className,
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
