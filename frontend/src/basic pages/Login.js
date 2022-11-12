import React, { useState } from "react";
import {
  Paper,
  Avatar,
  Typography,
  Link,
  Box,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import DirectionsRunIcon from "@mui/icons-material/Directions";
import AccountServices from "../services/account";
import Alerting from "../components/Alerting";

export default function Login() {
  const paperStyle = { padding: 20, width: 400, margin: "150px" };
  const avatarStyle = { backgroundColor: "#17adb08f", width: 45, height: 45 };

  // handle values
  const [values, setValues] = useState({
    email: "",
    pwd: "",
  });

  const [usertype, setUserType] = useState("");
  const [showAlert, setShowAlert] = useState(false); // for alert

  // handle Errors
  let formErrors = {
    loginError: { status: "success", msg: "" },
    emailError: { status: false, msg: "" },
    passwordError: { status: false, msg: "" },
    usertypeError: { status: false, msg: "" },
  };

  const [errors, setErrors] = useState(formErrors);

  const handleEmail = (e) => {
    e.preventDefault();
    let email = e.target.value;
    setErrors({ ...errors, emailError: { status: false, msg: "" } });
    setValues({ ...values, email: email });
  };

  const handlePassword = (e) => {
    e.preventDefault();
    let password = e.target.value;
    setErrors({ ...errors, passwordError: { status: false, msg: "" } });
    setValues({ ...values, pwd: password });
  };

  const handleUserType = (e) => {
    e.preventDefault();
    let usertype = e.target.value;
    setErrors({ ...errors, usertypeError: { status: false, msg: "" } });
    setUserType(usertype);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(formErrors);
    localStorage.setItem("isLoggedIn", false);
    let validationStatus = true;
    let newErrorInfo = {
      loginError: { status: "success", msg: "" },
      emailError: { status: false, msg: "" },
      passwordError: { status: false, msg: "" },
      usertypeError: { status: false, msg: "" },
    };
    if (values.email.length === 0) {
      newErrorInfo.emailError = {
        status: true,
        msg: "Please enter your email address",
      };
      validationStatus = validationStatus && values.email.length !== 0;
    }
    //valid email
    else if (
      /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(values.email) === false
    ) {
      newErrorInfo.emailError = {
        status: true,
        msg: "Please enter a valid email address",
      };
      validationStatus =
        validationStatus &&
        /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(values.email) !== false;
    }
    // valid password
    if (values.pwd.length === 0) {
      newErrorInfo.passwordError = {
        status: true,
        msg: "Please enter your password",
      };
      validationStatus = validationStatus && values.pwd.length !== 0;
    }
    if (usertype.length === 0) {
      newErrorInfo.usertypeError = {
        status: true,
        msg: "Please select your user type.",
      };
      validationStatus = validationStatus && usertype.length !== 0;
    }
    !validationStatus && setErrors(newErrorInfo);
    if (validationStatus) {
      let loginInfo = values;

      AccountServices.login(loginInfo, usertype)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === 1) {
            localStorage.isLoggedIn = true; // user logged in
            localStorage.setItem("userType", usertype);
            localStorage.setItem("userInfo", result.data);
            setErrors({
              ...errors,
              loginError: { status: "success", msg: "Login Success." },
            });
            setShowAlert(true);
            setTimeout(() => {
              window.location.href = "./home/profile";
            }, 3000);
          } else {
            // handle the fail login conditions
            if (result.code === 3) {
              // email error
              setErrors({
                ...errors,
                loginError: { status: "error", msg: "Email Does Not Exist." },
              });
              setShowAlert(true);
            } else if (result.code === 2) {
              // password error
              setErrors({
                ...errors,
                loginError: { status: "error", msg: "Password Incorrect." },
              });
              setShowAlert(true);
            }
          }
        })
        .catch((err) => {
          return err;
        });
    }
  };

  return (
    <div align="center">
      {/* check login status alert */}
      <Alerting severity={errors.loginError.status} 
      msg={errors.loginError.msg}
      showAlert={showAlert}
      setShowAlert={setShowAlert}/>

      <Paper style={paperStyle} variant="outlined">
        <a href="./home">
          <Avatar style={avatarStyle}>
            <DirectionsRunIcon />
          </Avatar>
        </a>
        <h2>Let's Run</h2>
        <Box
          align="center"
          component="form"
          onSubmit={handleSubmit}
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
            onChange={handleEmail}
            value={values.email}
            error={errors.emailError.status}
            helperText={errors.emailError.msg}
          />

          {/* Password Field*/}
          <TextField
            required
            type="password"
            id="password"
            label="Password"
            onChange={handlePassword}
            value={values.pwd}
            error={errors.passwordError.status}
            helperText={errors.passwordError.msg}
          />

          {/* Log in Role Field*/}
          <TextField
            required
            id="outlined-select-role"
            select
            label="Login As"
            value={usertype}
            onChange={handleUserType}
            error={errors.usertypeError.status}
            helperText={errors.usertypeError.msg}
          >
            <MenuItem value={"student"}>Student</MenuItem>
            <MenuItem value={"instructor"}>Instructor</MenuItem>
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
      </Paper>
    </div>
  );
}
