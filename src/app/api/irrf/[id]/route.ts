// import { authOptions } from "../..//auth/[...nextauth]/route";
// import Api from "@/libs/api";
// import { checkSession } from "@/libs/session";

// export async function DELETE(
//     request: Request,
//     { params }: { params: { id: string } },
// ) {
//     checkSession(authOptions);
//     const id = params.id;
//     if (!id) {
//         const body = JSON.stringify({ error: "Objeto não encontrado!" });
//         return new Response(body, {
//             status: 404,
//         });
//     }
//     await Api.deleteIrrfTable(parseInt(id)).catch((error) => {
//         const body = JSON.stringify({ error: error });
//         return new Response(body, {
//             status: 500,
//         });
//     });
//     const body = JSON.stringify({ response: "Objeto deletado com sucesso!" });
//     return new Response(body, {
//         status: 200,
//     });
// }
