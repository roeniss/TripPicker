import React, { useState, useContext } from "react";
import regionInfo from "../helper/regionInfo";
import { axios } from "../customAxios";
import { DispatchContext, StateContext } from "../App";
import styled from "styled-components";

const RegionSelectMap = () => {
  const [sido, setSido] = useState("서울");
  const [sigungu, setSigungu] = useState("종로구");

  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const getSidoOptions = () => {
    const sidos = new Set();
    Object.keys(regionInfo).forEach(regionCode => {
      const { sido } = regionInfo[regionCode];
      sidos.add(sido);
    });
    const sidosList = Array.from(sidos);
    return sidosList.map(sido => (
      <option value={sido} key={sido}>
        {sido}
      </option>
    ));
  };

  const getSigunguOptions = () => {
    const sigungus = new Set();
    const currentSido = sido;
    Object.keys(regionInfo).forEach(regionCode => {
      const { sido, sigungu } = regionInfo[regionCode];
      if (sido === currentSido) {
        sigungus.add(sigungu);
      }
    });
    const sigunguList = Array.from(sigungus);
    return sigunguList.map(sigungu => (
      <option value={sigungu} key={sigungu}>
        {sigungu}
      </option>
    ));
  };

  const setSidoAndSigungu = e => {
    // sigungu도 sido에 맞는 걸로 선택시켜줘야됨.
    e.preventDefault();
    const currentSido = e.target.value;
    const keys = Object.keys(regionInfo).filter(key => currentSido === regionInfo[key].sido);
    const firstSigungu = regionInfo[keys[0]].sigungu;
    setSido(currentSido);
    setSigungu(firstSigungu);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    if (!sido || !sigungu) return alert("지역을 선택해주세요");
    const fullRegion = sido + " " + sigungu;
    axios("UPDATE_REGION", dispatch, { userIdx: state.get("id"), region: fullRegion });
  };

  return (
    <div>
      <RegionSelectMapForm onSubmit={onSubmitHandler}>
        <select onChange={e => setSidoAndSigungu(e)}>{getSidoOptions()}</select>
        <select onChange={e => setSigungu(e.target.value)}>{getSigunguOptions()}</select>
        <button>지역등록</button>
      </RegionSelectMapForm>
    </div>
  );
};

export default RegionSelectMap;

const RegionSelectMapForm = styled.form`
  padding-top: 100px;

  select {
    height: 100px;
    font-size: 30px;
  }
  select:nth-of-type(1) {
    width: 89px;
    margin-right: 30px;
  }
  select:nth-of-type(2) {
    width: 140px;
    margin-right: 30px;
  }
  button {
    height: 100px;
    width: 140px;
    font-size: 30px;
    border-radius: 10px;
    background-color: pink;
  }
`;
