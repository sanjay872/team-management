package com.team_management.server.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;

public record TeamMemberRequest(
        Long id,
        @NotBlank @Size(max = 120) String fullName,
        @NotBlank @Email @Size(max = 255) String email,
        @NotNull @JsonProperty("function") String function,
        @NotNull String role
) {}
