package com.lenncoder.hotel.service;

import com.lenncoder.hotel.entity.User;

import java.util.List;

public interface UserService {

    User registerUser(User user);

    List<User> getUsers();

    void deleteUser(String email);

    User getUser(String email);

}
