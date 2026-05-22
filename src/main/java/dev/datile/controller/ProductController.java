package dev.datile.controller;

import dev.datile.dto.products.NewProductDto;
import dev.datile.dto.products.ProductDto;
import dev.datile.dto.products.UpdateProductDto;
import dev.datile.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductDto>> getProducts() {
        return ResponseEntity.ok(productService.getProducts());
    }

    @PostMapping
    public ResponseEntity<ProductDto> createProduct(
            @RequestBody NewProductDto dto
    ) {
        return ResponseEntity.ok(
                productService.createProduct(dto)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable Long id
    ) {

        productService.deleteProduct(id);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> updateProduct(
            @PathVariable Long id,
            @RequestBody UpdateProductDto dto
    ) {

        return ResponseEntity.ok(
                productService.updateProduct(id, dto)
        );
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductDto>> searchProducts(
            @RequestParam String q
    ) {

        return ResponseEntity.ok(
                productService.searchProducts(q)
        );
    }
}