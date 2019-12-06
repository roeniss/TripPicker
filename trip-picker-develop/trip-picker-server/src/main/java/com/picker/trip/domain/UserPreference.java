package com.picker.trip.domain;

import lombok.Data;

import javax.persistence.*;

/**
 * UserPreference Entity Class
 */

@Data
@Entity
@Table(name = "user_preference")
public class UserPreference {
    @Id
    private int userIdx;

    private String region;
    private int areaCode;
    private int sggCode;
}



