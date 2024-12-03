package com.example.DigiVault.service;

import com.example.DigiVault.models.Balance;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
public class VaultService {

    @Value("${TatumApiKey}")
    private String apiKey;

    private final RestTemplate restTemplate;
    public VaultService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Balance getAssets(String walletId) {

        String ethUrl = "https://api.tatum.io/v3/ethereum/account/balance/" + walletId;

        HttpHeaders headers = new HttpHeaders();
        headers.set("x-api-key", apiKey);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        try {
            return restTemplate.exchange(ethUrl, HttpMethod.GET, entity, Balance.class).getBody();
        } catch (Exception e) {
            throw new RuntimeException("Error getting assets from Tatum", e);
        }

    }

}
