import {apiClient} from "../services/apiClient";

export type CustomerProduct = {
    id: number;
    articleNumber: string;
    title: string;
    amount: number;
};

export type AddCustomerProductRequest = {
    articleNumber: string;
    title: string;
    amount: number;
};

export async function fetchCustomerProducts(
    customerId: number,
): Promise<CustomerProduct[]> {

    return await apiClient.get<CustomerProduct[]>(
        `/api/customer-products/${customerId}`
    );
}

export async function addCustomerProduct(
    customerId: number,
    request: AddCustomerProductRequest,
): Promise<void> {

    await apiClient.post<void>(
        `/api/customer-products/${customerId}`,
        request,
    );
}

export async function deleteCustomerProduct(
    id: number,
): Promise<void> {

    await apiClient.delete<void>(
        `/api/customer-products/${id}`
    );
}

export async function updateCustomerProductAmount(
    id: number,
    amount: number
) {
    await apiClient.put(
        `/api/customer-products/${id}`,
        { amount }
    );
}