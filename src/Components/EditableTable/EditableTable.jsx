import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaTrash, FaSave, FaEdit } from "react-icons/fa";
import Modal from '../Modal/Modal';
import { useSubmissionHandlers } from '../../Hooks/useSubmissionHandlers';
import TaskService from '../../Services/Task/Task';
import { useToastNotification } from '../../Hooks/useToastNotification';

import './EditableTable.css';

const EditableTable = ({ tasks, setTasks }) => {
    const showToast = useToastNotification();
    const [editingRow, setEditingRow] = useState(null);
    const [editedRow, setEditedRow] = useState({});
    const [deleteModal, setDeleteModal] = useState(false);
    const [taskToBeDeleted, setTaskToBeDeleted] = useState({ id: 0, taskTitle: "" });
    const [errors, setErrors] = useState({});
    const { updateTaskSubmission } = useSubmissionHandlers();

    const handleEditClick = (index, task) => {
        setEditingRow(index);
        setEditedRow(task);
        setErrors({}); // Reset errors when starting to edit
    };

    const handleInputChange = (e, field) => {
        const { value } = e.target;

        // Update the edited row
        setEditedRow((prev) => ({
            ...prev,
            [field]: value,
        }));

        // Validate the field
        validateField(field, value);
    };

    const validateField = (field, value) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset to midnight

        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1); // Subtract one day

        let error = "";

        if (field === "title" || field === "description") {
            if (!value.trim()) {
                error = "Field must not be empty";
            }
        }

        if (field === "dueDate") {
            const inputDate = new Date(value);
            if (isNaN(inputDate.getTime()) || inputDate < yesterday) {
                error = "Due date cannot be earlier than yesterday";
            }
        }

        // Update the errors state
        setErrors((prev) => ({
            ...prev,
            [field]: error,
        }));
    };

    const handleSaveClick = async (index) => {
        let isValid = true;
        Object.keys(editedRow).forEach((field) => {
            validateField(field, editedRow[field]);
            if (errors[field]) {
                isValid = false;
            }
        });

        if (!isValid) return;

        const updatedTasks = [...tasks];
        updatedTasks[index] = editedRow;
        console.log(editedRow, 'ako si editedRow');

        const { title, status, description, dueDate, taskId, categoryId } = editedRow;
        const payload = { title, status, description, dueDate, categoryId };


        await updateTaskSubmission(payload, taskId);

        setTasks(updatedTasks);
        setEditingRow(null);
    };

    const handleDeleteClick = (index) => {
        const taskId = tasks[index].taskId;
        const taskTitle = tasks[index].title;

        setTaskToBeDeleted({ taskId, taskTitle });
        setDeleteModal(true);
    };

    return (
        <div className="table-responsive">
            <table className="table table-hover table-bordered">

                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.length == 0 &&
                        <tr>
                            <td colSpan={6} className="text-center">No available data</td>
                        </tr>
                    }

                    {tasks.map((task, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>
                                {editingRow === index ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editedRow.title || ""}
                                            onChange={(e) => handleInputChange(e, "title")}
                                            className={`form-control form-control-sm ${errors.title ? "is-invalid" : ""}`}
                                        />
                                        {errors.title && (
                                            <span className="text-danger">{errors.title}</span>
                                        )}
                                    </>
                                ) : (
                                    task.title
                                )}
                            </td>
                            <td>
                                {editingRow === index ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editedRow.description || ""}
                                            onChange={(e) => handleInputChange(e, "description")}
                                            className={`form-control form-control-sm ${errors.description ? "is-invalid" : ""}`}
                                        />
                                        {errors.description && (
                                            <span className="text-danger">{errors.description}</span>
                                        )}
                                    </>
                                ) : (
                                    task.description
                                )}
                            </td>
                            <td>
                                {editingRow === index ? (
                                    <>
                                        <input
                                            type="date"
                                            value={editedRow.dueDate || ""}
                                            onChange={(e) => handleInputChange(e, "dueDate")}
                                            className={`form-control form-control-sm ${errors.dueDate ? "is-invalid" : ""}`}
                                        />
                                        {errors.dueDate && (
                                            <span className="text-danger">{errors.dueDate}</span>
                                        )}
                                    </>
                                ) : (
                                    task.dueDate
                                )}
                            </td>
                            <td>
                                {editingRow === index ? (
                                    <select
                                        value={editedRow.status || ""}
                                        onChange={(e) => handleInputChange(e, "status")}
                                        className="form-select form-select-sm"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                ) : (
                                    task.status
                                )}
                            </td>
                            <td>
                                {editingRow === index ? (
                                    <button
                                        className="btn btn-success btn-sm me-2"
                                        onClick={() => handleSaveClick(index)}
                                    >
                                        <FaSave />
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-primary btn-sm me-2"
                                        onClick={() => handleEditClick(index, task)}
                                    >
                                        <FaEdit />
                                    </button>
                                )}
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteClick(index)}
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal
                show={deleteModal}
                title="Delete"
                onClose={() => setDeleteModal(false)}
                proceedButtonClass="btn-danger"
                proceedButtonTitle="Delete"
                submitBtnOnClick={async () => {
                    try {
                        await TaskService.DeleteTask(taskToBeDeleted.taskId);
                        setDeleteModal(false);


                        setTasks((prevTasks) =>
                            prevTasks.filter((task) => task.taskId !== taskToBeDeleted.taskId)
                        );

                        showToast("Delete success", "Task deleted successfully", "success");
                    } catch (error) {
                        showToast("Error deleting task", error, "danger");
                    }
                }}
            >
                <h6>Delete <span className="fw-bold">{taskToBeDeleted.taskTitle}</span></h6>
            </Modal>
        </div>
    );
};

export default EditableTable;
