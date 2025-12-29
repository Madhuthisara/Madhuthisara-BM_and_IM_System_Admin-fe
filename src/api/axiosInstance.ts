import axios from 'axios';
import { message } from 'antd';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || process.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Handle FormData
        if (config.data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data';
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        const config = response.config as any;
        // Common success message handling
        if (config._showSuccessMessage && response.data && response.data.message) {
            message.success(response.data.message);
        }
        return response;
    },
    (error) => {
        const { response, config } = error;
        const customConfig = config as any;

        if (response) {
            // Common error message handling
            if (customConfig._showErrorMessage !== false) {
                const errorMessage = response.data?.message || 'Something went wrong';
                message.error(errorMessage);
            }

            if (response.status === 401) {
                // Clear session
                localStorage.removeItem('token');
                localStorage.removeItem('user');

                // Redirect to login if not already there
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
            }
        } else {
            if (customConfig?._showErrorMessage !== false) {
                message.error('Network error. Please check your connection.');
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;

