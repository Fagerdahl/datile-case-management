package dev.datile.repository;

import dev.datile.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByArticleNumber(String articleNumber);

    List<Product> findByArticleNumberContainingIgnoreCase(
            String articleNumber
    );
}
