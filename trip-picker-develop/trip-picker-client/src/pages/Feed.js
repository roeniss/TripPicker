import React, { useEffect, useContext } from "react";
import ModalButtons from "../modals/ModalButtons";
import FeedItems from "./FeedItems";
import { DispatchContext, StateContext } from "../App";
import { axios } from "../customAxios";

const Feed = () => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  useEffect(() => {
    const data = { userIdx: state.get("id") };
    axios("GET_FEED", dispatch, data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(state.get("showFavorites"));

  return (
    <div>
      {state.get("showFavorites") ? <h1>즐겨찾기 리스트</h1> : <h1>당신을 위한 관광 픽업 리스트</h1>}
      <ModalButtons />
      <FeedItems />
    </div>
  );
};

export default Feed;
