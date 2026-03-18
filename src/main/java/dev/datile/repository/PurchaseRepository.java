package dev.datile.repository;

import dev.datile.domain.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {

    List<Purchase> findByErrand_ErrandIdIn(Collection<Long> errandIds);

    List<Purchase> findByErrand_ErrandId(Long errandId);
}