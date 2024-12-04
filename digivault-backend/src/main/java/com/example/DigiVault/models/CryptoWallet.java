package com.example.DigiVault.models;
import lombok.Data;

import java.util.List;

@Data
public class CryptoWallet {
    private String walletId; // Unique identifier for the wallet
    private List<Holding> holdings; // List of holdings in the wallet
}