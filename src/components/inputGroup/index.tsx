"use client";
import { useEffect, useState } from "react";

type Props = {
    label: string;
    inputType: "number" | "text";
    disabled?: boolean;
    inputValue: string;
    setInputValue?: (value: string) => void;
    error?: boolean;
};

export const InputGroup = ({
    label,
    inputType,
    disabled,
    inputValue,
    setInputValue,
    error,
}: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (setInputValue) {
            setInputValue(e.target.value);
        }
    };
    return (
        <div className="relative">
            <label className="block mb-2" htmlFor={label.replace(/\s/g, "")}>
                {label}
            </label>
            <input
                className={[
                    "w-full border bg-transparent rounded-md px-3 py-2 outline-none transition-all focus:border-sky-500 border-gray-300 disabled:bg-gray-300 dark:bg-gray-900 dark:border-gray-600  dark:disabled:bg-gray-600",
                    error
                        ? "border-red-500 dark:border-red-500 focus:border-red-500"
                        : null,
                ].join(" ")}
                type={inputType}
                value={inputValue}
                name={label.replace(/\s/g, "")}
                id={label.replace(/\s/g, "")}
                onChange={handleChange}
                disabled={disabled}
                placeholder="0,00"
            />
            {error && (
                <div className="mt-1 bg-red-500 rounded-md p-1 absolute z-10 w-full text-white text-sm text-start">
                    Valor deve ser maior que 0
                </div>
            )}
        </div>
    );
};
