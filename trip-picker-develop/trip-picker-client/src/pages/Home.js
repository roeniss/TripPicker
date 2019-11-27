import React, { useContext, useEffect } from "react";
import { StateContext, DispatchContext } from "../App";
import SelectRegion from "./SelectRegion";
import { axios } from "../customAxios";
import SelectPersonality from "./SelectPersonality";

const Home = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    axios("GET_REGION", dispatch, { id: state.get("id") });
    axios("GET_PERSONALITY", dispatch, { id: state.get("id") });
    //axios로 region 있는지 없는지 확인
    //axios로 personality 있는지 없는지 확인
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>메인화면 (Home) </h1>
      {!state.get("region") ? <SelectRegion /> : null} {/* region이 없다면 지역 설정이 최우선과제*/}
      {state.get("region") && !state.get("personality") ? <SelectPersonality /> : null}
      {state.get("region") && state.get("personality") ? "1" : null}
    </div>
  );
};

export default Home;
