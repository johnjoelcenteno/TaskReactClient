import {
    CreateCategory,
    GetTaskGroupedByCategory,
    DeleteCategory,
    UpdateCategory,
    GetCategoryById,
    GetCategoryByUserId
} from '../../Api/Category';
import { handleApiResponse, handleApiError } from '../../Utils/apiUtils';

class CategoryService {
    static async createCategory(title) {
        try {
            const response = await CreateCategory({ title });
            return response;
        } catch (error) {

            throw {
                message: 'Failed to create category. Please try again.',
                error,
            };
        }
    }

    static async getTaskGroupByCategory() {
        try {
            const response = await GetTaskGroupedByCategory();
            return handleApiResponse(response, 'Fetched categories successfully');
        } catch (error) {
            return handleApiError(error, 'Failed to get categories. Please try again');
        }
    }

    static async DeleteCategory(categoryId) {
        try {
            const response = await DeleteCategory(categoryId);
            return handleApiResponse(response, 'Deleted category successfully');
        } catch (error) {
            return handleApiError(error, 'Failed to delete category');
        }
    }

    static async UpdateCategory(categoryId, payload) {
        try {
            const response = await UpdateCategory(categoryId, payload);
            return handleApiResponse(response, 'Update category successfully');
        } catch (error) {
            return handleApiError(error, 'Failed to update category');
        }
    }

    static async fetchCategoriesForAccordion() {
        const { data, success } = await this.getTaskGroupByCategory();

        if (!success) throw { message: 'Error getting categories' };
        return data.map(category => ({ ...category, isOpen: false })) || [];
    };

    static async GetCategoryById(categoryId) {
        try {
            const result = await GetCategoryById(categoryId);
            return handleApiResponse(result, "Fetch category successful");
        } catch (error) {
            return handleApiError(error, "Failed to fetch category");
        }
    }

    static async GetByUserId() {
        try {
            const result = await GetCategoryByUserId();
            return handleApiResponse(result, "Fetch category successful");
        } catch (error) {
            return handleApiError(error, "Failed to fetch category");
        }
    }


}

export default CategoryService;
