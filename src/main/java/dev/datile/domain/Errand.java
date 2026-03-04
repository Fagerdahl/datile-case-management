package dev.datile.domain;

import jakarta.persistence.*;

import java.time.Instant;

/* (JPA ENTITY)
 * This defines how an errand is supposed to look in the DB
 */

@Entity
@Table(name = "errands")
public class Errand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "errand_id")
    private Long errandId;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(nullable = false)
    private String title;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "status_id", nullable = false)
    private Status status;

    protected Errand() {
    }

    public Errand(String title, Status status, Instant createdAt) {
        this.title = title;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getErrandId() {
        return errandId;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public String getTitle() {
        return title;
    }

    public Status getStatus() {
        return status;
    }
}