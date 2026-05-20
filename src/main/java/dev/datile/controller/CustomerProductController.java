package dev.datile.controller;

import dev.datile.dto.customers.AddCustomerProductDto;
import dev.datile.dto.customers.CustomerProductDto;
import dev.datile.service.CustomerProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer-products")
public class CustomerProductController {

    private final CustomerProductService service;

    public CustomerProductController(CustomerProductService service) {
        this.service = service;
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<List<CustomerProductDto>> getCustomerProducts(
            @PathVariable Long customerId
    ) {

        return ResponseEntity.ok(
                service.getCustomerProducts(customerId)
        );
    }

    @PostMapping("/{customerId}")
    public ResponseEntity<Void> addProduct(
            @PathVariable Long customerId,
            @RequestBody AddCustomerProductDto dto
    ) {

        service.addProductToCustomer(customerId, dto);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomerProduct(
            @PathVariable Long id
    ) {

        service.deleteCustomerProduct(id);

        return ResponseEntity.noContent().build();
    }
}