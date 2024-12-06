import CategoryService from '../Services/Category/Category';
import TaskService from '../Services/Task/Task';
import { useToastNotification } from '../Hooks/useToastNotification';

export const useSubmissionHandlers = (closeModal, modalData, setCategories, setTasks) => {
    const showToast = useToastNotification();

    const createCategorySubmission = async (values, { resetForm }) => {
        try {
            const title = values.categoryTitle;
            await CategoryService.createCategory(title);
            const newCategories = await CategoryService.fetchCategoriesForAccordion();
            setCategories(newCategories);

            resetForm();

            showToast("Success", "Category created successfully!", "success");


            closeModal && closeModal('createCategory');
        } catch (error) {
            console.error("Error in createCategorySubmission:", error);
            showToast("Error", error.message || "Failed to create category.", "danger");
        }
    };

    const updateCategorySubmission = async (values) => {
        console.log(values, 'update category submission');
        try {
            const categoryId = modalData.updateCategory.categoryId;
            const title = values.updateCategoryTitle;
            const { success, message } = await CategoryService.UpdateCategory(categoryId, { title });
            if (!success) throw { message };

            showToast("Success", "Category updated successfully!", "success");
            const newCategories = await CategoryService.fetchCategoriesForAccordion();
            setCategories(newCategories);

            closeModal && closeModal('updateCategory');
        } catch (error) {
            console.error("Error in updateCategorySubmission:", error);
            showToast("Error", error.message || "Failed to update category.", "danger");
        }
    };

    const updateTaskSubmission = async (values, id) => {
        try {
            let {
                updateTaskTitle: title,
                updateTaskDueDate: dueDate,
                updateTaskCategoryId: categoryId,
                updateTaskDescription: description,
            } = values;

            if ([title, dueDate, categoryId, description].includes(null || undefined)) {
                title = values.title;
                description = values.description;
                categoryId = values.categoryId;
                dueDate = values.dueDate;
            }

            const status = modalData?.updateTask.status || values.status;
            const taskId = modalData?.updateTask.taskId || id;

            const payload = { title, dueDate, categoryId, description, status };

            const { success, message } = await TaskService.UpdateTask(taskId, payload);
            if (!success) throw { message };

            showToast("Success", "Task updated successfully!", "success");
            if (closeModal) closeModal && closeModal('updateTask');

            const newCategories = await CategoryService.fetchCategoriesForAccordion();
            if (setCategories) setCategories(newCategories);
        } catch (error) {
            console.error("Error in updateTaskSubmission:", error);
            showToast("Error", error.message || "Failed to update task.", "danger");
        }
    };

    const createTaskSubmission = async (values, { resetForm }) => {
        try {
            const { title, description, dueDate, categoryId } = values;

            const payload = { title, description, categoryId, dueDate, categoryId };
            const { message, success, data } = await TaskService.CreateTask(payload);
            const { id: taskId } = data;

            if (!success) throw { message };

            showToast("Success", "Task created successfully", "success");
            closeModal();
            resetForm();
            if (setTasks) {
                setTasks((prev) => [...prev, { categoryId, description, dueDate, status: "Pending", taskId, title }]);
            }
        } catch (error) {
            showToast("Error", error.message || "Failed to update task.", "danger");
        }
    }

    return {
        createCategorySubmission,
        updateCategorySubmission,
        updateTaskSubmission,
        createTaskSubmission
    };
};
