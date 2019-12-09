package com.picker.trip.model;

import com.picker.trip.model.enums.CustomCategoryType;
import lombok.Data;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Data
public class CategoryCodeMapping {
    private static Map<CustomCategoryType, ArrayList<String>> categoryCodeMap = new HashMap() {{
        put(CustomCategoryType.NATURE, new ArrayList<>(
                Arrays.asList("A0101", "A0102")
        ));
        put(CustomCategoryType.HISTORY, new ArrayList<>(
                Arrays.asList("A0201")
        ));
        put(CustomCategoryType.REST, new ArrayList<>(
                Arrays.asList("A0202")
        ));
        put(CustomCategoryType.EXPERIENCE, new ArrayList<>(
                Arrays.asList("A0203")
        ));
        put(CustomCategoryType.INDUSTRY, new ArrayList<>(
                Arrays.asList("A0204", "A0205")
        ));
        put(CustomCategoryType.CULTURE, new ArrayList<>(
                Arrays.asList("A0206")
        ));
        put(CustomCategoryType.FESTIVAL, new ArrayList<>(
                Arrays.asList("A0207", "A0208")
        ));
        put(CustomCategoryType.REPORTS, new ArrayList<>(
                Arrays.asList("A0302", "A0303", "A0304", "A0305")
        ));
        put(CustomCategoryType.SHOPPING, new ArrayList<>(
                Arrays.asList("A0401")
        ));
        put(CustomCategoryType.RESTAURANT, new ArrayList<>(
                Arrays.asList("A0502")
        ));
    }};
}
