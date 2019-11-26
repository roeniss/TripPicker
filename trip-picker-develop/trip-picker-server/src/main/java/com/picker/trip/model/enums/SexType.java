package com.picker.trip.model.enums;

public enum SexType {
    MALE(1), FEMALE(2);

    private final int value;

    SexType(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
