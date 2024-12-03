export const handleApiResponse = (response, defaultMessage = 'Successful') => {
    if (response?.status === 200 && response?.data) {
        return {
            success: true,
            data: response.data.data || [],
            message: response.data.message || defaultMessage,
        };
    } else {
        console.error('Unexpected API response format:', response);
        throw {
            success: false,
            message: 'Unexpected response from server',
            error: response,
        };
    }
};

export const handleApiError = (error, defaultErrorMessage = 'Failed to fetch data') => {
    console.error('API Error:', error);
    return {
        success: false,
        message: error.response?.data?.message || defaultErrorMessage,
        error: error.response || error,
    };
};
