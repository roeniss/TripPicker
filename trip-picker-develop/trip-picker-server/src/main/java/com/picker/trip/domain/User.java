package com.picker.trip.domain;

import lombok.Data;

import javax.persistence.*;

/**
 * User Entity Class
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
}



