package com.example.DigiVault.models;

import lombok.Data;

@Data
public class Holding {
    private String ticker; // Cryptocurrency ticker (e.g., BTC, ETH)
    private double amount; // Amount of the cryptocurrency
    private double price; // Price of the cryptocurrency
    private double amountUSD; // Amount in USD (calculated from amount * price)
    private double lastPrice; // Price since last update
    private String apiString; //api endpoint for tatumUrl
}