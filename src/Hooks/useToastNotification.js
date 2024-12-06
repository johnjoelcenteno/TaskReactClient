import { useContext } from 'react';
import { ToastContext } from '../Context/ToastContext';

export const useToastNotification = () => {
    const setToast = useContext(ToastContext);

    const showToast = (title, message, type) => {
        setToast({
            id: Date.now(),
            title,
            message,
            type,
        });
    };

    return showToast;
};
