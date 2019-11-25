package com.picker.trip.domain;

import com.picker.trip.model.enums.*;
import lombok.Data;
import org.apache.ibatis.annotations.Param;

import javax.persistence.*;

/**
 * Created By yw on 2019-09-19.
 */

@Data
@Entity
@Table(name = "user_preference")
public class UserPreference {
    @Id
    private int userIdx;

    private AgeType ageType;
    private AddressType addressType;
    private MarriageType marriageType;

    private NightType nightType;
    private MonthType monthType;
    private PartnerType partnerType;
    private CostType costType;
    private ActivityType activityType;
}



