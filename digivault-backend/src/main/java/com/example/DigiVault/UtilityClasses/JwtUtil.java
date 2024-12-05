package com.example.DigiVault.UtilityClasses;

import io.jsonwebtoken.Jwts;
;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Date;

public class JwtUtil {

    private SecretKey getSecretKey() {
        try {
            // Use KeyGenerator to create a secure random key
            KeyGenerator keyGenerator = KeyGenerator.getInstance("HmacSHA512");
            keyGenerator.init(512); // Set key size to 512 bits
            return keyGenerator.generateKey();
        } catch (Exception e) {
            throw new RuntimeException("Error generating secret key", e);
        }
    }

    // Generate JWT token
    public String generateToken(String username) {
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day expiry
                .signWith(getSecretKey())
                .compact();
    }

    // Validate JWT token
    public boolean validateToken(String token, String username) {
        String extractedUsername = extractUsername(token);
        return (extractedUsername.equals(username) && !isTokenExpired(token));
    }

    // Extract username from the JWT token
    public String extractUsername(String token) {
        return Jwts.parser()
                .verifyWith(getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    // Check if the token is expired
    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Date extractExpiration(String token) {
        return Jwts.parser()  // Use the updated parserBuilder method
                .verifyWith(getSecretKey())  // Use the secretKey generated from the hardcoded string
                .build()  // Build the JwtParser
                .parseSignedClaims(token)  // Parse the JWT token
                .getPayload()  // Extract claims from the body
                .getExpiration();  // Get the expiration claim
    }
}
