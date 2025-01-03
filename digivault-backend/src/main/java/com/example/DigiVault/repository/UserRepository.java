package com.example.DigiVault.repository;
import com.example.DigiVault.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    // Custom query methods if needed
}