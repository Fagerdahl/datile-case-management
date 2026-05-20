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