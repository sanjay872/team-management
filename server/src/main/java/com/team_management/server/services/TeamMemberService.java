package com.team_management.server.services;

import com.team_management.server.dtos.TeamMemberRequest;
import com.team_management.server.dtos.TeamMemberResponse;
import com.team_management.server.entities.TeamMember;
import com.team_management.server.enums.TeamFunction;
import com.team_management.server.enums.TeamRole;
import com.team_management.server.exceptionHandlers.exceptions.ConflictException;
import com.team_management.server.exceptionHandlers.exceptions.NotFoundException;
import com.team_management.server.mapper.TeamMemberMapper;
import com.team_management.server.repository.TeamMemberRepository;
import com.team_management.server.specifications.TeamMemberSpecification;
import org.jspecify.annotations.NonNull;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TeamMemberService {
    private final TeamMemberRepository repo;

    public TeamMemberService(TeamMemberRepository repo) {
        this.repo = repo;
    }

    @Transactional
    public TeamMember create(TeamMemberRequest req) {
        if (repo.existsByEmailIgnoreCase(req.email())) {
            throw new ConflictException("Email already exists");
        }

        if(req.id()!=null){
            throw new ConflictException("Id already exist!");
        }

        TeamMember teamMember=TeamMemberMapper.toTeamMember(req);

        return repo.save(teamMember);
    }

    public List<TeamMember> get(String q, TeamRole role, TeamFunction function) {
        Specification<TeamMember> spec = Specification.unrestricted();

        if (q != null && !q.isBlank()) {
            spec = spec.and(TeamMemberSpecification.q(q));
        }

        if (role != null) {
            spec = spec.and(TeamMemberSpecification.role(role));
        }

        if (function != null) {
            spec = spec.and(TeamMemberSpecification.function(function));
        }

        return repo.findAll(spec);
    }

    @Transactional
    public TeamMember update(Long id, TeamMemberRequest req) {
        TeamMember tm = repo.findById(id).orElseThrow(() -> new NotFoundException("Team member not found"));

        if (repo.existsByEmailIgnoreCaseAndIdNot(req.email(), id)) {
            throw new ConflictException("Email already exists");
        }

        return repo.save(TeamMemberMapper.toTeamMember(req));
    }

    @Transactional
    public void delete(Long id) {
        if (!repo.existsById(id)) throw new NotFoundException("Team member not found");
        repo.deleteById(id);
    }
}

