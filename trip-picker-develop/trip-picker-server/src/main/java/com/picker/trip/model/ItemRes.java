package com.picker.trip.model;

import com.picker.trip.model.enums.CustomCategoryType;
import lombok.Data;

@Data
public class ItemRes implements Comparable<ItemRes> {
    private int contentIdx;
    private CustomCategoryType categoryCode;
    private String subCategoryCode;
    private String imageUrl;
    private String title;
    private boolean isLiked;
    private boolean isBookmarked;

    @Override
    public int compareTo(ItemRes o) {
        return 0;
    }
}
