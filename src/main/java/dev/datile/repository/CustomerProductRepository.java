package dev.datile.repository;

import dev.datile.domain.Customer;
import dev.datile.domain.CustomerProduct;
import dev.datile.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CustomerProductRepository
        extends JpaRepository<CustomerProduct, Long> {

    List<CustomerProduct> findByCustomerCustomerId(Long customerId);

    Optional<CustomerProduct> findByCustomerAndProduct(
            Customer customer,
            Product product
    );
}