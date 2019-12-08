package com.picker.trip.domain;

import com.picker.trip.model.enums.CustomCategoryType;
import com.picker.trip.model.enums.PersonalityType;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * PersonalityCategory Entity Class
 */

@Data
@Entity
@Table(name = "personality_category")
public class PersonalityCategory {
    private PersonalityType personalityType;
    private CustomCategoryType categoryCode;
    private int likesCount;

    @Id
    private int personalityCategoryIdx;
}
