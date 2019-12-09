package com.picker.trip.model;

import lombok.Data;

@Data
public class TourApiItem {
    private int contentIdx;
    private int contentTypeId;
    private String title;
    private String categoryCode;
    private String subCategoryCode;
    private String imageUrl;
    private int areaCode;
    private int sggCode;
    private TourApiItemCommon tourApiItemCommon;
}
