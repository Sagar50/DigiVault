package com.example.DigiVault.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "users")
public class User {

    @Id
    private String username; // Use username as the unique identifier (_id)

    private String password; // Hashed password
    private List<CryptoWallet> cryptoWallets;
}
