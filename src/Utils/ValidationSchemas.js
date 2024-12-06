import * as Yup from 'yup';

class ValidationSchemas {
    static createCategorySchemaValidation = Yup.object({
        categoryTitle: Yup.string().required("Category name must not be empty"),
    });

    static updateCategorySchemaValidation = Yup.object({
        updateCategoryTitle: Yup.string().required("Category name must not be empty")
    });

    static updateTaskSchemaValidation = Yup.object({
        updateTaskTitle: Yup.string().required("Title must not be empty"),
        updateTaskDescription: Yup.string().required('Description must not be empty'),
        updateTaskDueDate: Yup.string().required('Due date must not be empty')
    });

    static createTask = Yup.object({
        title: Yup.string().required('Title must not be empty'),
        description: Yup.string().required('Description must not be empty'),
        dueDate: Yup.string().required("Due date must not be empty")
    });;
}

export default ValidationSchemas;