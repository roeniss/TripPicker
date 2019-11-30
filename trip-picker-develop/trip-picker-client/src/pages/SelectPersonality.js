import React, { useState, useContext } from "react";
import { axios } from "../customAxios";
import { StateContext, DispatchContext } from "../App";
import styled from "styled-components";

const SelectPersonality = () => {
  const [personality, setPersonality] = useState("NATURE_PERSONAL");
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const onSubmitHandler = e => {
    e.preventDefault();
    if (!personality) return alert("입력하지 않은 항목이 있습니다");
    axios("UPDATE_PERSONALITY", dispatch, { userIdx: String(state.get("id")), personalityType: personality });
  };

  return (
    <div>
      <SelectPersonalityForm onSubmit={onSubmitHandler}>
        <select name="personality" id="personality" value={personality} onChange={e => setPersonality(e.target.value)}>
          <option value="NATURE_PERSONAL">자연속의 나</option>
          <option value="EXTREME_PERSONAL">짜릿함</option>
          <option value="CULTURE_PERSONAL">문화생활</option>
          <option value="FAMILY_PERSONAL">가족여행</option>
        </select>
        <button>퍼소널리티 등록</button>
      </SelectPersonalityForm>
    </div>
  );
};

export default SelectPersonality;

const SelectPersonalityForm = styled.form`
  padding-top: 100px;

  select {
    height: 100px;
    width: 220px;
    font-size: 30px;
  }
  select:nth-of-type(1) {
    margin-right: 30px;
  }

  button {
    height: 100px;
    font-size: 30px;
    border-radius: 10px;
    background-color: pink;
  }
`;
