package com.team_management.server.specifications;

import com.team_management.server.entities.TeamMember;
import org.springframework.data.jpa.domain.Specification;

public class TeamMemberSpecification {

    public static Specification<TeamMember> q(String q) {
        if (q == null || q.isBlank()) return null;
        String like = "%" + q.trim().toLowerCase() + "%";
        return (root, query, cb) -> cb.or(
                cb.like(cb.lower(root.get("fullName")), like),
                cb.like(cb.lower(root.get("email")), like)
        );
    }

    public static Specification<TeamMember> role(String role) {
        if (role == null) return null;
        return (root, query, cb) -> cb.equal(root.get("role"), role);
    }

    public static Specification<TeamMember> function(String fn) {
        if (fn == null) return null;
        return (root, query, cb) -> cb.equal(root.get("function"), fn);
    }
}
