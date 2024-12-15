package com.example.DigiVault.controller;

import com.example.DigiVault.models.NewsArticle;
import com.example.DigiVault.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    @Autowired
    private NewsService newsService;

    @GetMapping
    public List<NewsArticle> fetchCryptoNews() {
        return newsService.getNewsArticles();
    }
}