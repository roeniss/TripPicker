package com.picker.trip.model;

import com.picker.trip.model.enums.CustomCategoryType;
import lombok.Data;

@Data
public class BookmarkItem {
    private int contentIdx;
    private CustomCategoryType categoryCode;
    private String subCategoryCode;
    private String imageUrl;
    private boolean isLiked;
    private boolean isBookmarked;
}
