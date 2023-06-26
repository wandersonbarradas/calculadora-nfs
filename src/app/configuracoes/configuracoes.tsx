"use client";
import { ModalNewIrrf } from "@/components/ModalNewIrrf";
import { TableConfigItem } from "@/components/TableConfigItem";
import { Irrf, NewIrrf } from "@/types/IrrfItem";
import { useEffect, useState } from "react";

type Props = {
    irrfTable: Irrf[];
};

const Configuracoes = ({ irrfTable }: Props) => {
    const [irrfItems, setIrrfItems] = useState<Irrf[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [itemUpdate, setItemUpdate] = useState<Irrf | null>(null);

    useEffect(() => {
        if (!showModal) {
            setItemUpdate(null);
        }
    }, [showModal]);

    useEffect(() => {
        setIrrfItems(irrfTable);
    }, [irrfTable]);

    const handleNewIrrf = async (item: NewIrrf) => {
        const response = await fetch("/api/irrf", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        });
        const result = (await response.json()) as { response: Irrf };
        setIrrfItems([...irrfItems, result.response]);
    };

    const openUpdateModal = async (item: Irrf) => {
        setItemUpdate(item);
        setShowModal(true);
    };

    const updateIrrfItem = async (item: Irrf) => {
        const response = await fetch("/api/irrf", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        });
        const result = (await response.json()) as { response: Irrf };
        setIrrfItems([
            ...irrfItems.filter((i) => i.id !== result.response.id),
            result.response,
        ]);
    };

    const deleteIrrfItem = async (id: number) => {
        const ver = confirm("Deseja realmente deletar este item?");
        if (!ver) {
            return;
        }
        const response = await fetch(`/api/irrf/${id}`, {
            method: "DELETE",
        });
        const result = (await response.json()) as { response: string };
        if (response.ok) {
            alert(result.response);
            setIrrfItems([...irrfItems.filter((i) => i.id !== id)]);
        } else {
            alert("Ops. Algo deu errado!");
        }
    };

    return (
        <>
            <div className="mt-8">
                <h1 onClick={() => setShowModal(true)} className="text-2xl">
                    Configurações
                </h1>
                <div className="my-6 px-4 py-6 rounded-md border bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600">
                    <div className="flex items-center mb-3">
                        <h3 className="text-lg mr-4">
                            Manutenção da tabela do IRRF
                        </h3>
                        <button
                            className="bg-green-400 hover:bg-green-600 py-1 px-4 text-white font-medium rounded-md transition-all"
                            onClick={() => setShowModal(true)}
                        >
                            Novo
                        </button>
                    </div>
                    <div>
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-300">
                                    <th className="font-bold text-base p-2 text-center">
                                        Limite Inicial
                                    </th>
                                    <th className="font-bold text-base p-2 text-center">
                                        Limite Final
                                    </th>
                                    <th className="font-bold text-base p-2 text-center">
                                        Valor (%)
                                    </th>
                                    <th className="font-bold text-base p-2 text-center">
                                        Dedução
                                    </th>
                                    <th className="font-bold text-base p-2 text-center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {irrfItems.length > 0 &&
                                    irrfItems
                                        .sort((a, b) => a.id - b.id)
                                        .map((item, index) => (
                                            <TableConfigItem
                                                key={index}
                                                item={item}
                                                updateItem={openUpdateModal}
                                                deleteItem={deleteIrrfItem}
                                            />
                                        ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showModal && (
                <ModalNewIrrf
                    submit={handleNewIrrf}
                    update={updateIrrfItem}
                    setState={setShowModal}
                    state={showModal}
                    item={itemUpdate}
                />
            )}
        </>
    );
};

export default Configuracoes;
