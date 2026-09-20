package dev.datile.service;

import dev.datile.domain.Product;
import dev.datile.dto.products.NewProductDto;
import dev.datile.dto.products.ProductDto;
import dev.datile.dto.products.UpdateProductDto;
import dev.datile.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductDto> getProducts() {
        return productRepository.findAll()
                .stream()
                .map(product -> new ProductDto(
                        product.getId(),
                        product.getArticleNumber(),
                        product.getTitle()
                ))
                .toList();
    }

    public ProductDto createProduct(NewProductDto dto) {

        Product product = new Product(
                dto.articleNumber(),
                dto.title()
        );

        Product saved = productRepository.save(product);

        return new ProductDto(
                saved.getId(),
                saved.getArticleNumber(),
                saved.getTitle()
        );
    }

    public ProductDto updateProduct(
            Long id,
            UpdateProductDto dto
    ) {

        Product product = productRepository
                .findById(id)
                .orElseThrow();

        product.setArticleNumber(dto.articleNumber());
        product.setTitle(dto.title());

        Product saved =
                productRepository.save(product);

        return new ProductDto(
                saved.getId(),
                saved.getArticleNumber(),
                saved.getTitle()
        );
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public List<ProductDto> searchProducts(String q) {

        return productRepository
                .findByArticleNumberContainingIgnoreCaseOrTitleContainingIgnoreCase(
                        q,
                        q
                )
                .stream()
                .map(product -> new ProductDto(
                        product.getId(),
                        product.getArticleNumber(),
                        product.getTitle()
                ))
                .toList();
    }
}