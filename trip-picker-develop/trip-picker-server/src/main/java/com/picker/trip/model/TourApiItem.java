package com.picker.trip.model;

import lombok.Data;

@Data
public class TourApiItem {
    private int contentId;
    private int contentTypeId;
    private String title;
    private String categoryCode;
    private String subCategoryCode;
    private String address;
    private String phoneNumber;
    private String imageUrl;
    private TourApiItemCommon tourApiItemCommon;
}
