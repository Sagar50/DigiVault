package com.example.DigiVault.service;

import com.example.DigiVault.models.CGResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class CGService {

    @Autowired
    private RestTemplate restTemplate;

    public List<CGResponse> getCryptoData(int page, int numRows){
        String url = "https://api.coingecko.com/api/v3/coins/markets";
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("vs_currency", "usd")
                .queryParam("order", "volume_desc")
                .queryParam("per_page", numRows)
                .queryParam("page", page)
                .queryParam("sparkline", "true")
                .queryParam("price_change_percentage", "1h,24h,7d");

        // Call API
        String response = restTemplate.getForObject(builder.toUriString(), String.class);
        // Map response to a list of CGResponse objects
        ObjectMapper objectMapper = new ObjectMapper();
        List<Map<String, Object>> result = null;
        try {
            result = objectMapper.readValue(response, List.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }


        return result.stream().map(data -> {
            CGResponse cgResponse = new CGResponse();
            cgResponse.setName((String) data.get("name"));

            cgResponse.setSymbol((String) data.get("symbol"));

            cgResponse.setImg((String) data.get("image"));

            Object currentPriceObj = data.get("current_price");
            if (currentPriceObj instanceof Double) {
                cgResponse.setCurrent_price((Double) currentPriceObj);
            } else if (currentPriceObj instanceof Integer) {
                cgResponse.setCurrent_price(((Integer) currentPriceObj).doubleValue());
            } else {
                cgResponse.setCurrent_price(0.0); // Default value if null or unexpected type
            }

            Number marketCap = (Number) data.get("market_cap");
            if (marketCap != null) {
                cgResponse.setMarket_cap(marketCap.longValue()); // or use .doubleValue() if needed
            }

            Number dayVolume = (Number) data.get("total_volume");
            if (dayVolume != null) {
                cgResponse.setDay_volume(dayVolume.longValue()); // or .doubleValue() for Double
            }

            Map<String, Object> sparklineMap = (Map<String, Object>) data.get("sparkline_in_7d"); // Get the map
            double[] sparkline = objectMapper.convertValue(sparklineMap.get("price"), double[].class); // Convert the "price" field to double[]
            cgResponse.setSparkline(sparkline); // Set the sparkline


            cgResponse.setHourVolumeChange(data.get("price_change_percentage_1h_in_currency") != null ? (Double) data.get("price_change_percentage_1h_in_currency") : 0.0);

            cgResponse.setDayVolumeChange(data.get("price_change_percentage_24h_in_currency") != null ? (Double) data.get("price_change_percentage_24h_in_currency") : 0.0);

            cgResponse.setSevenDayVolumeChange(data.get("price_change_percentage_7d_in_currency") != null ? (Double) data.get("price_change_percentage_7d_in_currency") : 0.0);
            return cgResponse;
        }).toList();
    }
}
