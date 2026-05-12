import { AxiosRequestConfig } from 'axios';
import axiosInstance from '../axiosInstance';
import { API_ENDPOINTS } from '../endpoints';
import {
    ProductStockResponse,
    ProductStocksListResponse,
    CreateProductStockPayload
} from '../../types/productStock';

export const productStockService = {
    getAllStocks: async (businessId: string, config?: AxiosRequestConfig): Promise<ProductStocksListResponse> => {
        const response = await axiosInstance.get(`${API_ENDPOINTS.PRODUCT_STOCKS.ALL}?business_id=${businessId}`, config);
        return response.data;
    },

    createStock: async (payload: CreateProductStockPayload, config?: AxiosRequestConfig): Promise<ProductStockResponse> => {
        const response = await axiosInstance.post(API_ENDPOINTS.PRODUCT_STOCKS.CREATE, payload, config);
        return response.data;
    },

    deleteStock: async (id: string, config?: AxiosRequestConfig): Promise<{ success: boolean; message: string }> => {
        const response = await axiosInstance.delete(`${API_ENDPOINTS.PRODUCT_STOCKS.DELETE}?id=${id}`, config);
        return response.data;
    },
};
