package com.example.DigiVault.controller;

import com.example.DigiVault.UtilityClasses.JwtUtil;
import com.example.DigiVault.models.User;
import com.example.DigiVault.repository.UserRepository;
import com.example.DigiVault.service.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    @Autowired
    private AuthService authService; // Inject AuthService
    @Autowired
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil = new JwtUtil();

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public String login(@RequestBody User loginRequest) {
        // Delegate login logic to AuthService
        Optional<User> isUser = authService.login(loginRequest.getUsername(), loginRequest.getPassword());
        if(isUser.isPresent()) {
            return jwtUtil.generateToken(isUser.get().getUsername()); // Return the JWT token on successful login
        }
        return "Invalid credentials";



    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        if (userRepository.findById(user.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
        }
        authService.registerUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate(); // Invalidate the session
        return ResponseEntity.ok("Logged out successfully");
    }
}
