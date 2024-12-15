package com.example.DigiVault.models;

import lombok.Data;

@Data

public class TatumBalance {
    private String incoming;
    private String outgoing;
    private String incomingPending;
    private String outgoingPending;
}