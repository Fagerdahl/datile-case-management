package dev.datile.repository;

import dev.datile.domain.Errand;
import dev.datile.domain.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

/* ErrandRepository is the Spring Data JPA
 * That basically means that we don´t have to write pure SQL in java to find stuff
 * Spring gives us everything for free - findAll(Pageable)
 * Repository = "DB-Access"
 *  */

public interface ErrandRepository extends JpaRepository<Errand, Long>, JpaSpecificationExecutor<Errand> {
    @Modifying
    @Query("UPDATE Errand e SET e.status = :toStatus WHERE e.status = :fromStatus")
    int bulkUpdateStatus(Status fromStatus, Status toStatus);
}