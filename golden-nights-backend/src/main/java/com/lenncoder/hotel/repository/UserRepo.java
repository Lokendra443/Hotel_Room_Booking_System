package com.lenncoder.hotel.repository;

import com.lenncoder.hotel.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    void deleteByEmail(String email);

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);
}
