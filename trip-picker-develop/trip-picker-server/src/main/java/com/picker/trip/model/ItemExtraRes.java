package com.picker.trip.model;

import lombok.Data;

import java.util.List;

@Data
public class ItemExtraRes {
    private String address;
    private String overview;
    private String homepageUrl;
    private List<String> subImageUrlList;
    private List<RelatedItem> relatedItemList;
}
