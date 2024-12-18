package com.example.DigiVault.models;

import lombok.Data;

@Data
public class AddWalletData {
    private String ticker;
    private String api;
    private String walletId;
    private String walletName;
    private String username;
}
