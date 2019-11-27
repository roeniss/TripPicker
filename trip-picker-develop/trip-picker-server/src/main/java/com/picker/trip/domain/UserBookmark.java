package com.picker.trip.domain;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "user_bookmark")
public class UserBookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookmarkIdx;

    private int userIdx;
    private int contentIdx;
}
