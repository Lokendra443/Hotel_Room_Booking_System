package com.lenncoder.hotel.service.impl;
import com.lenncoder.hotel.entity.Role;
import com.lenncoder.hotel.entity.User;
import com.lenncoder.hotel.exception.UserAlreadyExistsException;
import com.lenncoder.hotel.repository.RoleRepo;
import com.lenncoder.hotel.repository.UserRepo;
import com.lenncoder.hotel.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(User user) {
        if (userRepo.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistsException(user.getEmail() + " already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role userRole = roleRepo.findByName("ROLE_USER").get();
        user.setRoles(Collections.singletonList(userRole));
        return userRepo.save(user);

    }


    @Override
    public List<User> getUsers() {
        return userRepo.findAll();
    }

    @Transactional
    @Override
    public void deleteUser(String email) {
        User theUser = getUser(email);
        if(theUser != null) {
            userRepo.delete(theUser);
        }
    }

    @Override
    public User getUser(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

}



