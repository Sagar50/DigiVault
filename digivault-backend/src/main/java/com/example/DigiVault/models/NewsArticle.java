package com.example.DigiVault.models;

import lombok.Data;

@Data
public class NewsArticle {
    private String title;
    private String description;
    private String thumbnail;
    private String url;
    private String date;
}
