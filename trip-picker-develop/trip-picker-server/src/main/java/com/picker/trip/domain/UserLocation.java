package com.picker.trip.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "user_location")
public class UserLocation {
    @Id
    private int userIdx;

    private int areaCode;
    private int sggCode;
    private String regionName;

}
