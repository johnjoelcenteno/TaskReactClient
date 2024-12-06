import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
    variant = 'primary',
    size,
    type,
    isDisabled = false,
    isLoading = false,
    className = '',
    onClick,
    children,
}) => {
    const buttonClasses = `btn btn-${variant} ${size ? `btn-${size}` : ''} ${className}`;

    return (
        <button
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={isDisabled || isLoading}
        >
            {isLoading ? (
                <>
                    <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                    ></span>{' '}
                    Loading...
                </>
            ) : (
                children
            )}
        </button>
    );
};


Button.propTypes = {
    variant: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'lg']),
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
};

export default Button;
