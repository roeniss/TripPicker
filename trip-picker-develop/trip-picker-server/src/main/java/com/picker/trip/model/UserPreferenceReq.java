package com.picker.trip.model;

import com.picker.trip.domain.UserPreference;
import com.picker.trip.model.enums.ActivityType;
import com.picker.trip.model.enums.PartnerType;
import lombok.Data;

import java.util.List;

@Data
public class UserPreferenceReq {
    private UserPreferenceModel userPreferenceModel;
    private List<Integer> partnerTypeList;
    private List<Integer> activityTypeList;
}
