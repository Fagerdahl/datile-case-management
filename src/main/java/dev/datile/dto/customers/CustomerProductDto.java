package dev.datile.dto.customers;

public record CustomerProductDto(
        Long id,
        String articleNumber,
        String title,
        int amount
) {
}
