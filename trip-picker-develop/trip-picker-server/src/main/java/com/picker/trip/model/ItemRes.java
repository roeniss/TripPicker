package com.picker.trip.model;

import lombok.Data;

@Data
public class ItemRes {
    private int contentIdx;
    private String imageUrl;
    private boolean isLiked;
    private boolean isBookmarked;
}
