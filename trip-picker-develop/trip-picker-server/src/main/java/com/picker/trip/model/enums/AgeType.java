package com.picker.trip.model.enums;

public enum AgeType {
    TWENTY_BELOW(10), TWENTY(25), THIRTY(35), FOURTY(45), FIFTY_OVER(60);

    private final int value;

    AgeType(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
