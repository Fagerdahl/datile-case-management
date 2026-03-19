import type { SelectOption } from "../types/selectOption";
import type {
    AssigneeLookup,
    CustomerLookup,
    PriorityLookup,
    StatusLookup,
} from "../api/LookupsApi";

export const toCustomerOptions = (customers: CustomerLookup[]): SelectOption[] =>
    customers.map((customer) => ({
        value: customer.customerId,
        label: customer.name,
    }));

export const toAssigneeOptions = (assignees: AssigneeLookup[]): SelectOption[] =>
    assignees.map((assignee) => ({
        value: assignee.assigneeId,
        label: assignee.name,
    }));

export const toStatusOptions = (statuses: StatusLookup[]): SelectOption[] =>
    statuses.map((status) => ({
        value: status.statusId,
        label: status.name,
    }));

export const toPriorityOptions = (priorities: PriorityLookup[]): SelectOption[] =>
    priorities.map((priority) => ({
        value: priority.priorityId,
        label: priority.name,
    }));