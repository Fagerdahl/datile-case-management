package dev.datile.dto.errands;

import java.math.BigDecimal;

import jakarta.validation.constraints.*;

public class CreatePurchaseDto {

    @NotBlank
    public String itemName;

    @Min(1)
    public Integer quantity;

    @NotNull
    @DecimalMin("0.00")
    public BigDecimal purchasePrice;

    @NotNull
    @DecimalMin("0.00")
    public BigDecimal shippingCost;

    @NotNull
    @DecimalMin("0.00")
    public BigDecimal salePrice;
}