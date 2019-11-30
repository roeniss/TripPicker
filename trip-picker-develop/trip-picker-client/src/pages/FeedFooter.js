import React, { useContext } from "react";
import { DispatchContext, StateContext } from "../App";
import { axios } from "../customAxios";

const FeedFooter = () => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const refresh = () => {
    const data = { userIdx: state.get("id"), personality: state.get("personality") };
    axios("UPDATE_FEED", dispatch, data);
  };

  return (
    <div>{/* <button onClick={_ => dispatch({ type: "CLEAR_REGION" })}>reset region</button>
      <button onClick={_ => dispatch({ type: "CLEAR_PERSONALITY" })}>reset personality</button> */}</div>
  );
};

export default FeedFooter;
