package com.picker.trip.domain;

import com.picker.trip.model.enums.PartnerType;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "user_preference_partner")
public class UserPreferencePartner {
    @Id
    private int userIdx;
    private PartnerType partnerType;
}
