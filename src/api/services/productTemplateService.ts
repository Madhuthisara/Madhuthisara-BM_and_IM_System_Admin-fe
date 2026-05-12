import { AxiosRequestConfig } from 'axios';
import axiosInstance from '../axiosInstance';
import { API_ENDPOINTS } from '../endpoints';
import {
    ProductTemplateResponse,
    ProductTemplatesListResponse,
    CreateProductTemplatePayload,
    UpdateProductTemplatePayload
} from '../../types/productTemplate';

export const productTemplateService = {
    getAllTemplates: async (businessId: string, config?: AxiosRequestConfig): Promise<ProductTemplatesListResponse> => {
        const response = await axiosInstance.get(`${API_ENDPOINTS.PRODUCT_TEMPLATES.ALL}?business_id=${businessId}`, config);
        return response.data;
    },

    createTemplate: async (payload: CreateProductTemplatePayload, config?: AxiosRequestConfig): Promise<ProductTemplateResponse> => {
        const response = await axiosInstance.post(API_ENDPOINTS.PRODUCT_TEMPLATES.CREATE, payload, config);
        return response.data;
    },

    updateTemplate: async (payload: UpdateProductTemplatePayload, config?: AxiosRequestConfig): Promise<ProductTemplateResponse> => {
        const response = await axiosInstance.put(API_ENDPOINTS.PRODUCT_TEMPLATES.UPDATE, payload, config);
        return response.data;
    },

    deleteTemplate: async (id: string, config?: AxiosRequestConfig): Promise<{ success: boolean; message: string }> => {
        const response = await axiosInstance.delete(`${API_ENDPOINTS.PRODUCT_TEMPLATES.DELETE}?id=${id}`, config);
        return response.data;
    },
};
