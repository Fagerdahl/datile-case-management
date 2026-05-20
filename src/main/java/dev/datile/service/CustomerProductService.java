package dev.datile.service;

import dev.datile.domain.Customer;
import dev.datile.domain.CustomerProduct;
import dev.datile.domain.Product;
import dev.datile.dto.customers.AddCustomerProductDto;
import dev.datile.dto.customers.CustomerProductDto;
import dev.datile.repository.CustomerProductRepository;
import dev.datile.repository.CustomerRepository;
import dev.datile.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerProductService {

    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final CustomerProductRepository customerProductRepository;

    public CustomerProductService(
            CustomerRepository customerRepository,
            ProductRepository productRepository,
            CustomerProductRepository customerProductRepository
    ) {
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
        this.customerProductRepository = customerProductRepository;
    }

    public List<CustomerProductDto> getCustomerProducts(Long customerId) {

        return customerProductRepository
                .findByCustomerCustomerId(customerId)
                .stream()
                .map(cp -> new CustomerProductDto(
                        cp.getId(),
                        cp.getProduct().getArticleNumber(),
                        cp.getProduct().getTitle(),
                        cp.getAmount()
                ))
                .toList();
    }

    public void addProductToCustomer(
            Long customerId,
            AddCustomerProductDto dto
    ) {

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow();

        Product product = productRepository
                .findByArticleNumber(dto.articleNumber())
                .orElseGet(() -> {

                    Product newProduct = new Product(
                            dto.articleNumber(),
                            dto.title()
                    );

                    return productRepository.save(newProduct);
                });

        CustomerProduct customerProduct =
                new CustomerProduct(
                        customer,
                        product,
                        dto.amount()
                );

        customerProductRepository.save(customerProduct);
    }

    public void deleteCustomerProduct(Long id) {
        customerProductRepository.deleteById(id);
    }
}