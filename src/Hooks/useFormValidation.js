import { useFormik } from 'formik';
import ValidationSchemas from '../Utils/ValidationSchemas';
import moment from 'moment';

export const useCreateCategoryForm = (onSubmit) => {
    return useFormik({
        initialValues: {
            categoryTitle: "",
        },
        validationSchema: ValidationSchemas.createCategory,
        onSubmit,
    });
};

export const useUpdateCategoryForm = (modalData, onSubmit) => {
    return useFormik({
        initialValues: {
            updateCategoryTitle: modalData.updateCategory.categoryName || "",
        },
        enableReinitialize: true,
        validationSchema: ValidationSchemas.updateCategory,
        onSubmit,
    });
};

export const useUpdateTaskForm = (modalData, onSubmit) => {
    return useFormik({
        initialValues: {
            updateTaskTitle: modalData.updateTask.title || "",
            updateTaskDescription: modalData.updateTask.description || "",
            updateTaskDueDate: modalData.updateTask.dueDate
                ? moment(modalData.updateTask.dueDate).format('YYYY-MM-DD')
                : "",
            updateTaskCategoryId: String(modalData.updateTask?.categoryId) || "",
            updateTaskCategoryName: modalData.UpdateTask?.categoryName || ""
        },
        enableReinitialize: true,
        validationSchema: ValidationSchemas.updateTask,
        onSubmit,
    });
};

export const useCreateTaskForm = (onSubmit, categoryId) => {
    return useFormik({
        initialValues: {
            title: "",
            description: "",
            dueDate: "",
            categoryId
        },
        validationSchema: ValidationSchemas.createTask,
        onSubmit
    });
}
