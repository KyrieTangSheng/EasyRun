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
import ResetPassword from "../profile edit pages/ResetPassword";
import ProfileApplication from "../profile edit pages/Profile&Application";
import EditInsInfo from "../profile edit pages/EditInsInfo";
import UploadApplication from "../profile edit pages/UploadApplication";
import SendNewContract from "../profile edit pages/SendNewContract"

export default function ProfileEdit(props) {
  const dialogContent = {
    "Reset Password":
      "If you want to reset your password, you need to enter your orginal password, then set your new password. You need to login again to varify your account.",
    "Edit Profile":
      "You can edit your personal profile information by filling out this form.",
    "Edit Institution Information":
      "You can edit your institution information by filling out this form.",
    "Upload Application":
      "You can upload your application result by filling out this form. We appreciate your information provide and it would certainly help other students who intent to apply for master studies",
    "Send a Contract":
      "You can send a contract to a student.",
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
          <ResetPassword
            handleClose={props.handleClose}
            setShowAlert={setShowAlert}
            setSeverity={setSeverity}
            setAlertMsg={setAlertMsg}
          />
        ) : props.dialogType === "Edit Profile" ? (
          <ProfileApplication
            handleClose={props.handleClose}
            setShowAlert={setShowAlert}
            setSeverity={setSeverity}
            setAlertMsg={setAlertMsg}
            formType="edit"
          />
        ) : props.dialogType === "Edit Institution Information" ? (
          <EditInsInfo
            handleClose={props.handleClose}
            setShowAlert={setShowAlert}
            setSeverity={setSeverity}
            setAlertMsg={setAlertMsg}
          />
        ) : props.dialogType === "Upload Application" ? (
          <UploadApplication
            handleClose={props.handleClose}
            setShowAlert={setShowAlert}
            setSeverity={setSeverity}
            setAlertMsg={setAlertMsg}
          />
        ) : props.dialogType === "Send a Contract" ? (
          <SendNewContract
            handleClose={props.handleClose}
            setShowAlert={setShowAlert}
            setSeverity={setSeverity}
            setAlertMsg={setAlertMsg}
          />
        ) : (
          <React.Fragment />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
