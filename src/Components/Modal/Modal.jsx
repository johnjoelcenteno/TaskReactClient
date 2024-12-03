import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = ({
    show = false,
    onClose,
    title = 'Modal title',
    children,
    footer = null,
    size = undefined,
    proceedButtonClass = 'btn-primary',
    proceedButtonTitle = 'Save Changes',
    proceedButtonType = 'button',
    hideFooter = false,
    submitBtnOnClick = () => { }
}) => {
    // Prevent rendering if `show` is false
    if (!show) return null;

    // Determine modal size class
    const sizeClass = size ? `modal-${size}` : '';

    return (
        <div className={`modal-overlay ${show ? 'fade-in' : 'fade-out'}`}>
            <div className={`modal-dialog-wrapper ${show ? 'pop-in' : 'pop-out'}`}>
                <div className="modal d-block" tabIndex="-1" role="dialog">
                    <div className={`modal-dialog ${sizeClass}`} role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{title}</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={onClose}
                                ></button>
                            </div>
                            <div className="modal-body">{children}</div>
                            {!hideFooter && (
                                <div className="modal-footer">
                                    {footer || (
                                        <>
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={onClose}
                                            >
                                                Close
                                            </button>
                                            <button
                                                type={proceedButtonType}
                                                className={`btn ${proceedButtonClass}`}
                                                onClick={submitBtnOnClick}
                                            >
                                                {proceedButtonTitle}
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Prop type validation
Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.node,
    footer: PropTypes.node,
    size: PropTypes.oneOf(['sm', 'lg', 'xl']),
    proceedButtonClass: PropTypes.string,
    proceedButtonTitle: PropTypes.string,
    proceedButtonType: PropTypes.string,
    hideFooter: PropTypes.bool,
};

export default Modal;