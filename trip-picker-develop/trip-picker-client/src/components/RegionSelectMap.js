import React, { useState, useContext } from "react";
import regionInfo from "../helper/regionInfo";
import { axios } from "../customAxios";
import { DispatchContext } from "../App";

const RegionSelectMap = () => {
  const [sido, setSido] = useState("서울");
  const [sigungu, setSigungu] = useState("종로구");

  const dispatch = useContext(DispatchContext);

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
    const curruentSido = sido;
    Object.keys(regionInfo).forEach(regionCode => {
      const { sido, sigungu } = regionInfo[regionCode];
      if (sido === curruentSido) sigungus.add(sigungu);
    });
    const sigunguList = Array.from(sigungus);
    return sigunguList.map(sigungu => (
      <option value={sigungu} key={sigungu}>
        {sigungu}
      </option>
    ));
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    if (!sido || !sigungu) return alert("지역을 선택해주세요");
    const fullRegion = sido + " " + sigungu;
    // TODO: axios 로 서버에 region 업데이트 하고, 동시에 state[region] 업데이트

    axios("UPDATE_REGION", dispatch, { region: fullRegion });
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <select onChange={e => setSido(e.target.value)}>{getSidoOptions()}</select>
        <select onChange={e => setSigungu(e.target.value)}>{getSigunguOptions()}</select>
        <button>지역등록</button>
      </form>
    </div>
  );
};

export default RegionSelectMap;
