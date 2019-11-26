import React, { useContext } from "react";
import { StateContext } from "../App";
import SelectRegion from "./SelectRegion";

const Home = () => {
  const state = useContext(StateContext);

  return (
    <div>
      <h1>메인화면 (Home) </h1>
      {!state.get("region") ? <SelectRegion /> : state.get("region")}
    </div>
  );
};

export default Home;
