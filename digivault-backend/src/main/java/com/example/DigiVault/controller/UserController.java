package com.example.DigiVault.controller;

import com.example.DigiVault.models.User;
import com.example.DigiVault.repository.UserRepository;
import com.example.DigiVault.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private final UserService userService;

    @Autowired
    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
    }

    @GetMapping("/find/{username}")
    public ResponseEntity<Optional<User>> getUserById(@PathVariable String username) {
        return ResponseEntity.ok(userService.getUserById(username));
    }

    // Update an existing user
    @PutMapping("/{username}")
    public ResponseEntity<User> updateUser(@PathVariable String username, @RequestBody User user) {
        User updatedUser = userService.updateUser(username, user);
        return ResponseEntity.ok(updatedUser);
    }



}
