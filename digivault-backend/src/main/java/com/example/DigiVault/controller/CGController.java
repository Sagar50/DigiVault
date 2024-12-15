package com.example.DigiVault.controller;

import com.example.DigiVault.models.CGResponse;
import com.example.DigiVault.service.CGService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CGController {

    @Autowired
    private CGService cgService;

    @GetMapping("/getCryptoData")
    public List<CGResponse> getCryptoData(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "15") int numRows) {
        return cgService.getCryptoData(page, numRows);
    }

}