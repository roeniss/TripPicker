package com.picker.trip.domain;

import com.picker.trip.model.enums.CustomCategoryType;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "item")
public class Item {
    @Id
    private int contentIdx;

    private CustomCategoryType categoryCode;
    private String subCategoryCode;

    private int likesCount;

    private String imageUrl;
    private String title;

}
