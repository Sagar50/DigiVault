package com.example.DigiVault.service;

import com.example.DigiVault.models.AlchemyResponse;
import com.example.DigiVault.models.Balance;
import com.example.DigiVault.models.Holding;
import com.example.DigiVault.models.TatumBalance;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;


@Service
public class VaultService {

    @Value("${TatumApiKey}")
    private String tatumApiKey;
    @Value("${AlchemyApiKey}")
    private String alchemyApiKey;
    private final RestTemplate restTemplate;
    public VaultService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    private final String[] exceptions = { "bitcoin", "dogecoin", "litecoin" };

    public Holding getAssets(String walletId, String ticker, String api, double curPrice) {
        String tatumUrl = "https://api.tatum.io/v3/" + api + "/account/balance/" + walletId;
        String alchemyUrl = "https://api.g.alchemy.com/prices/v1/" + alchemyApiKey + "/tokens/by-symbol?symbols=" + ticker;

        HttpHeaders headers = new HttpHeaders();
        headers.set("x-api-key", tatumApiKey);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            Object amount = null;
            if(Arrays.asList(exceptions).contains(api)) {
                tatumUrl = "https://api.tatum.io/v3/" + api + "/address/balance/" + walletId;
                amount = restTemplate.exchange(tatumUrl,  HttpMethod.GET, entity, TatumBalance.class).getBody();
            }else {
                amount = restTemplate.exchange(tatumUrl, HttpMethod.GET, entity, Balance.class).getBody();
            }


            AlchemyResponse alchemyResponse = restTemplate.exchange(alchemyUrl, HttpMethod.GET, entity, AlchemyResponse.class).getBody();

            Holding holding = new Holding();
            holding.setTicker(ticker);

            String bal = "";
            if(amount instanceof TatumBalance) {
                bal = ((TatumBalance) amount).getIncoming();
            }else {
                bal = ((Balance) amount).getBalance();
            }
            double balance = Double.parseDouble(bal);
            holding.setAmount(balance);

            double price = Double.parseDouble(alchemyResponse.getData().get(0).getPrices().get(0).getValue());
            holding.setPrice(price);

            double amountUSD = price * balance;
            holding.setAmountUSD(amountUSD);

            holding.setLastPrice(curPrice);

            holding.setApiString(api);
            return holding;
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving assets from external APIs", e);
        }
}

}
