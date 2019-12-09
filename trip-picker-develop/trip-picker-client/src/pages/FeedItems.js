import React, { useContext, useState } from "react";
import { DispatchContext, StateContext } from "../App";
import styled from "styled-components";
import { axios } from "../customAxios";
import Detail from "../modals/Detail";
import BookmarkIcon from "../components/BookmarkIcon";
import LikeIcon from "../components/LikeIcon";
import getRegionCodeByName from "../helper/getRegionCodeByName";

const FeedItems = () => {
  const [detail, setDetail] = useState(false);

  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const toggleFavorite = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    const { contentIdx, categoryCode, subCategoryCode, title, imageUrl } = item;
    const data = { userIdx: state.get("id"), contentIdx, categoryCode, subCategoryCode, title, imageUrl };
    if (e.target.classList.contains("fas")) {
      axios("REMOVE_FAVORITE", dispatch, data);
      e.target.classList.remove("fas");
      e.target.classList.add("far");
      // if (state.get("showFavorites")) {
      // const updatedFavorites = state.get("favorites").filter(each => each.contentIdx !== item.contentIdx);
      // dispatch({ type: "UPDATE_FAVORITES", payload: updatedFavorites });
      // }
    } else {
      axios("ADD_FAVORITE", dispatch, data);
      e.target.classList.add("fas");
      e.target.classList.remove("far");
      // if (!state.get("showFavorites")) {
      // const updatedFavorites = state.get("favorites");
      // updatedFavorites.push(item);
      // dispatch({ type: "UPDATE_FAVORITES", payload: updatedFavorites });
      // }
    }
  };

  const toggleLike = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    const { contentIdx, categoryCode, subCategoryCode, title, imageUrl } = item;
    const [areaCode, sggCode] = getRegionCodeByName(state.get("region"));
    const data = { userIdx: state.get("id"), contentIdx, categoryCode, subCategoryCode, title, imageUrl, areaCode, sggCode };
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

  const makeItemElements = () => {
    if (state.get("feed").length === 0)
      return (
        <Loading>
          <i className="fas fa-spinner fa-spin fa-10x"></i>
        </Loading>
      );

    let data;
    if (state.get("showFavorites")) data = state.get("favorites");
    else data = state.get("feed");

    if (data.length === 0) {
      return <h2>현재 즐겨찾기에 담긴 아이템이 없습니다.</h2>;
    }

    return data.map((item, _index) => {
      const key = state.get("showFavorites") + item.contentIdx;
      return (
        <FlexChild onClick={e => showDetails(e, item.contentIdx)} style={{ backgroundImage: `url(${item.imageUrl})` }} key={key} id={item.contentIdx}>
          <BookmarkIcon handler={e => toggleFavorite(e, item)} clicked={item.bookmarked ? true : false} />
          <LikeIcon handler={e => toggleLike(e, item)} clicked={item.liked ? true : false} />
          <div>{item.title.substring(0, 25)}</div>
          <div>{item.categoryCode}</div>
        </FlexChild>
      );
    });
  };

  const convertPersonalityToKorean = personality => {
    switch (personality) {
      case "NATURE_PERSONAL":
        return "자연속의 나";
      case "EXTREME_PERSONAL":
        return "활동적인";
      case "CULTURE_PERSONAL":
        return "문화생활";
      default:
        // case "FAMILY_PERSONAL":
        return "가족여행";
    }
  };

  return (
    <>
      {detail ? <Detail contentIdx={detail} closeModal={closeModal} userIdx={state.get("id") || 1} /> : null}
      <div>현재 선택된 지역: {state.get("region")}</div>
      <div>현재 선택된 퍼소널리티 : {convertPersonalityToKorean(state.get("personality"))}</div>
      <FlexParent>{makeItemElements()}</FlexParent>
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

  > div {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 98%;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 10px;
  }
  > div:nth-of-type(1) {
    bottom: 3px;
  }
  > div:nth-of-type(2) {
    bottom: 43px;
  }
`;

const Loading = styled.div`
  height: 500px;
  width: 500px;
  margin: 0 auto;
  text-align: center;
  padding-top: 270px;
`;

export default FeedItems;
