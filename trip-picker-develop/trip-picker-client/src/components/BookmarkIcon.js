import React from "react";

const BookmarkIcon = ({ handler, clicked, id }) => {
  const dynamicClassName = () => {
    if (clicked) return "fas";
    else return "far";
  };
  return (
    <span onClick={handler} id={id} style={{ fontSize: 3 + "em", color: "rgb(246, 255, 120)" }}>
      <i className={`${dynamicClassName()} fa-bookmark`} style={{ paddingTop: 10 + "px" }}></i>
    </span>
  );
};

export default BookmarkIcon;
