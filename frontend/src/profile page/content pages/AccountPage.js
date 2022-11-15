import React from "react";
import {
    TextField,
    Stack
  } from "@mui/material";

// Account Page
export default function AccountPage(props) {
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