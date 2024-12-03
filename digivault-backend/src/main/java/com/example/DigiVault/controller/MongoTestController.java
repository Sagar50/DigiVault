package com.example.DigiVault.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MongoTestController {

    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping("/testMongoConnection")
    public String testConnection() {
        // Get the number of documents in the "users" collection
        long count = mongoTemplate.getCollection("users").countDocuments();
        return "There are " + count + " users in the database.";
    }
}
