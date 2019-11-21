package com.picker.trip.model;

import com.picker.trip.domain.User;
import com.picker.trip.domain.UserCharacter;
import lombok.Data;

@Data
public class SignUpReq {
    private User user;
    private UserCharacter userCharacter;
}
