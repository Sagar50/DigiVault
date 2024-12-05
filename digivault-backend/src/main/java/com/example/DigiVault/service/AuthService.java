package com.example.DigiVault.service;

import com.example.DigiVault.models.User;
import com.example.DigiVault.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> login(String username, String password) {
        // Fetch the user by username
        Optional<User> userOpt = userRepository.findById(username);
        // Validate username and password
        if (userOpt.isEmpty() || !verifyPassword(password, userOpt.get().getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        return userOpt;
    }

    private boolean verifyPassword(String rawPassword, String hashedPassword) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.matches(rawPassword, hashedPassword); // Simplified for illustration
    }

    public User registerUser(User user) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

}
