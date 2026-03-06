export type ErrandsResponse = {
    errands: ErrandListItem[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
};

export type ErrandListItem = {
    errandId: number;
    createdAt: string;
    title: string;
    description?: string | null;

    status: { statusId: number; name: string };

    // needed for card colors
    priority?: { priorityId: number; name: string; color: string } | null;

    // preview from server (maximum 2)
    historyPreview?: { description: string; verifiedName: string; createdAt: string }[];

    // (comes later)
    assignee?: { assigneeId: number; name: string } | null;
    customer?: { customerId: number; name: string } | null;
    contact?: {
        contactId: number;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        mail: string;
    } | null;
}

/* A new type for ErrandDetails which will present full data for the modal */

export type ErrandHistoryItem = {
    description: string;
    verifiedName: string;
    createdAt: string;
};

export type ErrandDetails = {
    errandId: number;
    createdAt: string;
    title: string;
    description?: string | null;

    status: {
        statusId: number;
        name: string;
    };

    priority?: {
        priorityId: number;
        name: string;
        color: string;
    } | null;

    history?: ErrandHistoryItem[];

    assignee?: {
        assigneeId: number;
        name: string;
    } | null;

    customer?: {
        customerId: number;
        name: string;
    } | null;

    contact?: {
        contactId: number;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        mail: string;
    } | null;

    timeSpent?: number | null;
    agreedPrice?: number | null;
};