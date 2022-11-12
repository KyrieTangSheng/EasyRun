import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import Alerting from "../components/Alerting";
import ResetPassword from "./edit pages/ResetPassword";
import EditProfile from "./edit pages/EditProfile";
import EditInsInfo from "./edit pages/EditInsInfo";

export default function ProfileEdit(props) {
  const dialogContent = {
    "Reset Password":
      "If you want to reset your password, you need to enter your orginal password, then set your new password. You need to login again to varify your account.",
    "Edit Profile":
      "You can edit your personal profile information by filling out this form.",
    "Edit Institution Information":
      "You can edit your institution information by filling out this form.",
  };
  const [showAlert, setShowAlert] = React.useState(false);
  const [severity, setSeverity] = React.useState("success");
  const [alertMsg, setAlertMsg] = React.useState("");

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <Alerting
        severity={severity}
        msg={alertMsg}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
      <DialogTitle>{props.dialogType}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogContent[props.dialogType]}</DialogContentText>
        {props.dialogType === "Reset Password" ? (
          <ResetPassword handleClose={props.handleClose} setShowAlert={setShowAlert} setSeverity={setSeverity} setAlertMsg={setAlertMsg}/>
        ) : props.dialogType === "Edit Profile" ? (
          <EditProfile handleClose={props.handleClose} setShowAlert={setShowAlert} setSeverity={setSeverity} setAlertMsg={setAlertMsg}/>
        ) : props.dialogType === "Edit Institution Information" ? (
          <EditInsInfo handleClose={props.handleClose} setShowAlert={setShowAlert} setSeverity={setSeverity} setAlertMsg={setAlertMsg}/>
        ) : (
          <></>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
