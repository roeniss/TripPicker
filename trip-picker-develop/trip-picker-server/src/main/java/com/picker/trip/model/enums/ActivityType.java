package com.picker.trip.model.enums;

public enum ActivityType {
    NATURE(0), FOOD(1), SPORTS(2);

    private final int value;

    ActivityType(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
