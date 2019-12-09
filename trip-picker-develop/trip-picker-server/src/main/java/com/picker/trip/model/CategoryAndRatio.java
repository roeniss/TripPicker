package com.picker.trip.model;

import com.picker.trip.model.enums.CustomCategoryType;
import lombok.Data;

@Data
public class CategoryAndRatio {
    private CustomCategoryType customCategoryType;
    private double ratio;
}
