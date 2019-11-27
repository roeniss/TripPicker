package com.picker.trip.model;

import com.picker.trip.model.enums.*;
import lombok.Data;

import javax.persistence.Id;

@Data
public class UserPreferenceModel {
    private int userIdx;

    private SexType sexType;
    private AgeType ageType;
    private MarriageType marriageType;

    private NightType nightType;
    private int monthType;
    private AccompanyType accompanyType;
    private int accompanyNum;

    private PartnerType partnerType;
    private CostType costType;
    private ActivityType activityType;
}
