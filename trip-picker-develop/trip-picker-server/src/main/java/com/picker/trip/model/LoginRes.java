package com.picker.trip.model;

import lombok.Data;

@Data
public class LoginRes {
    private int userIdx;
    private String userName;
    private String token;
}
