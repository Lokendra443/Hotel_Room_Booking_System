package com.lenncoder.hotel.repository;

import com.lenncoder.hotel.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepo extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String role);

    boolean existsByName(Role role);

}
