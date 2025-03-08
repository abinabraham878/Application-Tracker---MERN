import { createContext, JSX, useContext, useState } from "react";

type ToastType = "success" | "error" | "warning" | "html";

interface Toast {
    id: number;
    type: ToastType;
    message: string | JSX.Element;
}

interface ToastContextType {
    addToast: (type: ToastType, message: string | JSX.Element) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (type: ToastType, message: string | JSX.Element) => {
        const newToast: Toast = { id: Date.now(), type, message };
        setToasts((prevToasts) => [...prevToasts, newToast]);

        setTimeout(() => {
            setToasts((prevToasts) => prevToasts.filter((t) => t.id !== newToast.id))
        }, 6000)
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed top-4 right-4 space-y-2 z-50">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`p-4 rounded-md shadow-lg text-white flex items-center gap-2 transition-opacity duration-300 ${toast.type === "success" ? "bg-green-500" :
                                toast.type === "error" ? "bg-red-500" :
                                    toast.type === "warning" ? "bg-yellow-500" :
                                        "bg-gray-800"
                            }`}
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
