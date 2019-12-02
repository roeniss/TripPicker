package com.picker.trip.domain;

import com.picker.trip.model.enums.CustomCategoryType;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "user_bookmark")
public class UserBookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookmarkIdx;

    private int userIdx;
    private int contentIdx;
    private CustomCategoryType categoryCode;
    private String subCategoryCode;
}