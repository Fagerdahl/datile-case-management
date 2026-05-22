import {apiClient} from "../services/apiClient";

export type Product = {
    id: number;
    articleNumber: string;
    title: string;
};

export async function searchProducts(
    query: string,
): Promise<Product[]> {

    return await apiClient.get<Product[]>(
        `/api/products/search?q=${query}`
    );
}

export type ProductDraft = {
    articleNumber: string;
    title: string;
};

export async function fetchProducts() {
    return await apiClient.get<Product[]>(
        "/api/products"
    );
}

export async function createProduct(
    draft: ProductDraft
) {
    return await apiClient.post<Product>(
        "/api/products",
        draft
    );
}

export async function updateProduct(
    id: number,
    draft: ProductDraft
) {
    return await apiClient.put<Product>(
        `/api/products/${id}`,
        draft
    );
}

export async function deleteProduct(
    id: number
) {
    return await apiClient.delete(
        `/api/products/${id}`
    );
}