"use client";

export const Loading = () => {
    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 w-screen h-screen flex justify-center items-center bg-gray-950">
            <div className="w-20 h-20 rounded-full border-4 border-transparent border-t-white animate-spin"></div>
        </div>
    );
};
