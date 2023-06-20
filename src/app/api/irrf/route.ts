import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Api from "@/libs/api";
import { Irrf, NewIrrf } from "@/types/IrrfItem";
import { checkSession } from "@/libs/session";

export async function GET() {
    await checkSession(authOptions);
    const irrfTable = await Api.getIrrfTable().catch((error) => {
        const body = JSON.stringify({ error: error });
        return new Response(body, {
            status: 500,
        });
    });

    return NextResponse.json({ irrfTable: irrfTable });
}

export async function POST(request: Request) {
    const session = await checkSession(authOptions);
    const res: NewIrrf = await request.json();
    const newIrrfTable = await Api.addIrrfTable(res, session.user.id).catch(
        (error) => {
            const body = JSON.stringify({ error: error });
            return new Response(body, {
                status: 500,
            });
        },
    );
    if (!newIrrfTable) {
        const body = JSON.stringify({
            error: "O servidor encontrou um erro interno e não pôde atender à requisição.",
        });
        return new Response(body, {
            status: 500,
        });
    }
    return NextResponse.json({ response: newIrrfTable });
}

export async function PUT(request: Request) {
    await checkSession(authOptions);
    const res: Irrf = await request.json();
    const updateIrrfTable = await Api.updateIrrfTable(res.id, res).catch(
        (error) => {
            const body = JSON.stringify({ error: error });
            return new Response(body, {
                status: 500,
            });
        },
    );
    if (!updateIrrfTable) {
        const body = JSON.stringify({
            error: "O servidor encontrou um erro interno e não pôde atender à requisição.",
        });
        return new Response(body, {
            status: 500,
        });
    }
    return NextResponse.json({ response: updateIrrfTable });
}
