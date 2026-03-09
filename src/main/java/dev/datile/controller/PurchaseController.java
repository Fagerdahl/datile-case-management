package dev.datile.controller;

import dev.datile.domain.Errand;
import dev.datile.domain.Purchase;
import dev.datile.dto.errands.CreatePurchaseDto;
import dev.datile.dto.errands.PurchaseDto;
import dev.datile.repository.ErrandRepository;
import dev.datile.repository.PurchaseRepository;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/errands")
public class PurchaseController {

    private final PurchaseRepository purchaseRepository;
    private final ErrandRepository errandRepository;

    public PurchaseController(PurchaseRepository purchaseRepository, ErrandRepository errandRepository) {
        this.purchaseRepository = purchaseRepository;
        this.errandRepository = errandRepository;
    }

    @PostMapping("/{id}/purchases")
    public PurchaseDto addPurchase(
            @PathVariable Long id,
            @Valid @RequestBody CreatePurchaseDto request
    ) {
        Errand errand = errandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Errand not found"));

        Purchase purchase = new Purchase(
                errand,
                request.itemName,
                request.quantity,
                request.purchasePrice,
                request.shippingCost,
                request.salePrice
        );

        Purchase savedPurchase = purchaseRepository.save(purchase);

        return new PurchaseDto(
                savedPurchase.getPurchaseId(),
                savedPurchase.getItemName(),
                savedPurchase.getQuantity(),
                savedPurchase.getPurchasePrice(),
                savedPurchase.getShippingCost(),
                savedPurchase.getSalePrice(),
                savedPurchase.getTotalPurchaseCost(),
                savedPurchase.getTotalSaleValue(),
                savedPurchase.getProfit()
        );
    }
}