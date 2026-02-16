package com.team_management.server.controllers;

import com.team_management.server.dtos.TeamMemberRequest;
import com.team_management.server.dtos.TeamMemberResponse;
import com.team_management.server.entities.TeamMember;
import com.team_management.server.mapper.TeamMemberMapper;
import com.team_management.server.services.TeamMemberService;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/team-members")
public class TeamMemberController {

    private final TeamMemberService service;

    public TeamMemberController(TeamMemberService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<TeamMemberResponse>> list(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String role,
            @RequestParam(required = false, name = "function") String function
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(service.get(q,role,function).stream().map(TeamMemberMapper::toTeamMemberResponse).toList());
    }

    @PostMapping
    public ResponseEntity<TeamMemberResponse> create(@Valid @RequestBody TeamMemberRequest req) {
        TeamMember saved = service.create(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(TeamMemberMapper.toTeamMemberResponse(saved));
    }

    @PutMapping("/{id}")
    public TeamMemberResponse update(@PathVariable Long id, @Valid @RequestBody TeamMemberRequest req) {
        return TeamMemberMapper.toTeamMemberResponse(service.update(id, req));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

}

