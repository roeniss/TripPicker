# -*- coding: utf-8 -*-
"""
Created on Thu Dec  5 18:32:25 2019

@author: Miseong
"""

import pandas as pd
import numpy as np

data = pd.read_csv('국민여행실태조사데이터_최종.csv', encoding='utf-8')
# 모델에 넣어 학습에 사용할 데이터 column만 선택.
X = data[['당일/숙박여행 여부',
          '여행 출발 월',
          '여행 주 목적',
          '함께 여행한 일행 존재 여부',
          '본인을 제외한 함께 여행한 일행 수',
          '동행한 사람과의 관계 친구/연인',
          '동행한 사람과의 관계 (직장)동료',
          '동행한 사람과의 관계 단체/모임',
          '동행한 사람과의 관계 비동거가족',
          '동행한 사람과의 관계 친척',
          '동행한 사람과의 관계 기타',
          '총 지출비용',
          '여행지에서의 활동 자연 및 풍경 감상',
          '여행지에서의 활동 음식관광',
          '여행지에서의 활동 야외 위락 및 스포츠 활동',
          '여행지에서의 활동 역사유적지 방문',
          '여행지에서의 활동 테마파크, 놀이시설, 동/식물원 방문',
          '여행지에서의 활동 휴식/휴양',
          '여행지에서의 활동 온천/스파',
          '여행지에서의 활동 쇼핑',
          '여행지에서의 활동 지역 문화예술/공연/전시시설 관람',
          '여행지에서의 활동 스포츠 경기 관람',
          '여행지에서의 활동 지역 축제/이벤트 참가',
          '여행지에서의 활동 교육/체험프로그램 참가',
          '여행지에서의 활동 종교/성지순례',
          '여행지에서의 활동 시티투어',
          '여행지에서의 활동 드라마 촬영지 방문',
          '여행지에서의 활동 가족/친지/친구 방문',
          '여행지에서의 활동 회의참가/시찰',
          '여행지에서의 활동 교육/훈련/연수',
          '여행지에서의 활동 유흥/오락',
          '여행지에서의 활동 기타',
          '성',
          '연령',
          '혼인상태']]
# 기혼(1)과 미혼(0) 두 가지로만 나누기 위해 데이터 변경.
X['혼인상태'] = X['혼인상태'].map({1:0, 2:1, 3:0, 4:0})
# 모델의 target data.
y = data['여행한 광역시/도 내 시/군1(해외여행: 도시)']

# Random Forest 모델로 학습시키고 모델을 검증하기 위해 필요한 패키지 import.
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import sklearn.metrics as mt

# 검증을 위해 학습용 데이터와 테스트 데이터를 분리하였다.
# 테스트 데이터는 전체의 25퍼센트.
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)
# Random Forest 모델을 이용한 학습을 위해 개체 생성
r_clf = RandomForestClassifier(n_estimators=200,    # 결정트리의 개수 . 값이 클수록 좋은 성능을 기대할 수 있지만 , 학습 시간이 오래 걸림
                               criterion='gini',    # 결정트리 분할을 결정하는 함수. gini impurity를 사용하였다.
                               max_features='auto', # 최상의 분기를 위해서 고려하는 feature의 개수. auto를 사용하면 전체의 square root개수를 사용한다.
                               max_depth=20,        # 결정트리의 최대 깊이
                               min_samples_split=2) # 결정트리에서 노드를 나눌 때 필요한 최소 샘플의 개수.

r_clf.fit(X_train, y_train) # 학습용 데이터를 이용해 모델에 학습을 시킨다.
y_pred = r_clf.predict(X_test) # 학습시킨 모델을 이용하여 예측한다.

# 정확도와 confusion matrix를 이용해 모델을 검증해본다.
print(mt.accuracy_score(y_test, y_pred))
print(mt.confusion_matrix(y_test, y_pred))

# 출력 결과
'''
0.359845802847927
[[ 74   1   1 ...   0   0   2]
 [  4  32   0 ...   0   0   0]
 [  0   1   6 ...   0   0   0]
 ...
 [  0   0   0 ...  12   0   0]
 [  0   0   0 ...   0  49  41]
 [  1   0   0 ...   0   4 324]]
'''

# 학습시킨 랜덤포레스트 모델을 저장하기 위해 불러오는 패키지
import joblib

# 랜덤포레스트 모델을 pkl 파일로 저장한다.
joblib.dump(r_clf, 'random_forest_travel.pkl')