// File: src/components/Button/Button.jsx

import React from 'react';
import PropTypes from 'prop-types';

/**
 * A reusable button component using Bootstrap.
 * @param {string} variant - The Bootstrap button style (e.g., 'primary', 'secondary').
 * @param {string} size - The size of the button (e.g., 'sm', 'lg').
 * @param {boolean} isDisabled - If true, disables the button.
 * @param {boolean} isLoading - If true, shows a loading spinner inside the button.
 * @param {string} className - Additional custom classes.
 * @param {function} onClick - Function to call when the button is clicked.
 * @param {React.ReactNode} children - Button content.
 */
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

// Prop types for better type checking
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
