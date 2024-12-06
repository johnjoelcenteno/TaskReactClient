export const generateOptionsDataForCategories = (categories) => {
    return categories.map(x => ({
        value: x.categoryId,
        label: x.name
    }));
}