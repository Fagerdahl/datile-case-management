package dev.datile.repository;

import dev.datile.domain.Errand;
import dev.datile.domain.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.Instant;

/* ErrandRepository is the Spring Data JPA
 * That basically means that we don´t have to write pure SQL in java to find stuff
 * Spring gives us everything for free - findAll(Pageable)
 * Repository = "DB-Access"
 *  */

public interface ErrandRepository extends JpaRepository<Errand, Long>, JpaSpecificationExecutor<Errand> {
    @Modifying
    @Query("""
            UPDATE Errand e
            SET e.status = :toStatus
            WHERE e.status = :fromStatus
            """)
    int bulkUpdateStatus(
            @Param("fromStatus") Status fromStatus,
            @Param("toStatus") Status toStatus
    );

    @Modifying
    @Query("""
            UPDATE Errand e
            SET e.status = :toStatus
            WHERE e.status = :fromStatus
              AND e.createdAt >= :startInclusive
              AND e.createdAt < :endExclusive
            """)
    int bulkUpdateStatusWithinDateRange(
            @Param("fromStatus") Status fromStatus,
            @Param("toStatus") Status toStatus,
            @Param("startInclusive") Instant startInclusive,
            @Param("endExclusive") Instant endExclusive
    );
}