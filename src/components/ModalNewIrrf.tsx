import { useEffect, useState } from "react";
import { InputGroup } from "./inputGroup";
import { Irrf, NewIrrf } from "@/types/IrrfItem";

type Props = {
    state: boolean;
    setState: (state: boolean) => void;
    submit: (item: NewIrrf) => Promise<void>;
    update: (item: Irrf) => Promise<void>;
    item?: Irrf | null;
};

export const ModalNewIrrf = ({
    state,
    setState,
    submit,
    item,
    update,
}: Props) => {
    const [opacity, setOpacity] = useState(false);
    const [irrfItem, setIrrfItem] = useState<NewIrrf | Irrf>({
        deduction: 0,
        final_limit: 0,
        initial_limit: 0,
        percentage: 0,
    });
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        console.log(item);
        if (item) {
            setIrrfItem(item);
        }
    }, [item]);

    useEffect(() => {
        if (state) {
            setOpacity(true);
        }
    }, [state]);

    const handleModal = () => {
        setOpacity(false);
        setTimeout(() => {
            setState(false);
        }, 700);
    };

    const handleSubmit = async () => {
        setDisabled(true);
        Object.entries(irrfItem).forEach((item) => {
            if (isNaN(item[1])) {
                alert("Dados não estão preenchidos corretamente");
                setDisabled(false);
                return;
            }
        });
        if (irrfItem.final_limit <= 0) {
            alert("Limite final não pode ser 0!");
            return;
        }
        if (item && item.id) {
            await update(irrfItem as Irrf);
        } else {
            await submit(irrfItem);
        }

        handleModal();
    };

    return (
        <div
            className={[
                "absolute top-0 left-0 right-0 bottom-0 w-screen h-screen flex justify-center items-center transition-colors",
                opacity ? "bg-black/80 opacity-100" : "bg-black/0 opacity-0",
            ].join(" ")}
        >
            <div className="w-3/5 px-4 py-6 rounded-md border bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600">
                <div className="text-xl font-semibold mb-4 text-center">
                    Novo item
                </div>
                <div className="flex gap-4">
                    <InputGroup
                        inputType="number"
                        label="Limite inicial"
                        inputValue={irrfItem.initial_limit.toString()}
                        setInputValue={(e) =>
                            setIrrfItem(
                                parseFloat(e) >= 0 || e === ""
                                    ? {
                                          ...irrfItem,
                                          initial_limit: parseFloat(e),
                                      }
                                    : irrfItem,
                            )
                        }
                        disabled={disabled}
                    />
                    <InputGroup
                        inputType="number"
                        label="Limite final"
                        inputValue={irrfItem.final_limit.toString()}
                        setInputValue={(e) =>
                            setIrrfItem(
                                parseFloat(e) >= 0 || e === ""
                                    ? {
                                          ...irrfItem,
                                          final_limit: parseFloat(e),
                                      }
                                    : irrfItem,
                            )
                        }
                        disabled={disabled}
                    />
                    <InputGroup
                        inputType="number"
                        label="Valor (%)"
                        inputValue={irrfItem.percentage.toString()}
                        setInputValue={(e) =>
                            setIrrfItem(
                                parseFloat(e) >= 0 || e === ""
                                    ? {
                                          ...irrfItem,
                                          percentage: parseFloat(e),
                                      }
                                    : irrfItem,
                            )
                        }
                        disabled={disabled}
                    />
                    <InputGroup
                        inputType="number"
                        label="Dedução"
                        inputValue={irrfItem.deduction.toString()}
                        setInputValue={(e) =>
                            setIrrfItem(
                                parseFloat(e) >= 0 || e === ""
                                    ? {
                                          ...irrfItem,
                                          deduction: parseFloat(e),
                                      }
                                    : irrfItem,
                            )
                        }
                        disabled={disabled}
                    />
                </div>
                <div className="flex items-center justify-end gap-4 mt-6">
                    <button
                        disabled={disabled}
                        onClick={handleSubmit}
                        className="bg-green-400 py-1 px-4 font-medium rounded-md transition-all text-white hover:bg-green-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 mr-3"
                    >
                        Concluir
                    </button>
                    <button
                        disabled={disabled}
                        onClick={handleModal}
                        className="bg-red-400 py-1 px-4 font-medium rounded-md transition-all text-white hover:bg-red-600 disabled:bg-gray-300 dark:disabled:bg-gray-700"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};
