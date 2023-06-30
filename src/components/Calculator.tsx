"use client";
import { useEffect, useState } from "react";
import { InputGroup } from "./inputGroup";
import { Nfs } from "@/types/Nfs";
import { calcular } from "@/scripts/CalcImposto";
import { Irrf } from "@/types/IrrfItem";

type Props = {
    dataIrrf: Irrf[];
};

export const Calculator = ({ dataIrrf }: Props) => {
    const [value, setValue] = useState("");
    const [alIss, setAlIss] = useState("3");
    const [data, setData] = useState<Nfs>({
        alIrrf: 0,
        deductionIrrf: 0,
        totalBrute: 0,
        totalIrrf: 0,
        totalIss: 0,
        totolTax: 0,
    });
    const [ver, setVer] = useState(false);
    const [valueError, setValueError] = useState(false);
    const [alIssError, setAlIssError] = useState(false);

    useEffect(() => {
        if (ver) {
            handleCalc();
        }
        setVer(true);
    }, [value, alIss]);

    const handleCalc = () => {
        setValueError(false);
        setAlIssError(false);
        if (
            parseFloat(value) <= 0 ||
            isNaN(parseFloat(value)) ||
            value === ""
        ) {
            setValueError(true);
        }
        if (
            parseFloat(alIss) <= 0 ||
            isNaN(parseFloat(alIss)) ||
            alIss === ""
        ) {
            setAlIssError(true);
        }
        if (!valueError && !alIssError) {
            const result = calcular(
                parseFloat(value),
                parseFloat(alIss),
                dataIrrf,
            );
            if (result) {
                setData(result);
            }
        }
    };

    return (
        <div className="my-6 px-4 py-6 rounded-md border bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600  ">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                <InputGroup
                    label="Valor liquido"
                    inputType="number"
                    inputValue={value}
                    setInputValue={(v) => setValue(v)}
                    error={valueError}
                />
                <InputGroup
                    label="Aliquota ISS"
                    inputType="number"
                    inputValue={alIss}
                    setInputValue={(v) => setAlIss(v)}
                    error={alIssError}
                />
                <InputGroup
                    label="Total ISS"
                    inputType="text"
                    disabled
                    inputValue={formatarNumeroReal(data.totalIss)}
                />
                <InputGroup
                    label="Aliquota IRRF"
                    inputType="number"
                    disabled
                    inputValue={data.alIrrf.toFixed(2)}
                />
                <InputGroup
                    label="Dedução IRRF"
                    inputType="text"
                    disabled
                    inputValue={formatarNumeroReal(data.deductionIrrf)}
                />
                <InputGroup
                    label="Total IRRF"
                    inputType="text"
                    disabled
                    inputValue={formatarNumeroReal(data.totalIrrf)}
                />
                <InputGroup
                    label="Total imposto"
                    inputType="text"
                    disabled
                    inputValue={formatarNumeroReal(data.totolTax)}
                />
                <InputGroup
                    label="Valor bruto"
                    inputType="text"
                    disabled
                    inputValue={formatarNumeroReal(data.totalBrute)}
                />
            </div>
            <button
                className="block mt-8 w-full rounded-md py-2 px-3 font-medium border-0 outline-0 text-white bg-green-500 hover:bg-green-600 transition-all md:w-48"
                onClick={handleCalc}
            >
                Calcular
            </button>
        </div>
    );
};

export const formatarNumeroReal = (numero: number) => {
    const formatador = new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return formatador.format(numero);
};
