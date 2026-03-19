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

export const fetchContacts = async (): Promise<ContactListItem[]> => {
    return apiClient.get<ContactListItem[]>("/api/contacts");
};