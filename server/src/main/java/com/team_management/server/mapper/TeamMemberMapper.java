package com.team_management.server.mapper;

import com.team_management.server.dtos.TeamMemberRequest;
import com.team_management.server.dtos.TeamMemberResponse;
import com.team_management.server.entities.TeamMember;

public class TeamMemberMapper {

    public static TeamMemberResponse toTeamMemberResponse(TeamMember teamMember){
        return new TeamMemberResponse(
                teamMember.getId(),
                teamMember.getFullName(),
                teamMember.getEmail(),
                teamMember.getFunction(),
                teamMember.getRole(),
                teamMember.getCreatedAt(),
                teamMember.getUpdatedAt()
        );
    }

    public static TeamMember toTeamMember(TeamMemberRequest req){
        return new TeamMember(
            req.id(),
            req.fullName(),
            req.email(),
            req.function(),
            req.role()
        );
    }

}
