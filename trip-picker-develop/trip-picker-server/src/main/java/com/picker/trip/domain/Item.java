package com.picker.trip.domain;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int contentIdx;

    private String categoryCode;
    private String subCategoryCode;

    private int likesCount;
}
