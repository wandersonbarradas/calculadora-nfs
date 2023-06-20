import { Irrf } from "@/types/IrrfItem";
import { formatarNumeroReal } from "@/components/Calculator";
import { useState } from "react";
type Props = {
    item: Irrf;
    updateItem: (item: Irrf) => void;
    deleteItem: (id: number) => Promise<void>;
};

export const TableConfigItem = ({ deleteItem, item, updateItem }: Props) => {
    const [disabled, setDisabled] = useState(false);
    const handleDelete = async () => {
        setDisabled(true);
        await deleteItem(item.id);
        setDisabled(false);
    };
    return (
        <tr className="border-b transition-all hover:bg-gray-200 dark:hover:bg-gray-700">
            <td className="p-2 text-center">
                {formatarNumeroReal(item.initial_limit)}
            </td>
            <td className="p-2 text-center">
                {formatarNumeroReal(item.final_limit)}
            </td>
            <td className="p-2  text-center">
                {formatarNumeroReal(item.percentage)}
            </td>
            <td className="p-2  text-center">
                {formatarNumeroReal(item.deduction)}
            </td>
            <td className="p-2  text-end">
                <div className="flex items-center justify-around">
                    <button
                        disabled={disabled}
                        onClick={() => updateItem(item)}
                        className="bg-green-400 py-1 px-4 font-medium rounded-md transition-all text-white hover:bg-green-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 mr-3"
                    >
                        Alterar
                    </button>
                    <button
                        disabled={disabled}
                        onClick={handleDelete}
                        className="bg-red-400 py-1 px-4 font-medium rounded-md transition-all text-white hover:bg-red-600 disabled:bg-gray-300 dark:disabled:bg-gray-700"
                    >
                        Excluir
                    </button>
                </div>
            </td>
        </tr>
    );
};
