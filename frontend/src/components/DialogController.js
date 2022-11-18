import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import Alerting from "./Alerting";
import ResetPassword from "../user actions/ResetPassword";
import ProfileApplication from "../user actions/EditProfile";
import EditInsInfo from "../user actions/EditInsInfo";
import UploadApplication from "../user actions/UploadApplication";
import SendNewContract from "../user actions/SendNewContract";
import SignContract from "../user actions/SignContract";
import RateInstitution from "../user actions/RateInstitution";


// The dialog controller controls all the behaviors of opening dialog,
// which including "Edit Profile", "Edit Institution Information", "Reset User Password"
// "Send New Contract", "Sign Contract", "Upload Application Result", "Rate Institution",

export default function DialogController(props) {
  const dialogContent = {
    "Reset Password":
      "If you want to reset your password, you need to enter your orginal password, then set your new password. You need to login again to varify your account.",
    "Edit Profile":
      "You can edit your personal profile information by filling out this form.",
    "Edit Institution Information":
      "You need to provide your institution verification code, then you can edit your institution information by filling out this form.",
    "Upload Application":
      "You can upload your application result by filling out this form. We appreciate your information provide and it would certainly help other students who intent to apply for master studies. Feel free to delete those information you do not want to share.",
    "Send a Contract": "You can send a contract to a student.",
    "Sign Contract":
      "Make sure if you are going to sign this contract. You can either choose Accept or Reject, or you can close the window to make a second thought.",
    "Rate Institution":
      "You can rate your signed institution here. Your comment would help others to supervise the institution behaviors. You can change your rating result by rating again.",
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
      <DialogTitle style={{ fontSize: 28, fontFamily: ["Segoe UI"] }}>{props.dialogType}</DialogTitle>
      <DialogContent>
        {props.dialogType === ("Sign Contract" || "Send a Contract") ? (
          <DialogContentText style={{ fontSize: 24, color: "red" }}>
            WARNING: THIS ACTION CANNOT BE UNDONE!
          </DialogContentText>
        ) : (
          <React.Fragment></React.Fragment>
        )}
        <DialogContentText sx={{ pt: 2, fontFamily: ["Segoe UI"] }}>
          {dialogContent[props.dialogType]}
        </DialogContentText>
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
        ) : props.dialogType === "Sign Contract" ? (
          <SignContract
            handleClose={props.handleClose}
            setShowAlert={setShowAlert}
            setSeverity={setSeverity}
            setAlertMsg={setAlertMsg}
          />
        ) : props.dialogType === "Rate Institution" ? (
          < RateInstitution
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
