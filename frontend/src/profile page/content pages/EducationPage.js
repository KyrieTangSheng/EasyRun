import React from 'react'
import {
    TextField,
    Stack
  } from "@mui/material";

export default function EducationPage(props) {
// Education Page
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
