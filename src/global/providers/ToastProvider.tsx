import { createContext, useContext, useState, PropsWithChildren } from 'react';
import styled from 'styled-components';


interface ToastProps {
    message: string;
    status: "info" | "error"
}

interface ToastContextType {
    showToast: (toastInfo: ToastProps) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);


const Toast = styled.div<ToastProps>`
    background-color: var(--color-${(props: ToastProps) => props.status});
    position: fixed;small
    z-index: 10;
    bottom: var(--spacing-base);
    left: 50%;
    transform: translateX(-50%);
    padding: var(--spacing-small) var(--spacing-medium);
    border-radius: var(--radius-base);
    color: var(--text--color-primary);
    transition: transform 0.3s ease-in-out; 
`

export function ToastProvider({ children }: PropsWithChildren) {
    const [toastInfo, setToastInfo] = useState<ToastProps | null>(null);

    const showToast = (toastInfo: ToastProps) => {
        setToastInfo(toastInfo);
        setTimeout(() => setToastInfo(null), 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toastInfo && <Toast {...toastInfo}>{toastInfo?.message}</Toast>}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};