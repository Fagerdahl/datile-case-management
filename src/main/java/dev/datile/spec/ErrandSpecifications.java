package dev.datile.spec;

import dev.datile.domain.Errand;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

/* This will hold the building blocks for filtering in our DB */

public final class ErrandSpecifications {

    private ErrandSpecifications() {
    }

    public static Specification<Errand> hasStatuses(List<String> statuses) {
        return (root, query, cb) -> {
            if (statuses == null || statuses.isEmpty()) {
                return cb.conjunction();
            }

            final var loweredStatuses = statuses.stream()
                    .map(String::toLowerCase)
                    .toList();

            return cb.lower(root.get("status").get("name")).in(loweredStatuses);
        };
    }

    public static Specification<Errand> hasPriorities(List<String> priorities) {
        return (root, query, cb) -> {
            if (priorities == null || priorities.isEmpty()) {
                return cb.conjunction();
            }

            final var loweredPriorities = priorities.stream()
                    .map(String::toLowerCase)
                    .toList();

            return cb.lower(root.get("priority").get("name")).in(loweredPriorities);
        };
    }

    public static Specification<Errand> hasAssigneeId(Long assigneeId) {
        return (root, query, cb) -> {
            if (assigneeId == null) {
                return cb.conjunction();
            }

            return cb.equal(
                    root.get("assignee").get("assigneeId"),
                    assigneeId
            );
        };
    }

    public static Specification<Errand> hasCustomerId(Long customerId) {
        return (root, query, cb) -> {
            if (customerId == null) {
                return cb.conjunction();
            }

            return cb.equal(
                    root.get("customer").get("customerId"),
                    customerId
            );
        };
    }

    public static Specification<Errand> matchesSearch(String q) {
        return (root, query, cb) -> {
            if (q == null || q.isBlank()) {
                return cb.conjunction();
            }

            String[] terms = q.toLowerCase().trim().split("\\s+");

            var predicates = new java.util.ArrayList<jakarta.persistence.criteria.Predicate>();

            for (String term : terms) {
                String pattern = "%" + term + "%";

                predicates.add(
                        cb.or(
                                cb.like(cb.lower(root.get("title")), pattern),
                                cb.like(cb.lower(root.get("description")), pattern),
                                cb.like(cb.lower(root.get("status").get("name")), pattern),
                                cb.like(cb.lower(root.get("priority").get("name")), pattern),
                                cb.like(cb.lower(root.get("assignee").get("name")), pattern),
                                cb.like(cb.lower(root.get("customer").get("name")), pattern),
                                cb.like(cb.lower(root.get("contact").get("firstName")), pattern),
                                cb.like(cb.lower(root.get("contact").get("lastName")), pattern)
                        )
                );
            }

            return cb.and(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        };
    }
}