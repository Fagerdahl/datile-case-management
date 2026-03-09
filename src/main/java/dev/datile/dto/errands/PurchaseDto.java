package dev.datile.dto.errands;

import java.math.BigDecimal;

public class PurchaseDto {

    public Long purchaseId;
    public String itemName;
    public Integer quantity;
    public BigDecimal purchasePrice;
    public BigDecimal shippingCost;
    public BigDecimal salePrice;
    public BigDecimal totalPurchaseCost;
    public BigDecimal totalSaleValue;
    public BigDecimal profit;

    public PurchaseDto(
            Long purchaseId,
            String itemName,
            Integer quantity,
            BigDecimal purchasePrice,
            BigDecimal shippingCost,
            BigDecimal salePrice,
            BigDecimal totalPurchaseCost,
            BigDecimal totalSaleValue,
            BigDecimal profit
    ) {
        this.purchaseId = purchaseId;
        this.itemName = itemName;
        this.quantity = quantity;
        this.purchasePrice = purchasePrice;
        this.shippingCost = shippingCost;
        this.salePrice = salePrice;
        this.totalPurchaseCost = totalPurchaseCost;
        this.totalSaleValue = totalSaleValue;
        this.profit = profit;
    }
}