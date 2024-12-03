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

    public User getUserById(String id) {
        Optional<User> user = userRepository.findById(id);
        System.out.println(user);
        System.out.println("_______________________________________________________________");
        return user.orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }
}
