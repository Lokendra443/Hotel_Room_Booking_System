package com.lenncoder.hotel.service.impl;

import com.lenncoder.hotel.entity.Role;
import com.lenncoder.hotel.entity.User;
import com.lenncoder.hotel.exception.RoleAlreadyExistException;
import com.lenncoder.hotel.exception.UserAlreadyExistsException;
import com.lenncoder.hotel.repository.RoleRepo;
import com.lenncoder.hotel.repository.UserRepo;
import com.lenncoder.hotel.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.management.relation.RoleNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepo roleRepo;
    private final UserRepo userRepo;


    @Override
    public List<Role> getRoles() {
        return roleRepo.findAll();
    }

    @Override
    public Role createRole(Role theRole) {
        String roleName = "ROLE_" + theRole.getName().toUpperCase();

        if(roleRepo.existsByName(roleName)){
            throw new RoleAlreadyExistException(theRole.getName()+ " role already exists");
        }
        Role role = new Role(roleName);
        return roleRepo.save(role);

    }

    @Override
    public void deleteRole(Long roleId) throws RoleNotFoundException {
        this.removeAllUsersFromRole(roleId);
        roleRepo.deleteById(roleId);

    }

    @Override
    public Role findByName(String name) {
        return roleRepo.findByName(name).get();
    }

    @Override
    public User removeUserFromRole(Long userId, Long roleId) {
        Optional<User> user = userRepo.findById(userId);
        Optional<Role> role = roleRepo.findById(roleId);

        if(role.isPresent() && role.get().getUsers().contains(user.get())){
            role.get().removeUserFromRole(user.get());
            roleRepo.save(role.get());
            return user.get();
        }
        throw new UsernameNotFoundException("User not found");

    }

    @Override
    public User assignRoleToUser(Long userId, Long roleId) {
        Optional<User> user = userRepo.findById(userId);
        Optional<Role> role = roleRepo.findById(roleId);
        if(user.isPresent() && user.get().getRoles().contains(role.get())){
            throw new UserAlreadyExistsException(user.get().getFirstName()+ " is already assigned to the " + role.get().getName()+ "role");

        }
        if(role.isPresent()){
            role.get().assignUserToRole(user.get());
            roleRepo.save(role.get());
        }
        return user.get();
    }

    @Override
    public Role removeAllUsersFromRole(Long roleId) throws RoleNotFoundException {
        Optional<Role> roles = roleRepo.findById(roleId);
        //role.isPresent(Role::removeAllUsersFromRole);
        //return roleRepo.save(role.get());
        if(roles.isPresent()){
            Role role = roles.get();
            role.removeAllUsersFromRole();
            return roleRepo.save(role);
        }
        throw new RoleNotFoundException("Role not found with Id: "+roleId);

    }
}
