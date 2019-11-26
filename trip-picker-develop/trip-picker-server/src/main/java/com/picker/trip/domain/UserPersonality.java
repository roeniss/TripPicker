package com.picker.trip.domain;

import com.picker.trip.model.enums.PersonalityType;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "user_personality")
public class UserPersonality {
    @Id
    private int userIdx;

    private PersonalityType personalityType;
}
