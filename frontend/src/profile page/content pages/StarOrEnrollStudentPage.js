import React from "react";

export default function StarOrEnrollStudentPage(props) {
  // Star Page / Enrolled Student Page

  React.useEffect(() => {
    return;
  }, [props.userType]);

  if (props.userType === "student") {
    return <></>;
  } else {
    return <></>;
  }
}
