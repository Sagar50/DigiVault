package com.example.DigiVault.service;

import com.example.DigiVault.models.User;
import com.example.DigiVault.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }
    public User createUser(User user) {
        return userRepository.save(user); // Saves the user to the database
    }
    public User updateUser(String userId, User user) {
        System.out.println("Made it to updateUser in userServices _________________");
        if (userRepository.existsById(userId)) {
            user.setId(userId);
            return userRepository.save(user);
        } else {
            return null; // Or throw an exception, based on your use case
        }
    }
}
