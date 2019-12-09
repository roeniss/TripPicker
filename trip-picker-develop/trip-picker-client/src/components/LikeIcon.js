import React from "react";

const LikeIcon = ({ handler, clicked, id }) => {
  const dynamicClassName = () => {
    if (clicked) return "fas";
    else return "far";
  };
  return (
    <span onClick={handler} id={id} style={{ fontSize: 3 + "em", color: "rgb(81,113,237)" }}>
      <i className={`${dynamicClassName()} fa-heart`} style={{ paddingLeft: 20 + "px", paddingTop: 10 + "px" }}></i>
    </span>
  );
};

export default LikeIcon;
