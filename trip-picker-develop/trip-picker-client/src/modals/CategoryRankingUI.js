import React, { useContext } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { _DispatchContext, StateContext } from "../App";

const modalElem = document.getElementById("rank-modal");
const CategoryRankingUI = () => {
  // const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const getRank = () => {
    const categoryRanking = state.get("categoryRanking");
    return categoryRanking.map((each, index) => (
      <div>
        {index + 1}위: {each.customCategoryType} ( {each.ratio} )
      </div>
    ));
  };

  // if (state.get("categoryRanking").length === 0) return <></>;

  return ReactDOM.createPortal(
    <Modal id="rank-modal-modal">
      <h2>카테고리 별 추천 점수 현황</h2>
      {getRank()}
    </Modal>,
    modalElem
  );
};
const Modal = styled.div`
  display: inline-block;
  position: absolute;
  top: 10px;
  left: 40px;
  h2 {
    margin: 5px;
  }
  div {
    font-size: 12px;
    margin-left: 5px;
  }
`;

export default CategoryRankingUI;
