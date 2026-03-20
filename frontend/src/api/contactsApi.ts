import { apiClient } from "../services/apiClient";

export type ContactListItem = {
    contactId: number;
    firstName: string;
    lastName: string;
    mail: string | null;
    phoneNumber: string | null;
    customerId: number;
    customerName: string | null;
};

export type CreateContactPayload = {
    firstName: string;
    lastName: string;
    mail: string;
    phoneNumber: string;
    customerId: number;
};

export const fetchContacts = async (): Promise<ContactListItem[]> => {
    return apiClient.get<ContactListItem[]>("/api/contacts");
};


export const createContact = async (
    payload: CreateContactPayload,
): Promise<ContactListItem> => {
    return apiClient.post<ContactListItem>("/api/contacts", payload);
};