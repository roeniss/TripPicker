package com.picker.trip.domain;

import lombok.Data;

import javax.persistence.*;

/**
 * Created By yw on 2019-09-19.
 */

@Data
@Entity
@Table(name = "user_preference")
public class UserPreference {
    @Id
    private int userIdx;

    private int areaCode;
    private int sggCode;
    private String regionName;
}



