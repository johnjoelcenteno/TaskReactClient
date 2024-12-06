import ApiClient from './ApiClient';

export const GetTaskByTimeFrame = async () => await ApiClient.get(`/tasks/getTaskByTimeFrame/`);
export const GetById = async (id) => await ApiClient.get(`/tasks/GetById/${id}`);
export const GetByCategoryId = async (categoryId) => await ApiClient.get(`/tasks/getByCategoryId/${categoryId}`);
export const GetByUserId = async () => await ApiClient.get('/tasks/');

export const UpdateTask = async (id, payload) => await ApiClient.put(`/tasks/${id}`, payload);
export const DeleteTask = async (id) => await ApiClient.delete(`/tasks/${id}`);
export const InsertTask = async (payload) => await ApiClient.post('tasks/', payload);