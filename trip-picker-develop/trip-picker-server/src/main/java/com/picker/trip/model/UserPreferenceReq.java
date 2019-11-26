package com.picker.trip.model;

import lombok.Data;

import java.util.List;

@Data
public class UserPreferenceReq {
    private int oneday;
    private int month;
    private int purpose;
    private int buddy_yes;
    private int accompany_num;
    private List<Integer> accompany_relation;
    private int pay;
    private List<Integer> activity;
}
