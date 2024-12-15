package com.example.DigiVault.service;

import com.example.DigiVault.models.CryptoWallet;
import com.example.DigiVault.models.Holding;
import com.example.DigiVault.models.User;
import com.example.DigiVault.repository.UserRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import com.google.common.util.concurrent.RateLimiter;
import java.util.Date;
import java.util.List;

@Service
public class PortfolioScheduler {

    private final UserRepository userRepository;
    private final VaultService vaultService;

    public PortfolioScheduler(UserRepository userRepository,VaultService vaultService) {
        this.userRepository = userRepository;
        this.vaultService = vaultService;
    }

    // Runs every 2 hours (adjust as needed)
    @Scheduled(fixedRate = 7200000 )
    public void updatePortfolios() {
        List<User> users = userRepository.findAll();
        RateLimiter rateLimiter = RateLimiter.create(3); // 3 permits/second

        for (User user : users) {
            for (CryptoWallet wallet : user.getCryptoWallets()) {
                rateLimiter.acquire();
                try {
                    Holding newHolding = vaultService.getAssets(
                            wallet.getWalletId(),
                            wallet.getHoldings().getTicker(),
                            wallet.getHoldings().getApiString(),
                            wallet.getHoldings().getPrice()
                    );
                    wallet.setHoldings(newHolding);
                } catch (Exception e) {
                    System.err.println("Error updating wallet: " + wallet.getWalletId());
                }
            }
            user.setLastUpdated(new Date());
            userRepository.save(user);
        }
    }
}
