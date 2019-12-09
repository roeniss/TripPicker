package com.picker.trip.model;

import com.picker.trip.model.enums.CustomCategoryType;
import lombok.Data;

import java.util.List;

@Data
public class ItemAllRes {
    List<CategoryAndRatio> popularCategoryList;
    List<ItemRes> itemResList;
}
