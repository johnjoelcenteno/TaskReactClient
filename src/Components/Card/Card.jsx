import React from "react";
import PropTypes from "prop-types";
import { FaCheck, FaTimes, FaEdit } from "react-icons/fa";
import "./Card.css";

const Card = ({
    title,
    content,
    showCheck = false,
    showX = false,
    showEdit = false,
    onCheck = () => { },
    onX = () => { },
    onEdit = () => { }
}) => {
    return (
        <div className="card-custom" style={{ width: "15rem" }}>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{content}</p>
                <div className="card-icons">
                    {showCheck && (
                        <FaCheck className="icon check-icon" onClick={onCheck} title="Check" />
                    )}
                    {showX && (
                        <FaTimes className="icon x-icon" onClick={onX} title="Remove" />
                    )}
                    {showEdit && (
                        <FaEdit className="icon edit-icon" onClick={onEdit} title="Edit" />
                    )}
                </div>
            </div>
        </div>
    );
};

// PropTypes for type-checking
Card.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    showCheck: PropTypes.bool,
    showX: PropTypes.bool,
    showEdit: PropTypes.bool,
    onCheck: PropTypes.func,
    onX: PropTypes.func,
    onEdit: PropTypes.func,
};

export default Card;