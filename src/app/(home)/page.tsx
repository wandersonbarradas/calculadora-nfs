import { Calculator } from "@/components/Calculator";
import Api from "@/libs/api";

export default async function Home() {
    const data = await Api.getIrrfTable();
    console.log("🚀 ~ file: page.tsx:6 ~ Home ~ data:", data);
    return (
        <>
            <div className="mt-8">
                <h1 className="text-2xl">Calculo de imposto</h1>
                <Calculator dataIrrf={data} />
            </div>
        </>
    );
}
