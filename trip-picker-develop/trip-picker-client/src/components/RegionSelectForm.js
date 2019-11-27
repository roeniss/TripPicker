import React, { useState, useContext } from "react";
import useInputState from "../hooks/useInputState";
import { axios } from "../customAxios";
import { DispatchContext } from "../App";

const RegionSelectForm = () => {
  const [oneday, onedayBind] = useInputState("");
  const [month, monthBind] = useInputState("");
  const [purpose, _] = useInputState(1);
  const [accompany_presence, accompany_presenceBind] = useInputState(""); // TODO: 이 부분 변수명이 문서에 안적혀있음. 미성님께 변수명 확인하고 정정.
  const [accompany_num, accompany_numBind] = useInputState("");
  const [accompany_relation, setAccompany_relation] = useState(["0"]);
  const [pay, payBind] = useInputState("");
  const [activity, setActivity] = useState(["0"]);
  const [sex, sexBind] = useInputState("");
  const [age, ageBind] = useInputState("");
  const [marriage, marriageBind] = useInputState("");

  const dispatch = useContext(DispatchContext);

  const onSubmitHandler = e => {
    e.preventDefault();
    if (!oneday || !month || !purpose || !accompany_presence || !accompany_num || !pay || !sex || !age || !marriage) return alert("입력하지 않은 항목이 있습니다"); // accompany_relation, activity 는 체크 안함

    const converted_accompany_relation = [0, 0, 0, 0, 0, 0]; // 미성님 모델에 넣을 수 있도록 convert
    accompany_relation.forEach(each => (converted_accompany_relation[Number(each)] = 1));
    const converted_activity = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 도합 20개
    activity.forEach(each => (converted_activity[Number(each)] = 1));

    console.log(oneday, month, purpose, accompany_presence, accompany_num, converted_accompany_relation, pay, converted_activity, sex, age, marriage); // TODO: Number로 변환해줘야될듯...

    const fullData = {
      oneday: Number(oneday),
      month: Number(month),
      purpose: Number(purpose),
      accompany_presence: Number(accompany_presence),
      accompany_num: Number(accompany_num),
      accompany_relation: converted_accompany_relation,
      pay: Number(pay),
      activity: Number(converted_activity),
      sex: Number(sex),
      age: Number(age),
      marriage: Number(marriage)
    };

    axios("RECOMMEND_REGION", dispatch, { data: fullData });
    // TODO: axios로 파이썬 서버에 보내고 --> 그 지역 코드 리턴 받아서 --> 지역 명 뽑아내고 --> 서버에 저장하고 --> state.get('region') update하기
  };

  const onChangeHandler = e => {
    const options = accompany_relation;
    const selectedOption = [...e.target.options].filter(o => o.selected).map(o => o.value);
    const idx = options.indexOf(selectedOption[0]);
    if (idx > -1) options.splice(idx, 1);
    else options.push(selectedOption[0]);
    // TODO: accompany의 경우, 동행자 없음을 직접 눌러서 해제해야하는 이슈가 있음. 최소 1개 이상이 선택되어있도록 Select DOM이 설계된 듯. (전체 선택 해제가 안됨...)
    setAccompany_relation(options);
  };
  const onChangeHandler2 = e => {
    const options = activity;
    const selectedOption = [...e.target.options].filter(o => o.selected).map(o => o.value);
    const idx = options.indexOf(selectedOption[0]);
    if (idx > -1) options.splice(idx, 1);
    else options.push(selectedOption[0]);
    setActivity(options);
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="oneday"></label>당일(1)/숙박(2)
          <input type="text" {...onedayBind} />
        </div>
        <div>
          <label htmlFor="month"></label>여행출발 월(숫자만, 1~12)
          <input type="text" {...monthBind} />
        </div>
        {/* <div>
          <label htmlFor="purpose"></label>purpose
          <input type="text" {...purposeBind} />
        </div> */}
        <div>
          <label htmlFor="accompany_presence"></label>동행자 있음(1)/동행자 없음(2)
          <input type="text" {...accompany_presenceBind} />
        </div>
        <div>
          <label htmlFor="accompany_num"></label>동행자 수(숫자만, 자신 제외)
          <input type="text" {...accompany_numBind} />
        </div>
        <div>
          <label htmlFor="accompany_relation"></label>동행자와의 관계(중복선택 가능)
          <select multiple={true} name="accompany_relation" onChange={onChangeHandler} id="accompany_relation" value={accompany_relation}>
            <option value="0">동행자 없음</option>
            <option value="1">친구/연인</option>
            <option value="2">직장 동료</option>
            <option value="3">단체/모임</option>
            <option value="4">비동거가족</option>
            <option value="5">친척</option>
            <option value="6">기타</option>
          </select>
        </div>
        <div>
          <label htmlFor="pay"></label>총 예산(숫자만, 원 단위)
          <input type="text" {...payBind} />
        </div>
        <div>
          <label htmlFor="activity"></label>여행지에서의 기대활동(중복선택 가능)
          <select multiple={true} name="activity" onChange={onChangeHandler2} id="activity" value={activity}>
            <option value="0">자연 및 풍경 감상</option>
            <option value="1">음식관광</option>
            <option value="2">야외 위락 및 스포츠 활동</option>
            <option value="3">역사유적지 방문</option>
            <option value="4">테마파크, 놀이시설, 동/식물원 방문</option>
            <option value="5">휴식/휴양</option>
            <option value="6">온천/스파</option>
            <option value="7">쇼핑</option>
            <option value="8">지역 문화예술/공연/전시시설 관람</option>
            <option value="9">스포츠 경기 관람</option>
            <option value="10">지역 축제/이벤트 참가</option>
            <option value="11">교육/체험프로그램 참가</option>
            <option value="12">종교/성지순례</option>
            <option value="13">시티투어</option>
            <option value="14">드라마 촬영지 방문</option>
            <option value="15">가족/친지/친구 방문</option>
            <option value="16">회의참가/시찰</option>
            <option value="17">교육/훈련/연수</option>
            <option value="18">유흥/오락</option>
            <option value="19">기타</option>
          </select>
        </div>
        <div>
          <label htmlFor="sex"></label>남자(1)/여자(2)
          <input type="text" {...sexBind} />
        </div>
        <div>
          <label htmlFor="age"></label>나이(숫자만)
          <input type="text" {...ageBind} />
        </div>
        <div>
          <label htmlFor="marriage"></label>미혼(0)/기혼(1)
          <input type="text" {...marriageBind} />
        </div>
        <button>지역 추천받기</button>
      </form>
    </div>
  );
};

export default RegionSelectForm;
