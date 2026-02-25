package com.team_management.server.service;

import com.team_management.server.dtos.TeamMemberRequest;
import com.team_management.server.entities.TeamMember;
import com.team_management.server.exceptionHandlers.exceptions.ConflictException;
import com.team_management.server.exceptionHandlers.exceptions.NotFoundException;
import com.team_management.server.repository.TeamMemberRepository;
import com.team_management.server.services.TeamMemberService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TeamMemberServiceTest {

    @Mock
    private TeamMemberRepository repo;

    @InjectMocks
    private TeamMemberService service;

    // create

    @Test
    void createShouldSucceedWhenInputValid() {

        TeamMemberRequest request = new TeamMemberRequest(
                null,
                "Sanjay Sakthivel",
                "sanjay@gmail.com",
                "ENGINEERING",
                "ADMIN"
        );

        when(repo.existsByEmailIgnoreCase("sanjay@gmail.com"))
                .thenReturn(false);

        TeamMember saved = new TeamMember();
        saved.setId(1L);

        when(repo.save(any(TeamMember.class)))
                .thenReturn(saved);

        TeamMember result = service.create(request);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(repo).save(any(TeamMember.class));
    }

    @Test
    void createShouldFailWhenFullNameTooShort() {

        TeamMemberRequest request = new TeamMemberRequest(
                null,
                "S",
                "ss@gmail.com",
                "ENGINEERING",
                "ADMIN"
        );

        assertThrows(IllegalArgumentException.class,
                () -> service.create(request));

        verify(repo, never()).save(any());
    }

    @Test
    void createShouldFailWhenEmailInvalid() {

        TeamMemberRequest request = new TeamMemberRequest(
                null,
                "Sanjay Sakthivel",
                "123@gmail",
                "ENGINEERING",
                "ADMIN"
        );

        assertThrows(IllegalArgumentException.class,
                () -> service.create(request));

        verify(repo, never()).save(any());
    }

    @Test
    void createShouldFailWhenEmailAlreadyExists() {

        TeamMemberRequest request = new TeamMemberRequest(
                null,
                "Sanjay Sakthivel",
                "sanjay@gmail.com",
                "ENGINEERING",
                "ADMIN"
        );

        when(repo.existsByEmailIgnoreCase("sanjay@gmail.com"))
                .thenReturn(true);

        assertThrows(ConflictException.class,
                () -> service.create(request));

        verify(repo, never()).save(any());
    }

    // update

    @Test
    void updateShouldSucceedWhenValid() {

        Long id = 1L;

        TeamMember existing = new TeamMember();
        existing.setId(id);
        existing.setEmail("sanjay@gmail.com");

        TeamMemberRequest request = new TeamMemberRequest(
                null,
                "Sanjay S",
                "sanjays@gmail.com",
                "PRODUCT",
                "CONTRIBUTOR"
        );

        when(repo.findById(id))
                .thenReturn(Optional.of(existing));

        when(repo.existsByEmailIgnoreCaseAndIdNot("sanjays@gmail.com", id))
                .thenReturn(false);

        when(repo.save(existing))
                .thenReturn(existing);

        TeamMember result = service.update(id, request);

        assertNotNull(result);
        assertEquals("Sanjay S", existing.getFullName());
        verify(repo).save(existing);
    }

    @Test
    void updateShouldFailWhenIdNotFound() {

        when(repo.findById(99L))
                .thenReturn(Optional.empty());

        TeamMemberRequest request = new TeamMemberRequest(
                null,
                "Sanjay Sakthivel",
                "sanjays@gmail.com",
                "ENGINEERING",
                "ADMIN"
        );

        assertThrows(NotFoundException.class,
                () -> service.update(99L, request));

        verify(repo, never()).save(any());
    }

    @Test
    void updateShouldFailWhenEmailAlreadyUsedByAnotherMember() {

        Long id = 1L;

        TeamMember existing = new TeamMember();
        existing.setId(id);

        TeamMemberRequest request = new TeamMemberRequest(
                null,
                "Sanjay Sakthivel",
                "sanjays@gmail.com",
                "ENGINEERING",
                "ADMIN"
        );

        when(repo.findById(id))
                .thenReturn(Optional.of(existing));

        when(repo.existsByEmailIgnoreCaseAndIdNot("sanjays@gmail.com", id))
                .thenReturn(true);

        assertThrows(ConflictException.class,
                () -> service.update(id, request));

        verify(repo, never()).save(any());
    }

    // delete

    @Test
    void deleteShouldSucceedWhenExists() {

        when(repo.existsById(1L))
                .thenReturn(true);

        service.delete(1L);

        verify(repo).deleteById(1L);
    }
}
