import React from "react";
import {
  Box,
  Paper,
  TextField,
  SpeedDial,
  SpeedDialAction,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import PatternIcon from "@mui/icons-material/Pattern";
import BadgeSharpIcon from "@mui/icons-material/BadgeSharp";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import RoomPreferencesRoundedIcon from "@mui/icons-material/RoomPreferencesRounded";
import ProfileEdit from "./ProfileEdit";

// Account Page
function PageOne(props) {
  return (
    <Stack spacing={4}>
      <Stack direction="row" justifyContent="space-around">
        {/* Email Field*/}
        <TextField
          value={props.userInfo.email || ""}
          label="Email"
          margin="normal"
          variant="filled"
          InputProps={{
            readOnly: true,
          }}
        />

        {/* Password Field*/}
        <TextField
          type="password"
          value={"abc12345678910"}
          label="Password"
          margin="normal"
          variant="filled"
          InputProps={{
            readOnly: true,
          }}
        />
        {/* UserName Field*/}
        <TextField
          value={props.userInfo.userName || ""}
          label="User Name"
          variant="filled"
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
      </Stack>

      <Stack direction="row" justifyContent="space-around">
        {/* Last Name Field*/}
        <TextField
          value={props.userInfo.lastName || ""}
          label="Last Name"
          margin="normal"
          variant="filled"
          InputProps={{
            readOnly: true,
          }}
        />

        {/* First Name Field*/}
        <TextField
          value={props.userInfo.firstName || ""}
          label="First Name"
          margin="normal"
          variant="filled"
          InputProps={{
            readOnly: true,
          }}
        />
        {/* DoB Field*/}
        <TextField
          label="Date of Birth"
          type="date"
          margin="normal"
          variant="filled"
          value={props.userInfo.dob || ""}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Stack>
    </Stack>
  );
}
// Education Page
function PageTwo(props) {
  //Student Education Page
  if (props.userType === "student") {
    return (
      <Stack spacing={-1}>
        <Stack direction="row" justifyContent="space-around">
          {/* Undergradschool Field*/}
          <TextField
            value={props.userInfo.underGradSchool || ""}
            label="Undergraduate school"
            margin="normal"
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
          />

          {/* Major Field*/}
          <TextField
            value={props.userInfo.major || ""}
            label="Major"
            margin="normal"
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
          />
          {/* Overall GPA Field*/}
          <TextField
            value={props.userInfo.overallGPA || ""}
            label="Overall GPA"
            variant="filled"
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
        </Stack>

        <Stack direction="row" justifyContent="space-around">
          {/* Major GPA Field*/}
          <TextField
            value={props.userInfo.majorGPA || ""}
            label="Major GPA"
            margin="normal"
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
          />

          {/* GRE score Field*/}
          <TextField
            value={props.userInfo.greScore || ""}
            label="GRE Score"
            margin="normal"
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
          />
          {/* TOEFL/IELTS Field*/}
          <TextField
            value={props.userInfo.toeflScore || ""}
            label="TOEFL/IELTS Score"
            margin="normal"
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
          />
        </Stack>

        <Stack direction="row" justifyContent="space-around">
          {/* Research Experience Field */}
          <TextField
            value={props.userInfo.researchExperience || ""}
            label="Research Experience"
            multiline
            rows={3}
            margin="normal"
            variant="filled"
            style={{ width: "98%" }}
          />
        </Stack>

        <Stack direction="row" justifyContent="space-around">
          {/* Internship Experience Field */}
          <TextField
            value={props.userInfo.internshipExperience || ""}
            label="Internship Experience"
            multiline
            rows={3}
            margin="normal"
            variant="filled"
            style={{ width: "98%" }}
          />
        </Stack>
      </Stack>
    );
  }

  // Instructor Education Page
  else if (props.userType === "instructor") {
    return (
      <Stack spacing={-2}>
        <Stack direction="row" sx={{ position: "flex-start", padding: "10px" }}>
          {/* TOEFL/IELTS Field*/}
          <TextField
            value={props.userInfo.institutionName || ""}
            label="Institution"
            margin="normal"
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
          />
        </Stack>
        <Stack direction="row" justifyContent="space-around">
          {/* Education Experience Field */}
          <TextField
            value={props.userInfo.researchExperience || ""}
            label="Education Experience"
            multiline
            rows={9}
            margin="normal"
            variant="filled"
            style={{ width: "98%" }}
          />
        </Stack>
      </Stack>
    );
  }
}
// Star Page / Enrolled Student Page
function PageThree(props) {
  return <></>;
}
// Contract Page / Institution Information Page
function PageFour(props) {
  return <></>;
}

export default function ProfileStudent(props) {
  let userInfo = JSON.parse(localStorage.userInfo);

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
    0: { position: "absolute", top: 200, right: -100 },
    1: { position: "absolute", top: 250, right: -100 },
    2: { position: "absolute", top: 250, right: -100 },
    3: { position: "absolute", top: 250, right: -100 },
  };

  let instructorSpeedDialStyle = {
    0: { position: "absolute", top: 150, right: -100 },
    1: { position: "absolute", top: 220, right: -100 },
    2: { position: "absolute", top: 220, right: -100 },
    3: { position: "absolute", top: 220, right: -100 },
  };

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogType, setDialogType] = React.useState("");

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
          <PageOne userInfo={userInfo} />
        ) : props.navigatorValue === 1 ? (
          <PageTwo userInfo={userInfo} userType={props.userType} />
        ) : props.navigatorValue === 2 ? (
          <PageThree />
        ) : (
          <PageFour />
        )}
      </Paper>
      {/* Edit Speed Dial */}
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
        {/* When instructor logged in, the user can modify institution information. */}
        {localStorage.userType === "instructor" ? (
          <SpeedDialAction
            key="Edit Insitution Information"
            icon={<RoomPreferencesRoundedIcon />}
            tooltipTitle="Edit Insitution Information"
            onClick={() => {
              handleClickOpenDialog();
              handleSetDialogType("Edit Insitution Information");
            }}
          />
        ) : null}
      </SpeedDial>
      {/* Edit Page */}
      <ProfileEdit
        open={dialogOpen}
        setOpen={setDialogOpen}
        handleClose={handleCloseDialog}
        dialogType={dialogType}
      />
    </Box>
  );
}
