package com.example.DigiVault.service;

import com.example.DigiVault.models.NewsArticle;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class NewsService {

    @Value("${RapidNewsApiKey}")
    private String rapidNewsApiKey;

    private final String API_URL = "https://crypto-news16.p.rapidapi.com/news/top/12";

    public List<NewsArticle> getNewsArticles() {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("x-rapidapi-key", rapidNewsApiKey);
        headers.set("x-rapidapi-host", "crypto-news16.p.rapidapi.com");
        // Create an HttpEntity with the headers
        HttpEntity<String> entity = new HttpEntity<>(headers);


        // Make GET request with headers
        try {
            ResponseEntity<NewsArticle[]> response = restTemplate.exchange(
                    API_URL,
                    org.springframework.http.HttpMethod.GET,
                    entity,
                    NewsArticle[].class
            );

            // Convert response to a list and return
            NewsArticle[] articles = response.getBody();
            return articles != null ? Arrays.asList(articles) : List.of();

        } catch (Exception e) {
            // Log or handle the exception (e.g., return an empty list)
            System.err.println("Error fetching news articles: " + e.getMessage());
            return List.of();
        }
    }
}