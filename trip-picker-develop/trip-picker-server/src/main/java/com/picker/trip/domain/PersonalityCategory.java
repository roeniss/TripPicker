package com.picker.trip.domain;

import com.picker.trip.model.enums.PersonalityType;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "personality_category")
public class PersonalityCategory {
    private PersonalityType personalityType;
    private String categoryCode;
    private int likesCount;

    @Id
    private int personalityCategoryIdx;
}
