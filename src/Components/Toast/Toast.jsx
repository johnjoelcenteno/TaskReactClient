import React, { useState, useEffect } from 'react';
import './Toast.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Toast = ({ title = 'Notification', message = '', type = 'success', duration = 3000, onClose }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                setShow(false);
                if (onClose) onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    if (!show) return null;

    return (
        <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 1100 }}>
            <div className={`toast show text-bg-${type}`} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <strong className="me-auto">{title}</strong>
                    <small>just now</small>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShow(false)}
                        aria-label="Close"
                    ></button>
                </div>
                <div className="toast-body">{message}</div>
            </div>
        </div>
    );
};

export default Toast;
