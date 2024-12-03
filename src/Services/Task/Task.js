import {
    UpdateTask,
    GetById,
    DeleteTask,
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
}

export default Task;