package com.team_management.server.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@Table(
        name = "team_members",
        uniqueConstraints = @UniqueConstraint(name = "uk_team_members_email", columnNames = "email")
)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TeamMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false, length = 120)
    private String fullName;

    @Column(nullable = false, length = 255)
    private String email;

    // stored as member_function in DB, exposed as "function" in API DTOs
    @Column(name = "member_function", nullable = false, length = 50)
    private String function;

    @Column(nullable = false, length = 50)
    private String role;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    public TeamMember(Long id, String fullName, String email, String function, String role) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.function = function;
        this.role = role;
    }
}
