import React from "react";
import PropTypes from "prop-types";
import "./Accordion.css";

const Accordion = ({ items }) => {
    return (
        <div className="accordion" id="accordionExample">
            {items.map((item, index) => (
                <div className="accordion-item" key={index}>
                    <h2 className="accordion-header">
                        <button
                            className={`accordion-button ${!item.isOpen ? "collapsed" : ""}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${index}`}
                            aria-expanded={item.isOpen}
                            aria-controls={`collapse${index}`}
                        >
                            {item.title}
                            {
                                (
                                    <span className="badge text-bg-primary ms-2">
                                        {item.numberOfTasks}
                                    </span>
                                )
                            }
                        </button>
                    </h2>
                    <div
                        id={`collapse${index}`}
                        className={`accordion-collapse collapse ${item.isOpen ? "show" : ""}`}
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">{item.content}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Prop type validation
Accordion.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            numberOfTasks: PropTypes.number.isRequired,
            content: PropTypes.node.isRequired,
            isOpen: PropTypes.bool, // Set `true` for the initially open item
        })
    ).isRequired,
};

export default Accordion;