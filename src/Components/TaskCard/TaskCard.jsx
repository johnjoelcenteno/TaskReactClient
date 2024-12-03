import React from 'react';
import './TaskCard.css';

const TaskCard = ({ title, description, dueDate, status }) => {
    return (
        <div className="task-card">
            <h3>{title}</h3>
            <p>{description}</p>
            <p><strong>Due:</strong> {new Date(dueDate).toDateString()}</p>
            <p><strong>Status:</strong> {status || 'Pending'}</p>
        </div>
    );
};

export default TaskCard;
