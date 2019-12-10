package com.picker.trip.domain;

import com.picker.trip.model.enums.PersonalityType;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Personality Entity Class
 */
@Data
@Entity
@Table(name = "personality")
public class Personality {
    @Id
    private PersonalityType personalityType;

    private int likesCount;
}
