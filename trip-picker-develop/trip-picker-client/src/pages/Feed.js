import React, { useEffect } from "react";
import FeedFooter from "./FeedFooter";
import RefreshButton from "./RefreshButton";
import FeedItems from "./FeedItems";

const Feed = () => {
  useEffect(() => {
    // axios 로 서버에서 아이템들 모두 소환하여, state에 저장
    // Feed 컴포넌트가 Main page의 실질적인 Root 디렉토리이기 때문에 여기에서 실행하는 것임
    // 저장할 값들
    // 1. 전체 (내 퍼소널리티에 맞는) 아이템들
    // 2. 내 즐겨찾기 아이템들
    // 3. 내 좋아요/싫어요 아이템들
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <RefreshButton />
      <FeedItems />
      <FeedFooter />
    </div>
  );
};

export default Feed;
