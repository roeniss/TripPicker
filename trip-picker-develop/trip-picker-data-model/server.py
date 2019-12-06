# -*- coding: utf-8 -*-
"""
Created on Tue Nov 26 16:32:23 2019

@author: Miseong
"""


import os
import pandas
import joblib
import flask
import sklearn
import numpy
from flask import Flask, jsonify, request


app = Flask(__name__)


# post 형식으로 호출을 받는다.
@app.route('/predict', methods=['POST'])
def apicall():
    try:
        test_json = request.get_json()
        # json 형태의 request를 받는다.
        test = pandas.DataFrame([test_json])
        #print(test)
        # 데이터 모델에 넣을 수 있는 형태로 변환한다.
        temp = []
        temp.append(int(test['oneday'].loc[0]))
        temp.append(int(test['month'].loc[0]))
        temp.append(int(test['purpose'].loc[0]))
        temp.append(int(test['accompany_presence'].loc[0]))
        temp.append(int(test['accompany_num'].loc[0]))
        temp += test['accompany_relation'].loc[0]
        temp.append(int(test['pay'].loc[0]))
        temp += test['activity'].loc[0]
        temp.append(int(test['sex'].loc[0]))
        temp.append(int(test['age'].loc[0]))
        temp.append(int(test['marrige'].loc[0]))
        test = [temp]
        #test = [list(test[0:5]) + test[5] + [test[6]] + test[7] + list(test[8:])]
        
    except Exception as e:
        #raise e
        print(str(e))
        # 오류가 날 시에 제주도 제주시가 추천되도록 한다.
        responses = jsonify(predictions=939010)
        return responses

    if not test:
        return(flask.bad_request())
    else:
        #print("The model has been loaded...doing predictions now...")
        # 랜덤포레스트 모델로 어느 여행지를 가고 싶어할지 예측을 받는다.
        predictions = loaded_model.predict(test)[0]
        # 예측 받은 결과를 json 형식으로 저장한다.
        responses = jsonify(predictions=int(predictions))
        responses.status_code = 200
        return (responses)
    
    
if __name__=="__main__":
    path = './random_forest_travel.pkl'
    # pkl로 저장된 랜덤포레스트 model을 불러온다.
    loaded_model = joblib.load(path)
    app.run(host='0.0.0.0')