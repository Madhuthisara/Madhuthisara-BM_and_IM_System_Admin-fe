import axiosInstance from '../axiosInstance';
import { API_ENDPOINTS } from '../endpoints';

export interface OrderStatusData {
    id: string;
    business_id: string;
    name: string;
    color: string;
    created_at: string;
    updated_at: string;
}

export interface OrderStatusResponse {
    success: boolean;
    message: string;
    output: OrderStatusData[];
}

export const orderStatusService = {
    getAll: async (businessId: string): Promise<OrderStatusResponse> => {
        const response = await axiosInstance.get(API_ENDPOINTS.ORDER_STATUSES.ALL, {
            params: { business_id: businessId },
        });
        return response.data;
    },

    create: async (data: { business_id: string; name: string; color?: string }) => {
        const response = await axiosInstance.post(API_ENDPOINTS.ORDER_STATUSES.CREATE, data);
        return response.data;
    },

    update: async (data: { id: string; name?: string; color?: string }) => {
        const response = await axiosInstance.put(API_ENDPOINTS.ORDER_STATUSES.UPDATE, data);
        return response.data;
    },

    delete: async (id: string) => {
        const response = await axiosInstance.delete(API_ENDPOINTS.ORDER_STATUSES.DELETE, {
            params: { id },
        });
        return response.data;
    },
};
