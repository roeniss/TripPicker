import React, { useState, useContext } from "react";
import useInputState from "../hooks/useInputState";
import { axios } from "../customAxios";
import { DispatchContext, StateContext } from "../App";
import styled from "styled-components";

const RegionSelectForm = () => {
  const [oneday, setOneday] = useState(0);
  const [month, setMonth] = useState(0);
  const [purpose, _] = useInputState(1);
  const [accompany_presence, setAccompany_presence] = useState(0);
  const [accompany_num, accompany_numBind] = useInputState("");
  const [accompany_relation, setAccompany_relation] = useState(["0"]);
  const [pay, payBind] = useInputState("");
  const [activity, setActivity] = useState(["0"]);
  const [sex, setSex] = useState(0);
  const [age, ageBind] = useInputState("");
  const [marriage, setMarriage] = useState(false);
  const [submitSwitch, setSubmitSwitch] = useState(false);

  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const onSubmitHandler = e => {
    e.preventDefault();
    e.stopPropagation();

    if (pay === "" || isNaN(pay) || !Number.isInteger(Number(pay)) || Number(pay) < 0) return alert("올바른 값을 입력해주세요(총 예산)");
    if (!["1", "2"].includes(oneday)) return alert("올바른 값을 입력해주세요(숙박 여부)");
    if (!["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].includes(month)) return alert("올바른 값을 입력해주세요(여행 출발 시기)");
    if (!["1", "2"].includes(accompany_presence)) return alert("올바른 값을 입력해주세요(동행자 정보)");
    if (isNaN(accompany_num) || !Number.isInteger(Number(accompany_num)) || Number(accompany_num) < 0) return alert("올바른 값을 입력해주세요(동행자 정보)");
    if (Number(accompany_num) > 0 && accompany_presence === "2") return alert("올바른 값을 입력해주세요(동행자 정보)");
    if (Number(accompany_num) === 0 && accompany_presence === "1") return alert("올바른 값을 입력해주세요(동행자 정보)");
    if (accompany_presence === "2") {
      // 2 === 동행자 없음
      if (!(accompany_relation.length === 1 && accompany_relation[0] === "0")) return alert("올바른 값을 입력해주세요(동행자 정보)");
    } else if (accompany_presence === "1") {
      if (!(accompany_relation.length > 0 && !accompany_relation.includes("0"))) return alert("올바른 값을 입력해주세요(동행자 정보)");
    } else {
      return alert("올바른 값을 입력해주세요(동행자 정보)");
    }
    if (activity.length === "0") return alert("올바른 값을 입력해주세요(여행지에서의 기대활동)");
    if (!["1", "2"].includes(sex)) return alert("올바른 값을 입력해주세요(성별)");
    if (isNaN(age) || !(0 <= Number(age) && Number(age) <= 120)) return alert("올바른 값을 입력해주세요(나이)");
    if (!["0", "1"].includes(marriage)) return alert("올바른 값을 입력해주세요(결혼 여부)");

    if (!oneday || !month || !purpose || !accompany_presence || !accompany_num || !sex || !age) return alert("입력하지 않은 항목이 있습니다"); // accompany_relation, activity 는 체크 안함

    const converted_accompany_relation = [0, 0, 0, 0, 0, 0]; // 미성님 모델에 넣을 수 있도록 convert
    accompany_relation.forEach(each => (converted_accompany_relation[Number(each)] = 1));
    const converted_activity = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 도합 20개
    activity.forEach(each => (converted_activity[Number(each)] = 1));

    const fullData = {
      oneday: Number(oneday),
      month: Number(month),
      purpose: Number(purpose),
      accompany_presence: Number(accompany_presence),
      accompany_num: Number(accompany_num),
      accompany_relation: converted_accompany_relation,
      pay: Number(pay),
      activity: converted_activity,
      sex: Number(sex),
      age: Number(age),
      marriage: Number(marriage)
    };

    setSubmitSwitch(true);

    setTimeout(() => {
      axios("RECOMMEND_REGION", dispatch, { fullData, userIdx: state.get("id") });
    }, 5000);
  };

  const onChangeHandler = e => {
    const options = accompany_relation;
    const selectedOption = [...e.target.options].filter(o => o.selected).map(o => o.value);
    const idx = options.indexOf(selectedOption[0]);
    if (idx > -1) options.splice(idx, 1);
    else options.push(selectedOption[0]);

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

  const onChangeHandler3 = e => {
    setAccompany_presence(e.target.value);
    if (e.target.value === "2") {
      e.target.value = "0";
      accompany_numBind.onChange(e);
    }
  };

  if (submitSwitch)
    return (
      <>
        <h2>트리피커가 최적의 여행지를 추천하고 있습니다</h2>
        <Loading>
          <i className="fas fa-spinner fa-spin fa-10x"></i>
        </Loading>
      </>
    );
  return (
    <div>
      <ResionSelectFormForm onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="oneday"></label>숙박 여부
          <br />
          <select name="oneday" onChange={e => setOneday(e.target.value)} id="oneday" value={oneday}>
            <option value="0"></option>
            <option value="1">당일</option>
            <option value="2">숙박</option>
          </select>
        </div>
        <div>
          <label htmlFor="month"></label>여행 출발 시기 (월)
          <br />
          <select name="month" onChange={e => setMonth(e.target.value)} id="month" value={month}>
            <option value="0"></option>
            <option value="1">1월</option>
            <option value="2">2월</option>
            <option value="3">3월</option>
            <option value="4">4월</option>
            <option value="5">5월</option>
            <option value="6">6월</option>
            <option value="7">7월</option>
            <option value="8">8월</option>
            <option value="9">9월</option>
            <option value="10">10월</option>
            <option value="11">11월</option>
            <option value="12">12월</option>
          </select>
        </div>
        {/* <div>
          <label htmlFor="purpose"></label>purpose<br />
          <input type="text" {...purposeBind} />
        </div> */}
        <div>
          <label htmlFor="accompany_presence"></label>동행자 유무
          <br />
          <select name="accompany_presence" onChange={onChangeHandler3} id="accompany_presence" value={accompany_presence}>
            <option value="0"></option>
            <option value="1">동행자 있음</option>
            <option value="2">동행자 없음</option>
          </select>
        </div>
        <div>
          <label htmlFor="accompany_num"></label>동행자 수(숫자만, 자신 제외)
          <br />
          <input type="text" {...accompany_numBind} />
        </div>
        <div>
          <label htmlFor="accompany_relation"></label>동행자와의 관계(중복선택 가능)
          <br />
          <select multiple={true} name="accompany_relation" onChange={onChangeHandler} id="accompany_relation" value={accompany_relation}>
            <option value="0">동행자 없음</option>
            <option value="1">친구/연인</option>
            <option value="2">직장 동료</option>
            <option value="3">단체/모임</option>
            <option value="4">비동거가족</option>
            <option value="5">친척</option>``
            <option value="6">기타</option>
          </select>
        </div>
        <div>
          <label htmlFor="pay"></label>총 예산(숫자만, 원 단위)
          <br />
          <input type="text" {...payBind} />
        </div>
        <div>
          <label htmlFor="activity"></label>여행지에서의 기대활동(중복선택 가능)
          <br />
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
          <label htmlFor="sex"></label>성별
          <br />
          <select name="sex" onChange={e => setSex(e.target.value)} id="sex" value={sex}>
            <option value="0"></option>
            <option value="1">남자</option>
            <option value="2">여자</option>
          </select>
        </div>
        <div>
          <label htmlFor="age"></label>나이(숫자만)
          <br />
          <input type="text" {...ageBind} />
        </div>
        <div>
          <label htmlFor="marriage"></label>결혼 여부
          <br />
          <select name="marriage" onChange={e => setMarriage(e.target.value)} id="marriage" value={marriage}>
            <option value={false}></option>
            <option value="0">미혼</option>
            <option value="1">기혼</option>
          </select>
        </div>
        <button>지역 추천받기</button>
      </ResionSelectFormForm>
    </div>
  );
};

const ResionSelectFormForm = styled.form`
  padding-top:10px;
  margin: 30px 0
  margin: 0 auto;
  width: 400px;
  border-radius: 10px; 

  div {
    padding-bottom: 20px;
    text-align: center;
  }
  button {
    margin-bottom:10px
    border-radius: 5px;
    width: 150px;
    padding:10px 0 ;
    background-color: skyblue;
  }

  #accompany_relation{
    height:110px;
  }
  #activity{
    height:110px;
  }
  
  button{
    cursor:pointer
  } 

  #register-btn {
    background-color: pink;
  }
  #goto-login-btn {
    background-color: gray;
  }
`;

export default RegionSelectForm;

const Loading = styled.div`
  height: 500px;
  width: 500px;
  margin: 0 auto;
  text-align: center;
  padding-top: 270px;
`;
