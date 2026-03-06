package dev.datile.dto.errands;

public record ContactDto(
        Long contactId,
        String firstName,
        String lastName,
        String phoneNumber,
        String mail
) {
}