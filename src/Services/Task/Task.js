import {
    UpdateTask,
    GetById,
    DeleteTask,
    GetByCategoryId,
    GetByUserId,
    InsertTask
} from '../../Api/Task';
import { handleApiResponse, handleApiError } from '../../Utils/apiUtils';
class Task {

    static async CompleteTask(taskId) {
        try {
            let taskResponse = await GetById(taskId);
            let { data: task } = handleApiResponse(taskResponse, "Get by id successful");
            task.Status = 'Completed';
            const response = await UpdateTask(taskId, task);
            return handleApiResponse(response, "Task compeleted successfully");
        } catch (error) {
            return handleApiError(error, 'Failed to complete task');
        }
    }

    static async DeleteTask(taskId) {
        try {
            let taskResponse = await GetById(taskId);
            let { data: task } = handleApiResponse(taskResponse, "Get by id successful");
            if (!task) throw { message: "Task not found " }

            const response = await DeleteTask(taskId);
            return handleApiResponse(response, "Task compeleted successfully");
        } catch (error) {
            return handleApiError(error, 'Failed to complete task');
        }
    }

    static async UpdateTask(taskId, model) {
        try {
            let taskResponse = await GetById(taskId);
            let { data: task } = handleApiResponse(taskResponse, "Get by id successful");
            if (!task) throw { message: "Task not found " }

            const response = await UpdateTask(taskId, model);

            return handleApiResponse(response, "Updated task successfully");
        } catch (error) {
            return handleApiError(error, 'Failed to update task');
        }
    }

    static async GetByCategoryId(categoryId) {
        try {
            const resposne = await GetByCategoryId(categoryId);
            return handleApiResponse(resposne, "Fetched task successfully");
        } catch (error) {
            return handleApiError(error, "Failed to fetch task");
        }
    }

    static async GetTaskByUserId() {
        try {
            const response = await GetByUserId();
            return handleApiResponse(response, "Fetched task successfully");
        } catch (error) {
            return handleApiError(error, "Failed to fetch tasks");
        }
    }

    static async CreateTask(payload) {
        try {
            const response = await InsertTask(payload);
            return handleApiResponse(response, "Task created successfully");
        } catch (error) {
            return handleApiError(error, "Task creation failed");
        }
    }


}

export default Task;