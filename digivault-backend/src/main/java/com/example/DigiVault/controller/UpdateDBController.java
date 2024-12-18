package com.example.DigiVault.controller;

import com.example.DigiVault.models.AddWalletData;
import com.example.DigiVault.models.CryptoWallet;
import com.example.DigiVault.models.Holding;
import com.example.DigiVault.models.User;
import com.example.DigiVault.repository.UserRepository;
import com.example.DigiVault.service.UpdateDBService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

@RestController
@RequestMapping("/api/db")
public class UpdateDBController {

    @Autowired
    private final UpdateDBService updateDBService;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    public UpdateDBController(UpdateDBService updateDBService, UserRepository userRepository) {
        this.updateDBService = updateDBService;
        this.userRepository = userRepository;
    }
    // Retrieves last updated date
    @GetMapping("/lastUpdated/{username}")
    public ResponseEntity<Date> fetchLastUpdated(@PathVariable String username){
        return ResponseEntity.ok(updateDBService.checkLastUpdate(username));
    }
    //When update button pressed on frontend-should update all holdings
    @PutMapping("/updatePortfolio/{username}")
    public ResponseEntity<Date> updatePortfolio(@PathVariable String username){
        User updatedPortfolio = updateDBService.updateUserWallets(username);
        return ResponseEntity.ok(updatedPortfolio.getLastUpdated());
    }
    //Adds a singular wallet to db
    @PostMapping("/addWallet")
    public ResponseEntity<User> addWallet(@RequestBody AddWalletData addWalletData){
        User user = userRepository.findById(addWalletData.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        User updatedUser = updateDBService.addWallet(user, addWalletData);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/remove/{username}/{walletId}")
    public ResponseEntity<String> removeWallet(@PathVariable String username, @PathVariable String walletId){
        boolean isDeleted = updateDBService.deleteWalletByUserAndId(username, walletId);

        if (isDeleted) {
            return ResponseEntity.ok("Wallet deleted successfully");
        } else {
            return ResponseEntity.status(404).body("Wallet not found");
        }
    }

    @GetMapping("/exportHoldings/{username}")
    public void exportUserToCSV(@PathVariable String username, HttpServletResponse response) throws IOException {
        System.out.println("In exportUserToCSV+_____________________________________");
        // Set response headers
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=user_data.csv");

        // Fetch the user
        User user = userRepository.findById(username).orElseThrow(() -> new RuntimeException("User not found"));
        double totalAmountUSD = 0;

        // Write CSV data
        try (PrintWriter writer = response.getWriter()) {
            // Header
            writer.printf("Last updated:,%s", user.getLastUpdated());
            writer.println();
            writer.println("Username,Wallet ID,Ticker,Amount,Price,Amount USD");

            // Rows for each wallet
            for (CryptoWallet wallet : user.getCryptoWallets()) {
                Holding holding = wallet.getHoldings();
                totalAmountUSD += holding.getAmountUSD();
                writer.printf("%s,%s,%s,%.4f,%.2f,%.2f%n",
                        user.getUsername(),
                        wallet.getWalletId(),
                        holding.getTicker(),
                        holding.getAmount(),
                        holding.getPrice(),
                        holding.getAmountUSD());
            }
            writer.println();
            writer.printf("Total,,,,$,%.2f%n", totalAmountUSD);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
