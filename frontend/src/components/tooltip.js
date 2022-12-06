import React from "react";

export function Tooltip(props) {
  const {  left, top, rating, criteria } = props;
  if (left === null) {
    return <div></div>;
  } else {
    const divStyle = {
      position: "absolute",
      textAlign: "left",
      width: "100px",
      height: "40px",
      padding: "2px",
      font: "12px sans-serif",
      background: "lightyellow",
      opacity: 0.9,
      border: "0px",
      borderRadius: "8px",
      pointerEvents: "none",
      left: `${left + 10}px`,
      top: `${top}px`,
    };
    return (
      <div style={divStyle}>
        <p>{criteria+": "+rating}</p>
      </div>
    );
  }
}
