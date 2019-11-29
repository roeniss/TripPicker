package com.picker.trip.domain;

import com.picker.trip.model.enums.CustomCategoryType;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "item_like")
public class ItemLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int likeIdx;

    private int userIdx;
    private int contentIdx;
    private CustomCategoryType categoryCode;
    private String subCategoryCode;
}
