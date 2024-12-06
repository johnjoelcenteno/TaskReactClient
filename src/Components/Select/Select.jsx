import React from "react";
import PropTypes from "prop-types";
import "./Select.css";

const Select = ({
    label = "",
    size = undefined,
    customClass = "",
    options = [],
    value = "",
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
