package dev.datile.dto.reports;

import java.math.BigDecimal;

public record ReportPurchaseDto(
        Long purchaseId,
        String purchase,
        Integer quantity,
        BigDecimal price,
        BigDecimal shipping,
        BigDecimal outprice
) {
}