export interface Category {
    id: string;
    business_id: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface CreateCategoryPayload {
    business_id: string;
    name: string;
}

export interface UpdateCategoryPayload {
    id: string;
    name: string;
}

export interface CategoryResponse {
    success: boolean;
    message: string;
    output: Category;
}

export interface CategoriesListResponse {
    success: boolean;
    message: string;
    output: Category[];
}
