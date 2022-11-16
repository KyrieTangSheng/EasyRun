import React from "react";
import ProfileApplication from "./Profile&Application";

export default function UploadApplication(props) {
  return (
    <ProfileApplication
      handleClose={props.handleClose}
      setShowAlert={props.setShowAlert}
      setSeverity={props.setSeverity}
      setAlertMsg={props.setAlertMsg}
      formType="upload"
    />
  );
}
