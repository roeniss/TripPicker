package com.picker.trip.domain;

import com.picker.trip.model.enums.ActivityType;
import com.picker.trip.model.enums.PartnerType;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "user_preference_activity")
public class UserPreferenceActivity {
    @Id
    private int userIdx;
    private ActivityType activityType;
}
