import React from "react";
import PropTypes from "prop-types";
import "./Select.css";

/**
 * A reusable Select component with size and validation support.
 * @param {string} label - The label for the select field.
 * @param {string} size - The size of the select ('sm', 'lg', or undefined for default).
 * @param {array} options - An array of options for the select dropdown. Each option is an object with `value` and `label`.
 * @param {string} value - The current value of the select field.
 * @param {function} onChange - Callback function to handle select changes.
 * @param {function} onBlur - Callback function to handle onBlur event.
 * @param {string} name - The name of the select field (useful for forms).
 * @param {boolean} touched - Whether the field has been touched (for validation).
 * @param {string} errors - Validation error message for the field.
 */
const Select = ({
    label = "",
    size = undefined,
    customClass = "",
    options = [],
    value,
    onChange,
    onBlur,
    name,
    touched,
    errors,
}) => {
    const sizeClass = size ? `form-select-${size}` : "";

    return (
        <div className="mb-3">
            {label && <label className="form-label">{label}</label>}
            <select
                className={`form-select ${sizeClass} ${customClass}`}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                name={name}
            >
                <option value="" disabled>
                    Select an option
                </option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {touched && errors && <span className="text-danger">{errors}</span>}
        </div>
    );
};

Select.propTypes = {
    label: PropTypes.string,
    size: PropTypes.oneOf(["sm", "lg"]),
    customClass: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    name: PropTypes.string.isRequired,
    touched: PropTypes.bool,
    errors: PropTypes.string,
};

export default Select;
