package com.example.DigiVault.models;

import lombok.Data;

import java.util.List;
@Data
public class AlchemyResponse {
    private List<TokenData> data;

    @Data
    public static class TokenData {
        private String symbol;
        private List<PriceInfo> prices;
        private String error;
    }
    @Data
    public static class PriceInfo {
        private String currency;
        private String value;
        private String lastUpdatedAt;

    }
}
