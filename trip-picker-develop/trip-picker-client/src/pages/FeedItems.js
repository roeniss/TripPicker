import React, { useContext, useState } from "react";
import { DispatchContext, StateContext } from "../App";
import styled from "styled-components";
import { axios } from "../customAxios";
import Detail from "../modals/Detail";

const FeedItems = () => {
  const [detail, setDetail] = useState(false);

  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const toggleFavorite = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    const { contentIdx } = item;
    const data = { userIdx: state.get("id"), contentIdx };
    if (e.target.classList.contains("bookmarked")) {
      axios("REMOVE_FAVORITE", dispatch, data);
      e.target.classList.remove("bookmarked");
    } else {
      axios("ADD_FAVORITE", dispatch, data);
      e.target.classList.add("bookmarked");
    }
  };

  const toggleLike = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    const { contentIdx, categoryCode, subCategoryCode } = item;
    const data = { userIdx: state.get("id"), contentIdx, categoryCode, subCategoryCode };
    if (e.target.classList.contains("liked")) {
      axios("REMOVE_LIKE", dispatch, data);
      e.target.classList.remove("liked");
    } else {
      axios("ADD_LIKE", dispatch, data);
      e.target.classList.add("liked");
    }
  };

  const showDetails = (e, targetId) => {
    e.preventDefault();
    e.stopPropagation();
    const target = state.get("feed").filter(each => each.number === targetId);
    setDetail(target[0]);
  };

  const closeModal = e => {
    e.preventDefault();
    e.stopPropagation();
    setDetail(false);
  };

  const items = () => {
    if (state.get("feed").length === 0) return <Loading>로딩중...</Loading>;
    let data;
    if (state.get("showFavorites")) data = state.get("favorites");
    else data = state.get("feed");

    return data.map(item => (
      // TODO: 렌더링 때부터 (state를 따로 가지고 있길 바라는) 좋아요 데이터와 매칭시켜, like 또는 non-like 표시
      <FlexChild onClick={e => showDetails(e, item.contentIdx)} style={{ backgroundImage: `url(${item.imageUrl})` }} key={item.contentIdx} id={item.contentIdx}>
        <ToggleFavoriteButton onClick={e => toggleFavorite(e, item)} className={item.bookmarked ? "bookmarked" : null} /> {/* TODO: 어떤 값으로 즐겨찾기를 보관하는지 확인 */}
        <ToggleLikeButton onClick={e => toggleLike(e, item)} className={item.liked ? "liked" : null} /> {/* TODO: 어떤 값으로 즐겨찾기를 보관하는지 확인 */}
      </FlexChild>
    ));
  };

  return (
    <>
      {detail ? <Detail target={detail} closeModal={closeModal} /> : null}
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
  width: 100px;
  height: 100px;
  margin: 10px;
  border: 1px red solid;
  text-align: center;
  background-size: cover;
`;
const ToggleFavoriteButton = styled.div`
  position:absolute;
  height:20px;
  width:20px;
  border:1px red solid;
  background-color:yellow
  top:10px;
  left:10px;
  &.bookmarked{
    background-color:red;
  }
`;
const ToggleLikeButton = styled.div`
  position:absolute;
  height:20px;
  width:20px;
  border:1px red solid;
  background-color:blue
  bottom:10px;
  left:10px
  &.liked{
    background-color:green
  }
`;

const Loading = styled.div`
  height: 500px;
  width: 500px;
  margin: 0 auto;
  text-align: center;
`;
export default FeedItems;
