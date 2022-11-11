import React from "react";
import {
  //Avatar,
  Box,
  Button,
  Paper,
  TextField,
} from "@mui/material";
import Stack from "@mui/material/Stack";

function PageOne(props) {
  return (
    <Stack spacing={4}>
      <Stack direction="row" justifyContent="space-around">
        {/* Email Field*/}
        <TextField
          value={props.userInfo.email}
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
          value={props.userInfo.pwd}
          label="Password"
          margin="normal"
          variant="filled"
          InputProps={{
            readOnly: true,
          }}
        />
        {/* UserName Field*/}
        <TextField
          value={props.userInfo.userName}
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
          value={props.userInfo.lastName}
          label="Last Name"
          margin="normal"
          variant="filled"
          InputProps={{
            readOnly: true,
          }}
        />

        {/* First Name Field*/}
        <TextField
          value={props.userInfo.firstName}
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
          disabled
          type="date"
          margin="normal"
          variant="filled"
          value={props.userInfo.dob}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Stack>
    </Stack>
  );
}

function PageTwo(props) {
  //Student Education Page
  if (props.userType === "student") {
    return (
      <Stack spacing={-1}>
        <Stack direction="row" justifyContent="space-around">
          {/* Undergradschool Field*/}
          <TextField
            value={props.userInfo.underGradSchool}
            label="Undergraduate school"
            margin="normal"
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
          />

          {/* Major Field*/}
          <TextField
            value={props.userInfo.major}
            label="Major"
            margin="normal"
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
          />
          {/* Overall GPA Field*/}
          <TextField
            value={props.userInfo.overallGPA}
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
            value={props.userInfo.majorGPA}
            label="Major GPA"
            margin="normal"
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
          />

          {/* GRE score Field*/}
          <TextField
            value={props.userInfo.greScore}
            label="GRE Score"
            margin="normal"
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
          />
          {/* TOEFL/IELTS Field*/}
          <TextField
            value={props.userInfo.toeflScore}
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
            value={props.userInfo.researchExperience}
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
            value={props.userInfo.internshipExperience}
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
      <Stack spacing={-1}>
        <Stack direction="row" justifyContent="flex-start">
          {/* TOEFL/IELTS Field*/}
          <TextField
            value={props.userInfo.institutionName}
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
            value={props.userInfo.researchExperience}
            label="Education Experience"
            multiline
            rows={20}
            margin="normal"
            variant="filled"
            style={{ width: "98%" }}
          />
        </Stack>
      </Stack>
    );
  }
}

export default function ProfileStudent(props) {
  let userInfo = JSON.parse(localStorage.userInfo);

  let BoxStyle = {
    0: { position: "fixed", top: 290, left: "44.9%", width: 700, height: 400 },
    1: { position: "fixed", top: 220, left: "44.9%", width: 700, height: 400 },
    2: { position: "fixed", top: 220, left: "44.9%", width: 700, height: 400 },
    3: { position: "fixed", top: 220, left: "44.9%", width: 700, height: 400 },
  };

  let PaperStyle = {
    0: { height: 200, width: 700, opacity: 0.9, backgroundColor: "#ffe7ba" },
    1: { height: 400, width: 700, opacity: 0.9, backgroundColor: "#ffe7ba" },
    2: { height: 400, width: 700, opacity: 0.9, backgroundColor: "#ffe7ba" },
    3: { height: 400, width: 700, opacity: 0.9, backgroundColor: "#ffe7ba" },
  };

  return (
    <Box sx={BoxStyle[props.navigatorValue]}>
      <Paper style={PaperStyle[props.navigatorValue]} variant="outlined">
        {/* check navigator value to render different pages */}
        {props.navigatorValue === 0 ? (
          <PageOne userInfo={userInfo} />
        ) : props.navigatorValue === 1 ? (
          <PageTwo userInfo={userInfo} userType={props.userType} />
        ) : (
          <></>
        )}
      </Paper>

      {/* edit Button */}
      <Box display="flex" alignment="flex-end" justifyContent="flex-end">
        <Button
          variant="contained"
          size="small"
          style={{ backgroundColor: "rgb(19, 115, 134)" }}
        >
          Edit Profile
        </Button>
      </Box>
    </Box>
  );
}
