package com.picker.trip.model.enums;

public enum AccompanyType {
    ACCOMPANY(1), ALONE(2);

    private final int value;

    AccompanyType(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
