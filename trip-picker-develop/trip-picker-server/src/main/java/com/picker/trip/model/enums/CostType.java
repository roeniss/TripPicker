package com.picker.trip.model.enums;

public enum CostType {
    TWENTY_BELOW(100000), TWENTY(250000), THIRTY(350000), FOURTY(450000), FIFTY_OVER(600000);

    private final int value;

    CostType(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
