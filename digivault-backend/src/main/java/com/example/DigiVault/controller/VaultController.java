package com.example.DigiVault.controller;

import com.example.DigiVault.models.Balance;
import com.example.DigiVault.service.VaultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class VaultController {

    @GetMapping("/hello")
    public String sayHello() {
        return "DigiVault is running!";
    }

    @Autowired
    private VaultService vaultService;


    @GetMapping("/balance/{walletId}")
    public String getAssets(@PathVariable String walletId) {
        Balance balance = vaultService.getAssets(walletId);
        System.out.println("Printing balance response: " + balance.getBalance());
        return balance.getBalance();
    }
}