import React, { createContext, useContext, useState } from 'react';
import Toast from '../Components/Toast/Toast';
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null);

    return (
        <ToastContext.Provider value={setToast}>
            {children}
            {toast && (
                <Toast
                    key={toast.id}
                    title={toast.title}
                    message={toast.message}
                    type={toast.type}
                    duration={toast.duration}
                    onClose={() => setToast(null)}
                />
            )}
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
