// File: src/components/Input/Input.jsx

import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';
/**
 * A reusable Input component with size and value control.
 * @param {string} label - The label for the input field.
 * @param {string} type - The type of the input (e.g., 'text', 'password', 'email').
 * @param {string} placeholder - Placeholder text for the input field.
 * @param {string} size - The size of the input ('sm', 'lg', or undefined for default).
 * @param {string} value - The current value of the input field.
 * @param {function} onChange - Callback function to handle input changes.
 */
const Input = ({ label = '', type, placeholder = '', size = undefined, customClass, value, onChange, onBlur, name, touched, errors }) => {
    const sizeClass = size ? `form-control-${size}` : '';
    return (
        <div className="mb-3">
            {label && <label className="form-label">{label}</label>}
            <input
                type={type}
                className={`form-control ${sizeClass} ${customClass}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange} // Pass the value to the parent
                name={name}
                onBlur={onBlur}
            />
            {touched && errors && (
                <span className="text-danger">{errors}</span>
            )}
        </div>
    );
};

Input.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'lg']),
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    customClass: PropTypes.string,
    touched: PropTypes.bool
};

export default Input;
