package com.picker.trip.model.enums;

public enum PartnerType {
    FRIEND_OR_COUPLE(1), COLLEAGUE(2), TEAM(3), FAMILY(4), RELATIVE(5), ETC(6);

    private final int value;

    PartnerType(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
