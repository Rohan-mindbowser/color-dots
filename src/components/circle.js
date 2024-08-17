import React from "react";

const Circle = ({ top, left, color }) => {
  return (
    <div
      className="circle"
      style={{
        backgroundColor: `${color}`,
        top: `${top - 26}px`,
        left: `${left - 26}px`,
      }}
    ></div>
  );
};

export default Circle;
