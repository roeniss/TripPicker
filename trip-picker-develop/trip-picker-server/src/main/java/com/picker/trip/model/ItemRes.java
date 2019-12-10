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
    private int categoryOrder;
    private int areaCode;
    private int sggCode;


    @Override
    public int compareTo(ItemRes o) {
        if (this.categoryOrder < o.getCategoryOrder()) {
            return -1;
        } else if (this.getCategoryOrder() > o.getCategoryOrder()) {
            return 1;
        }
        return 0;
    }
}
