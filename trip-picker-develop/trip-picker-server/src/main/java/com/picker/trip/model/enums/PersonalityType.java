package com.picker.trip.model.enums;

public enum PersonalityType {
    NATURE_PERSONAL(0), EXTREME_PERSONAL(1), CULTURE_PERSONAL(2), FAMILY_PERSONAL(3);

    private final int value;

    PersonalityType(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
