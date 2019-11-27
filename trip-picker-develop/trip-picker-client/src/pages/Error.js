import React, { useContext } from "react";
import { StateContext, DispatchContext } from "../App";

const Error = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  return (
    <div>
      <h1>메시지 화면 (Error, Info) </h1>
      <h2>{state.get("error")}</h2>
      <button onClick={_ => dispatch({ type: "CLAER_ERROR" })}>메세지 종료</button>
    </div>
  );
};

export default Error;
