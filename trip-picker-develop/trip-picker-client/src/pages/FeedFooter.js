import React, { useContext } from "react";
import { DispatchContext } from "../App";

const FeedFooter = () => {
  const dispatch = useContext(DispatchContext);

  return (
    <div>
      {/* TODO: 즐겨찾기 버튼: 누르면 즐겨찾기 아이템만 보는 토글 버튼 구현 - dispatch 만 있어도 될듯 */}
      <button onClick={_ => dispatch({ type: "CLEAR_REGION" })}>reset region</button>
      <button onClick={_ => dispatch({ type: "CLEAR_PERSONALITY" })}>reset personality</button>
    </div>
  );
};

export default FeedFooter;
