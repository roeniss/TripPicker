import React, { useEffect, useContext } from "react";
// import FeedFooter from "./FeedFooter";
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

  return (
    <div>
      {state.get("showFavorites") ? <h1>즐겨찾기 목록</h1> : <h1>전체 목록</h1>}
      <ModalButtons />
      <FeedItems />
      {/* <FeedFooter /> */}
    </div>
  );
};

export default Feed;
