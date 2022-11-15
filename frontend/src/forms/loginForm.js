import React from 'react'
import {
    Typography,
    Link,
    Box,
    TextField,
    MenuItem,
    Button,
  } from "@mui/material";

const LoginForm = (props) =>{
  return (
    <Box
    align="center"
    component="form"
    onSubmit={props.functions.handleSubmit}
    sx={{ "& .MuiTextField-root": { m: 1, width: "40ch" } }}
    noValidate
    autoComplete="off"
  >
    {/* Email Field*/}
    <TextField
      required
      type="email"
      id="email"
      label="Email"
      onChange={props.functions.handleEmail}
      value={props.values.signUpValues.email}
      error={props.values.errors.emailError.status}
      helperText={props.values.errors.emailError.msg}
    />

    {/* Password Field*/}
    <TextField
      required
      type="password"
      id="password"
      label="Password"
      onChange={props.functions.handlePassword}
      value={props.values.signUpValues.pwd}
      error={props.values.errors.passwordError.status}
      helperText={props.values.errors.passwordError.msg}
    />

    {/* Log in Role Field*/}
    <TextField
      required
      id="outlined-select-role"
      select
      label="Login As"
      value={props.values.usertype}
      onChange={props.functions.handleUserType}
      error={props.values.errors.usertypeError.status}
      helperText={props.values.errors.usertypeError.msg}
    >
      <MenuItem value={"student"}>student</MenuItem>
      <MenuItem value={"instructor"}>instructor</MenuItem>
    </TextField>

    {/* Button */}
    <Button
      type="submit"
      sx={{ m: 1, width: "40ch" }}
      style={{ backgroundColor: "#328059" }}
      fontSize="18px"
      variant="contained"
    >
      Sign In
    </Button>
    <Typography align="center" fontSize="12px">
      {" "}
      Do not have an account?
      <Link href="./register" fontSize="18px">
        Join Run Club now!
      </Link>
    </Typography>
  </Box>
  )
}

const loginForm = {
    LoginForm
}

export default loginForm