package com.example.DigiVault.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "crypto_holdings")
public class CryptoHolding {
    private String ticker;
    private double amount;
    private double price;
    private double amountUSD;
}
