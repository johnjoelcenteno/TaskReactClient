import React, { useState } from 'react';
import Modal from '../../Components/Modal/Modal';
import Input from '../../Components/Input/Input';
import TaskService from '../../Services/Task/Task';
import CategoryService from '../../Services/Category/Category';
import Select from '../../Components/Select/Select';
import { useFormik } from 'formik';
import { useToast } from '../../Context/ToastContext';

import * as Yup from 'yup';

function HomeModals({ modalData, closeModal, setCategories }) {

    const setToast = useToast();
    const fetchAndSetNewCategories = async () => {
        const newCategories = await CategoryService.fetchCategoriesForAccordion();
        setCategories(newCategories);
    }
    const validations = { // TODO: refactor this once done. 
        createCategoryValidation: useFormik({
            initialValues: {
                categoryTitle: "",
            },
            validationSchema: Yup.object({
                categoryTitle: Yup.string().required("Category name must not be empty"),
            }),
            onSubmit: async (values, { resetForm }) => {
                try {
                    const title = values.categoryTitle;
                    await CategoryService.createCategory(title);
                    resetForm();

                    setToast({
                        title: "Success",
                        message: "Category created successfully!",
                        type: "success",
                    });

                    fetchAndSetNewCategories();

                    closeModal && closeModal('createCategory');
                } catch (error) {
                    console.error("Error in onSubmit:", error);

                    setToast({
                        title: "Error",
                        message: error.message || "Failed to create category. Please try again.",
                        type: "danger",
                    });
                }
            },
        }),
        updateCategoryValidation: useFormik({
            initialValues: {
                updateCategoryTitle: modalData.updateCategory.categoryName || "",
            },
            enableReinitialize: true,
            validationSchema: Yup.object({
                updateCategoryTitle: Yup.string().required("Category name must not be empty")
            }),
            onSubmit: async (values, { resetForm }) => {
                try {
                    const categoryId = modalData.updateCategory.categoryId;
                    const title = values.updateCategoryTitle;
                    const { success, message } = await CategoryService.UpdateCategory(categoryId, { title });
                    if (!success) throw { message }

                    // console.log(result);
                    setToast({
                        title: "Success",
                        message: "Category created successfully!",
                        type: "success",
                    });
                    fetchAndSetNewCategories();
                    closeModal('updateCategory');
                } catch (error) {
                    console.error("Error in onSubmit:", error);

                    setToast({
                        title: "Error",
                        message: error.message || "Failed to update category. Please try again.",
                        type: "danger",
                    });
                }
            }
        }),
        updateTaskValidation: useFormik({
            initialValues: {
                updateTaskTitle: modalData.updateTask.title || "",
                updateTaskDescription: modalData.updateTask.description || "",
                updateTaskDueDate: modalData.updateTask.dueDate || "",
                updateTaskCategoryId: modalData.updateTask?.categoryId || "",
            },
            enableReinitialize: true,
            validationSchema: Yup.object({
                updateTaskTitle: Yup.string().required("Title must not be empty"),
                updateTaskDescription: Yup.string().required('Description must not be empty'),
                updateTaskDueDate: Yup.string().required('Due date must not be empty')
            }),
            onSubmit: async (values, { resetForm }) => {
                console.log(values);
                // await TaskService.UpdateTask();
            }
        })

    };

    return (
        <>
            {/* Create Category Modal */}
            <form onSubmit={validations.createCategoryValidation.handleSubmit}>
                <Modal
                    show={modalData.createCategory}
                    onClose={() => closeModal('createCategory')}
                    title="Create category"
                    size="lg"
                    proceedButtonClass="btn-success"
                    proceedButtonType="submit"
                    proceedButtonTitle="Save"
                >
                    <Input
                        label="Category name"
                        type="text"
                        placeholder="Enter category name"
                        value={validations.createCategoryValidation.values.categoryTitle}
                        onChange={validations.createCategoryValidation.handleChange}
                        onBlur={validations.createCategoryValidation.handleBlur}
                        touched={validations.createCategoryValidation.touched.categoryTitle}
                        errors={validations.createCategoryValidation.errors.categoryTitle}
                        name="categoryTitle"
                    />
                </Modal>
            </form>

            {/* Update Category Modal */}
            <form onSubmit={validations.updateCategoryValidation.handleSubmit}>
                <Modal
                    show={modalData.updateCategory.isOpen}
                    onClose={() => closeModal('updateCategory')}
                    title="Update category"
                    size="lg"
                    proceedButtonClass="btn-success"
                    proceedButtonType="submit"
                    proceedButtonTitle="Save"
                >
                    <Input
                        label="Category name"
                        type="text"
                        placeholder="Enter category name"
                        value={validations.updateCategoryValidation.values.updateCategoryTitle}
                        onChange={validations.updateCategoryValidation.handleChange}
                        onBlur={validations.updateCategoryValidation.handleBlur}
                        touched={validations.updateCategoryValidation.touched.updateCategoryTitle}
                        errors={validations.updateCategoryValidation.errors.updateCategoryTitle}
                        name="updateCategoryTitle"
                    />
                </Modal>
            </form>

            {/* Delete category */}
            <Modal
                show={modalData.deleteCategory.isOpen}
                onClose={() => closeModal('deleteCategory')}
                title="Delete category"
                size="lg"
                proceedButtonClass='btn-danger'
                proceedButtonType='button'
                proceedButtonTitle='Delete'
                submitBtnOnClick={async () => {
                    try {
                        const categoryId = modalData.deleteCategory.categoryId;

                        const deleteCategoryResponse = await CategoryService.DeleteCategory(categoryId);
                        if (!deleteCategoryResponse.success) throw { message: deleteCategoryResponse.message };

                        closeModal('deleteCategory');
                        setToast({
                            title: "Success",
                            message: "Category deleted successfully!",
                            type: "success",
                        });

                        const newCategories = await CategoryService.fetchCategoriesForAccordion();
                        setCategories(newCategories);
                    } catch (error) {
                        setToast({
                            title: "Error",
                            message: error.message || "Failed to create category. Please try again.",
                            type: "danger",
                        });
                    }
                }}
            > <h6>This will permanently delete <span className='fw-bold'>{modalData.deleteCategory.categoryName}</span></h6> </Modal>

            {/* Delete task */}
            <Modal
                show={modalData.deleteTask.isOpen}
                onClose={() => closeModal('deleteTask')}
                title="Delete task"
                size="lg"
                proceedButtonClass='btn-danger'
                proceedButtonType='button'
                proceedButtonTitle='Delete'
                submitBtnOnClick={async () => {
                    try {
                        const taskId = modalData.deleteTask.taskId;
                        await TaskService.DeleteTask(taskId);

                        closeModal('deleteTask');
                        setToast({
                            title: "Task deleted",
                            message: "Task deleted successfully!",
                            type: "success",
                        });

                        const categories = await CategoryService.fetchCategoriesForAccordion();
                        setCategories(categories);
                    } catch (error) {
                        setToast({
                            title: "Error",
                            message: error.message,
                            type: "danger",
                        });
                    }
                }}
            > <h6>This will permanently delete <span className='fw-bold'>{modalData.deleteTask.taskTitle}</span></h6> </Modal>

            {/* update task */}
            <form onSubmit={validations.updateTaskValidation.handleSubmit}>
                <Modal
                    show={modalData.updateTask.isOpen}
                    onClose={() => closeModal('updateTask')}
                    title='Update task'
                    size="lg"
                    proceedButtonClass='btn-success'
                    proceedButtonType='submit'
                    proceedButtonTitle='Save'
                >
                    <Input
                        label="Title"
                        type="text"
                        placeholder="Enter title"
                        value={validations.updateTaskValidation.values.updateTaskTitle}
                        onChange={validations.updateTaskValidation.handleChange}
                        onBlur={validations.updateTaskValidation.handleBlur}
                        touched={validations.updateTaskValidation.touched.updateTaskTitle}
                        errors={validations.updateTaskValidation.errors.updateTaskTitle}
                        name="updateTaskTitle"
                    />
                    <Input
                        label="Description"
                        type="text"
                        placeholder="Enter description"
                        value={validations.updateTaskValidation.values.updateTaskDescription}
                        onChange={validations.updateTaskValidation.handleChange}
                        onBlur={validations.updateTaskValidation.handleBlur}
                        touched={validations.updateTaskValidation.touched.updateTaskDescription}
                        errors={validations.updateTaskValidation.errors.updateTaskDescription}
                        name="updateTaskDescription"
                    />
                    <Input
                        label="Due date"
                        type="date"
                        placeholder="Enter due date"
                        value={validations.updateTaskValidation.values.updateTaskDueDate}
                        onChange={validations.updateTaskValidation.handleChange}
                        onBlur={validations.updateTaskValidation.handleBlur}
                        touched={validations.updateTaskValidation.touched.updateTaskDueDate}
                        errors={validations.updateTaskValidation.errors.updateTaskDueDate}
                        name="updateTaskDueDate"
                    />

                    <Select
                        label="Category"
                        options={modalData?.categorySelectOptions || []}
                        value={validations.updateTaskValidation.values.updateTaskCategoryId}
                        onChange={validations.updateTaskValidation.handleChange}
                        onBlur={validations.updateTaskValidation.handleBlur}
                        touched={validations.updateTaskValidation.touched.updateTaskCategoryId}
                        errors={validations.updateTaskValidation.errors.updateTaskCategoryId}
                        name="updateTaskCategory"
                    />
                </Modal>
            </form>
        </>
    );
}

export default HomeModals;
