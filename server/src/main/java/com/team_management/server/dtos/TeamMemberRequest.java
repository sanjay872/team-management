package com.team_management.server.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.team_management.server.enums.TeamFunction;
import com.team_management.server.enums.TeamRole;
import jakarta.validation.constraints.*;

public record TeamMemberRequest(
        Long id,
        @NotBlank @Size(max = 120) String fullName,
        @NotBlank @Email @Size(max = 255) String email,
        @NotNull @JsonProperty("function") TeamFunction function,
        @NotNull TeamRole role
) {}
