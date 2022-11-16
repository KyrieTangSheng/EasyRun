import React from "react";
import { Box, Paper, SpeedDial, SpeedDialAction } from "@mui/material";
import PatternIcon from "@mui/icons-material/Pattern";
import BadgeSharpIcon from "@mui/icons-material/BadgeSharp";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import RoomPreferencesRoundedIcon from "@mui/icons-material/RoomPreferencesRounded";
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import DialogController from "./DialogController";
import AccountPage from "./content pages/AccountPage";
import EducationPage from "./content pages/EducationPage";
import StarOrEnrollStudentPage from "./content pages/StarOrEnrollStudentPage";
import ContractOrInsInfoPage from "./content pages/PageFour";

export default function ProfileStudent(props) {
  let userInfo = JSON.parse(localStorage.userInfo);

  // some style define
  let BoxStyle = {
    0: {
      position: "absolute",
      top: 290,
      left: "44.9%",
      width: 700,
      height: 400,
    },
    1: {
      position: "absolute",
      top: 220,
      left: "44.9%",
      width: 700,
      height: 400,
    },
    2: {
      position: "absolute",
      top: 220,
      left: "44.9%",
      width: 700,
      height: 400,
    },
    3: {
      position: "absolute",
      top: 220,
      left: "44.9%",
      width: 700,
      height: 400,
    },
  };

  let PaperStyle = {
    0: { height: 200, width: 700, opacity: 0.9, backgroundColor: "#ffe7ba" },
    1: { height: 400, width: 700, opacity: 0.9, backgroundColor: "#ffe7ba" },
    2: { height: 400, width: 700, opacity: 0.9, backgroundColor: "#ffe7ba" },
    3: { height: 400, width: 700, opacity: 0.9, backgroundColor: "#ffe7ba" },
  };

  let studentSpeedDialStyle = {
    0: { position: "absolute", top: 160, right: -100 },
    1: { position: "absolute", top: 230, right: -100 },
    2: { position: "absolute", top: 230, right: -100 },
    3: { position: "absolute", top: 230, right: -100 },
  };

  let instructorSpeedDialStyle = {
    0: { position: "absolute", top: 100, right: -100 },
    1: { position: "absolute", top: 170, right: -100 },
    2: { position: "absolute", top: 170, right: -100 },
    3: { position: "absolute", top: 170, right: -100 },
  };

  // speeddial functions
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogType, setDialogType] = React.useState("");

  // dialog functions
  const handleClickOpenDialog = () => {
    setDialogOpen(true);
  };

  function handleSetDialogType(type) {
    setDialogType(type);
  }

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Box sx={BoxStyle[props.navigatorValue]}>
      <Paper style={PaperStyle[props.navigatorValue]} variant="outlined">
        {/* check navigator value to render different pages */}
        {props.navigatorValue === 0 ? (
          <AccountPage userInfo={userInfo} />
        ) : props.navigatorValue === 1 ? (
          <EducationPage userInfo={userInfo} userType={props.userType} />
        ) : props.navigatorValue === 2 ? (
          <StarOrEnrollStudentPage
            userInfo={userInfo}
            userType={props.userType}
          />
        ) : (
          <ContractOrInsInfoPage
            userInfo={userInfo}
            userType={props.userType}
            handleClickOpenDialog = {handleClickOpenDialog}
            handleSetDialogType = {handleSetDialogType}
          />
        )}
      </Paper>

      {/* Edit Speed Dial For Edit Pages*/}
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={
          localStorage.userType === "student"
            ? studentSpeedDialStyle[props.navigatorValue]
            : instructorSpeedDialStyle[props.navigatorValue]
        }
        icon={<BorderColorRoundedIcon />}
        FabProps={{
          sx: {
            bgcolor: "rgb(19, 115, 134)",
            "&:hover": {
              bgcolor: "rgb(196 206 30)",
            },
          },
        }}
      >
        <SpeedDialAction
          key="Edit Profile"
          icon={<BadgeSharpIcon />}
          tooltipTitle="Edit Profile"
          onClick={() => {
            handleClickOpenDialog();
            handleSetDialogType("Edit Profile");
          }}
        />
        <SpeedDialAction
          key="Reset Password"
          icon={<PatternIcon />}
          tooltipTitle="Reset Password"
          onClick={() => {
            handleClickOpenDialog();
            handleSetDialogType("Reset Password");
          }}
        />

        {/* When instructor logged in, the user can modify institution information and send a new contract */}
        {localStorage.userType === "instructor" ? (
          <SpeedDialAction
            key="Edit Institution Information"
            icon={<RoomPreferencesRoundedIcon />}
            tooltipTitle="Edit Institution Information"
            onClick={() => {
              handleClickOpenDialog();
              handleSetDialogType("Edit Institution Information");
            }}
          />
        ) : null}
        {localStorage.userType === "instructor" ? (
          <SpeedDialAction
            key="Send a Contract"
            icon={<GavelRoundedIcon />}
            tooltipTitle="Send a Contract"
            onClick={() => {
              handleClickOpenDialog();
              handleSetDialogType("Send a Contract");
            }}
          />
        ) : null}

        {/* When student logged in, the user can upload application result. */}
        {localStorage.userType === "student" ? (
          <SpeedDialAction
            key="Upload Application"
            icon={<UploadFileRoundedIcon />}
            tooltipTitle="Upload Application Result"
            onClick={() => {
              handleClickOpenDialog();
              handleSetDialogType("Upload Application");
            }}
          />
        ) : null}
      </SpeedDial>
      {/* Edit Page */}
      <DialogController
        open={dialogOpen}
        setOpen={setDialogOpen}
        handleClose={handleCloseDialog}
        dialogType={dialogType}
      />
    </Box>
  );
}
