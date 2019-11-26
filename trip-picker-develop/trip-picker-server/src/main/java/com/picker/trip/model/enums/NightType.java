package com.picker.trip.model.enums;

public enum NightType {
    DAY(1), DAYANDNIGHT(2);

    private final int value;

    NightType(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
