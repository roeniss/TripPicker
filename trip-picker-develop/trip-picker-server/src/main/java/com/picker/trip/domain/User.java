package com.picker.trip.domain;

import lombok.Data;

import javax.persistence.*;

/**
 * Created By yw on 2019-09-19.
 */

@Data
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userIdx;

    private String name;
    private String password;
    private String email;
    private String photoUrl;
}



