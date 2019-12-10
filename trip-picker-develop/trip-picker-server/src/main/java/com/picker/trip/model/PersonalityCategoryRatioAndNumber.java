package com.picker.trip.model;

import com.picker.trip.model.enums.CustomCategoryType;
import lombok.Data;

@Data
public class PersonalityCategoryRatioAndNumber implements Comparable<PersonalityCategoryRatioAndNumber> {
    private CustomCategoryType categoryCode;
    private double ratio;
    private int number;
    private int stackedNumber;

    @Override
    public int compareTo(PersonalityCategoryRatioAndNumber o) {
        if (this.number < o.getNumber()) {
            return 1;
        } else if (this.number > o.getNumber()) {
            return -1;
        }
        return 0;
    }
}
