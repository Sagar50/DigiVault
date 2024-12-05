package com.example.DigiVault.service;

import com.example.DigiVault.models.User;
import com.example.DigiVault.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> getUserById(String username) {
        return userRepository.findById(username);
    }

    public User updateUser(String userId, User user) {
        user.setUsername(userId);
        return userRepository.save(user);

    }

}
