import React from "react";
import Program from "../../program page/Program";

export default function StarOrEnrollStudentPage(props) {
  // Star Page / Enrolled Student Page

  if (props.userType === "student") {
    return <Program checkStar={true}/>;
  } else {
    return <></>;
  }
}
