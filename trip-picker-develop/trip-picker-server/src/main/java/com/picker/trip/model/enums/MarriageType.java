package com.picker.trip.model.enums;

public enum MarriageType {
    SINGLE(0), MARRIED(1);

    private final int value;

    MarriageType(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
