import { Material } from './material';
import { AttributeOption } from './attribute';

export interface MaterialStockAttributeOption extends AttributeOption {
    pivot: {
        stock_id: string;
        option_id: string;
    };
}

export interface MaterialStock {
    stock_id: string;
    business_id: string;
    material_id: string;
    quantity: string;
    reorder_level: string;
    sku: string;
    created_at: string;
    updated_at: string;
    material: Material;
    attribute_options: MaterialStockAttributeOption[];
}

export interface CreateMaterialStockPayload {
    business_id: string;
    material_id: string;
    quantity: number;
    reorder_level: number;
    sku: string;
    attribute_options: string[]; // Array of option IDs
}

export interface UpdateMaterialStockPayload {
    stock_id: string;
    quantity: number;
    reorder_level: number;
    sku: string;
    attribute_options: string[]; // Array of option IDs
}

export interface MaterialStockResponse {
    success: boolean;
    message: string;
    output: MaterialStock;
}

export interface MaterialStocksListResponse {
    success: boolean;
    message: string;
    output: MaterialStock[];
}
