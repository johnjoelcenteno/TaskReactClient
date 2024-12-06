import CategoryService from '../Services/Category/Category';
import TaskService from '../Services/Task/Task';
import moment from 'moment';
export const homePageInit = async (setCategories) => {
    try {
        const newCategories = await CategoryService.fetchCategoriesForAccordion();
        setCategories(newCategories);
    } catch (error) {
        setCategories([]);
    }
}

export const taskPageInit = async (categoryId, setPageTitle, setTasks, setSelectOptions) => {
    const taskToTableData = (tasks) => tasks.map(task => {
        const { Title: title, Description: description, DueDate: dueDate, Status: status, TaskId: taskId, CategoryId: categoryId } = task;
        return { title, description, dueDate: moment(dueDate).format('YYYY-MM-DD'), status, taskId, categoryId };
    });

    const useCategoriesRequest = await CategoryService.GetByUserId();
    let selectCategoryOptions = [];
    let data = [];

    if (isNaN(categoryId)) {
        const response = await TaskService.GetTaskByUserId();
        data = response.data;
        setPageTitle("All");

        selectCategoryOptions = useCategoriesRequest.data.map(x => ({ value: x.CategoryId, label: x.Title }));
    }

    if (!isNaN(categoryId)) { // use promise all 
        const response = await TaskService.GetByCategoryId(categoryId);
        data = response.data;

        const category = await CategoryService.GetCategoryById(categoryId);
        const { Title: categoryTitle, } = category.data;
        setPageTitle(categoryTitle + "'s");

        selectCategoryOptions = useCategoriesRequest.data
            .filter(x => x.CategoryId == categoryId)
            .map(x => ({ value: x.CategoryId, label: x.Title }));
    }

    const tableData = taskToTableData(data);
    setTasks(tableData);
    setSelectOptions(selectCategoryOptions);
}

