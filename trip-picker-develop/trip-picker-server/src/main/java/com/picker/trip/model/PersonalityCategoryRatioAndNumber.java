package com.picker.trip.model;

import com.picker.trip.model.enums.CustomCategoryType;
import lombok.Data;

@Data
public class PersonalityCategoryRatioAndNumber {
    private CustomCategoryType categoryCode;
    private double ratio;
    private int number;
    private int stackedNumber;
}
