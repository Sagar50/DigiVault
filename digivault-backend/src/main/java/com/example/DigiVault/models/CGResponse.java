package com.example.DigiVault.models;

import lombok.Data;

@Data
public class CGResponse {


    private String name;
    private String symbol;
    private String img;
    private double current_price;
    private Number market_cap;
    private Number day_volume;
    private double[] sparkline;
    private double hourVolumeChange;
    private double dayVolumeChange;
    private double sevenDayVolumeChange;

}
