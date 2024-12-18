package com.example.DigiVault.models;
import lombok.Data;

import java.util.List;

@Data
public class CryptoWallet {
    private String walletId; // Unique identifier for the wallet
    private String walletName;
    private Holding holdings;
}