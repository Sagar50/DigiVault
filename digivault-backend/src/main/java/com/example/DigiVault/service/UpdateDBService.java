package com.example.DigiVault.service;

import com.example.DigiVault.models.*;
import com.example.DigiVault.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.google.common.util.concurrent.RateLimiter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UpdateDBService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VaultService vaultService;

    public UpdateDBService(UserRepository userRepository, VaultService vaultService) {
        this.userRepository = userRepository;
        this.vaultService = vaultService;
    }

    public Date checkLastUpdate(String username) {
        Optional<User> user = userRepository.findById(username);
        return user.map(User::getLastUpdated).orElse(null);
    }

    public User updateUserWallets(String username) {
        User user = userRepository.findById(username).orElseThrow(() -> new RuntimeException("User not found"));
        List<CryptoWallet> cryptoWallets = user.getCryptoWallets();
        List<CryptoWallet> updatedWallets = new ArrayList<>();

        RateLimiter rateLimiter = RateLimiter.create(3); // 3 permits per second

        for(CryptoWallet cryptoWallet : cryptoWallets) {
            rateLimiter.acquire();
            Holding newHolding = vaultService.getAssets(cryptoWallet.getWalletId(), cryptoWallet.getHoldings().getTicker(), cryptoWallet.getHoldings().getApiString(), cryptoWallet.getHoldings().getPrice());
            CryptoWallet updatedWallet = new CryptoWallet();
            updatedWallet.setWalletId(cryptoWallet.getWalletId());
            updatedWallet.setHoldings(newHolding);
            updatedWallets.add(updatedWallet);
        }
        user.setLastUpdated(new Date());
        user.setCryptoWallets(updatedWallets);
        return userRepository.save(user);
    }

    public User addWallet(User user, AddWalletData addWalletData) {
        Holding holdings = vaultService.getAssets(addWalletData.getWalletId(), addWalletData.getTicker(), addWalletData.getApi(), 0.00);

        // Check if wallet already exists
        boolean walletExists = user.getCryptoWallets().stream()
                .anyMatch(wallet -> wallet.getWalletId().equals(addWalletData.getWalletId()));

        if (!walletExists) {
            CryptoWallet cryptoWallet = new CryptoWallet();
            cryptoWallet.setWalletId(addWalletData.getWalletId());

            cryptoWallet.setHoldings(holdings);

            user.getCryptoWallets().add(cryptoWallet);
        } else {
            throw new RuntimeException("Wallet already exists for this user.");
        }

        return userRepository.save(user);
    }
}
