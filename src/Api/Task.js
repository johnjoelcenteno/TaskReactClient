import ApiClient from './ApiClient';

export const GetTaskByTimeFrame = async () => await ApiClient.get(`/tasks/getTaskByTimeFrame/`);
export const GetById = async (id) => await ApiClient.get(`/tasks/GetById/${id}`);
// export const GetCategoryByUserId = async (userId) => await ApiClient.get(`/category/GetByUserId/${userId}`);
// export const GetTaskGroupedByCategory = async () => await ApiClient.get(`/category/GetTasksGroupByCategory/`);
// export const CreateCategory = async (payload) => await ApiClient.post('/category/', payload);
export const UpdateTask = async (id, payload) => await ApiClient.put(`/tasks/${id}`, payload);
export const DeleteTask = async (id) => await ApiClient.delete(`/tasks/${id}`);