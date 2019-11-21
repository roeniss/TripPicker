package com.picker.trip.domain;

import lombok.Data;

import javax.persistence.*;

/**
 * Created By yw on 2019-09-19.
 */

@Data
@Entity
@Table(name = "user_character")
public class UserCharacter {
    @Id
    private int userIdx;

    private String gender;
    private String age;
    private String address;
    private String married;

    private String night;
    private String month;
    private String partner;
    private String cost;
    private String activity;
}



