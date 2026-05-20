package dev.datile.repository;

import dev.datile.domain.CustomerProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerProductRepository
        extends JpaRepository<CustomerProduct, Long> {

    List<CustomerProduct> findByCustomerCustomerId(Long customerId);

}