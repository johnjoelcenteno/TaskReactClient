import ApiClient from './ApiClient';

export const GetCategoryById = async (id) => await ApiClient.get(`/category/GetById/${id}`);
export const GetCategoryByUserId = async (userId) => await ApiClient.get(`/category/GetByUserId/${userId}`);
export const GetTaskGroupedByCategory = async () => await ApiClient.get(`/category/GetTasksGroupByCategory/`);
export const CreateCategory = async (payload) => await ApiClient.post('/category/', payload);
export const UpdateCategory = async (id, payload) => await ApiClient.put(`/category/${id}`, payload);
export const DeleteCategory = async (id) => await ApiClient.delete(`/category/${id}`);