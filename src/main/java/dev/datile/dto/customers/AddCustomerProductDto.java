package dev.datile.dto.customers;

public record AddCustomerProductDto(
        String articleNumber,
        String title,
        int amount
) {
}