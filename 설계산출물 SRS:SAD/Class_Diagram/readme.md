## 1. Relationship의 방향성(navigability) 설정: Category 별로 Item이 있는지, Item 별로 Category가 있는지.. 당연히 전자의 경우라면 category에서 Item으로 방향설정.



## 2. Relationship에 달려있는 Association class를 방향성 고려해서 6_Analysis Entity Class Design. pdf 의 슬라이드 55, 56 중 어떤 케이스인지 식별해서 수정할 것.

## 3. Relationship의 Multiplicity 표시할 것

## 4. 전반적으로 class 식별에 총체적으로 문제 있는 상태. UserCharacter의 gender, age, address, married는 user 1명에 대해 하나씩의 정보만 가질 수 있는 attribute이고, 반면, night, month, partner, cost, activity는 여행 1건당 생성 가능한 data로 하나의 class 안에 들어갈 수 없는 attribute들임.
personality, category, item등은 필요한 property는 하나도 없고, index만 attribute로 식별 되어 있는 등.. Code table의 column에 해당하는 data 항목들도 결국은 coding 상에서 어딘가에서는 담아서 화면에 뿌려져야 하기 때문에, 반드시 class의 attribute로 식별되어 있어야 함.
그 외에 내가 언급하지 않은 클래스들도 제대로 식별된 부분이 거의 없음.


class design에 대한 공부 전혀 안되어 있는 것으로 판단됨.
