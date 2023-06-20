import Api from "@/libs/api";
import Configuracoes from "./configuracoes";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Pagina = async () => {
    const session = await getServerSession(authOptions);
    if (session) {
        const data = await Api.getIrrfTable();
        return <Configuracoes irrfTable={data} />;
    } else {
        return redirect(
            "/api/auth/signin?error=SessionRequired&callbackUrl=https://calculadora-nfs.vercel.app/configuracoes",
        );
    }
};

export default Pagina;
