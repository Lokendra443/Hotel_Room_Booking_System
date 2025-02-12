package com.lenncoder.hotel.service;

import com.lenncoder.hotel.entity.Role;
import com.lenncoder.hotel.entity.User;

import javax.management.relation.RoleNotFoundException;
import java.util.List;

public interface RoleService {

    List<Role> getRoles();

    Role createRole(Role theRole);

    void deleteRole(Long roleId) throws RoleNotFoundException;

    Role findByName(String name);

    User removeUserFromRole(Long userId, Long roleId);

    User assignRoleToUser(Long userId, Long roleId);

    Role removeAllUsersFromRole(Long roleId) throws RoleNotFoundException;


}
