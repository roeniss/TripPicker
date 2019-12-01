import React, { useContext, useState } from "react";
import { DispatchContext, StateContext } from "../App";
import styled from "styled-components";
import { axios } from "../customAxios";
import Detail from "../modals/Detail";
import BookmarkIcon from "../components/BookmarkIcon";
import LikeIcon from "../components/LikeIcon";

const FeedItems = () => {
  const [detail, setDetail] = useState(false);

  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const toggleFavorite = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    const { contentIdx } = item;
    const data = { userIdx: state.get("id"), contentIdx };
    if (e.target.classList.contains("fas")) {
      axios("REMOVE_FAVORITE", dispatch, data);
      e.target.classList.remove("fas");
      e.target.classList.add("far");
    } else {
      axios("ADD_FAVORITE", dispatch, data);
      e.target.classList.add("fas");
      e.target.classList.remove("far");
    }
  };

  const toggleLike = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    const { contentIdx, categoryCode, subCategoryCode } = item;
    const data = { userIdx: state.get("id"), contentIdx, categoryCode, subCategoryCode };
    if (e.target.classList.contains("fas")) {
      axios("REMOVE_LIKE", dispatch, data);
      e.target.classList.remove("fas");
      e.target.classList.add("far");
    } else {
      axios("ADD_LIKE", dispatch, data);
      e.target.classList.add("fas");
      e.target.classList.remove("far");
    }
  };

  const showDetails = (e, contentIdx) => {
    window.scrollTo(0, 0);
    e.preventDefault();
    e.stopPropagation();
    setDetail(contentIdx);
  };

  const closeModal = e => {
    e.preventDefault();
    e.stopPropagation();
    setDetail(false);
  };

  const items = () => {
    if (state.get("feed").length === 0)
      return (
        <Loading>
          <i className="fas fa-spinner fa-spin fa-10x"></i>
        </Loading>
      );
    let data;
    if (state.get("showFavorites")) data = state.get("favorites");
    else data = state.get("feed");

    return data.map((item, index) => (
      // TODO: 렌더링 때부터 (state를 따로 가지고 있길 바라는) 좋아요 데이터와 매칭시켜, like 또는 non-like 표시
      <FlexChild onClick={e => showDetails(e, item.contentIdx)} style={{ backgroundImage: `url(${item.imageUrl})` }} key={item.contentIdx + index} id={item.contentIdx}>
        <BookmarkIcon handler={e => toggleFavorite(e, item)} clicked={item.bookmarked ? true : false} />
        <LikeIcon handler={e => toggleLike(e, item)} clicked={item.liked ? true : false} />
      </FlexChild>
    ));
  };

  return (
    <>
      {detail ? <Detail contentIdx={detail} closeModal={closeModal} /> : null}
      <div>현재 선택된 지역: {state.get("region")}</div>
      <div>현재 선택된 퍼소널리티 : {state.get("personality")}</div>
      <FlexParent>{items()}</FlexParent>
    </>
  );
};

const FlexParent = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 0 auto;
`;
const FlexChild = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 10px;
  // border: 1px red solid;
  text-align: center;
  background-size: cover;
  border-radius: 10px;
`;

const Loading = styled.div`
  height: 500px;
  width: 500px;
  margin: 0 auto;
  text-align: center;
  padding-top: 270px;
`;
export default FeedItems;
