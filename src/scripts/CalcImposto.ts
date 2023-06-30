import { Irrf, NewIrrf } from "@/types/IrrfItem";
import { Nfs } from "@/types/Nfs";

export const calcular = (value: number, alIss: number, TableIrrf: Irrf[]) => {
    const data: Nfs = {
        alIrrf: 0,
        deductionIrrf: 0,
        totalBrute: 0,
        totalIrrf: 0,
        totalIss: 0,
        totolTax: 0,
    };
    if (value) {
        const aliquotaIss = alIss / 100;
        let valorAtual = value;
        let encontrouResultado = false;

        while (!encontrouResultado) {
            const irrf = calcularAliquotaIrrf(
                parseFloat(valorAtual.toFixed(2)),
                TableIrrf,
            );
            const valorIss = valorAtual * aliquotaIss;
            const valorIrrf =
                valorAtual * (irrf.percentage / 100) - irrf.deduction;
            const valorLiquidoFinal = valorAtual - valorIss - valorIrrf;

            if (valorLiquidoFinal >= value) {
                encontrouResultado = true;

                data.totalIss = valorIss;
                data.alIrrf = irrf.percentage;
                data.deductionIrrf = irrf.deduction;
                data.totalIrrf = valorIrrf;
                data.totolTax = valorIss + valorIrrf;
                data.totalBrute = valorAtual;
                return data;
            } else {
                valorAtual += 0.01;
            }
        }
    }
};

const calcularAliquotaIrrf = (
    valor: number,
    TableIrrf: Irrf[],
): Irrf | NewIrrf => {
    for (let i = 0; i < TableIrrf.length; i++) {
        if (
            valor >= TableIrrf[i].initial_limit &&
            valor <= TableIrrf[i].final_limit
        ) {
            return TableIrrf[i];
        }
    }

    return {
        initial_limit: 0,
        final_limit: 0,
        percentage: 0,
        deduction: 0,
    };
};
