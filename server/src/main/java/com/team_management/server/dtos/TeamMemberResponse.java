package com.team_management.server.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.Instant;

public record TeamMemberResponse(
        Long id,
        String fullName,
        String email,
        @JsonProperty("function") String function,
        String role,
        Instant createdAt,
        Instant updatedAt
) {}