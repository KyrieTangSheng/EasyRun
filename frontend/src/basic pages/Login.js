import React, { useState } from "react";
import {
  Paper,
  Avatar,
} from "@mui/material";
import DirectionsRunIcon from "@mui/icons-material/Directions";
import AccountServices from "../services/account";
import Alerting from "../components/Alerting";
import loginForm from "../forms/loginForm";

export default function Login() {
  const paperStyle = { padding: 20, width: 400, margin: "150px" };
  const avatarStyle = { backgroundColor: "#17adb08f", width: 45, height: 45 };

  // handle signUpValues
  const [signUpValues, setSignUpValues] = useState({
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
    setSignUpValues({ ...signUpValues, email: email });
  };

  const handlePassword = (e) => {
    e.preventDefault();
    let password = e.target.value;
    setErrors({ ...errors, passwordError: { status: false, msg: "" } });
    setSignUpValues({ ...signUpValues, pwd: password });
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
    if (signUpValues.email.length === 0) {
      newErrorInfo.emailError = {
        status: true,
        msg: "Please enter your email address",
      };
      validationStatus = validationStatus && signUpValues.email.length !== 0;
    }
    //valid email
    else if (
      /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(signUpValues.email) === false
    ) {
      newErrorInfo.emailError = {
        status: true,
        msg: "Please enter a valid email address",
      };
      validationStatus =
        validationStatus &&
        /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(signUpValues.email) !== false;
    }
    // valid password
    if (signUpValues.pwd.length === 0) {
      newErrorInfo.passwordError = {
        status: true,
        msg: "Please enter your password",
      };
      validationStatus = validationStatus && signUpValues.pwd.length !== 0;
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
      let loginInfo = signUpValues;

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

  const values={
    signUpValues,
    usertype,
    errors,
  }

  const functions={
    setUserType,
    setShowAlert,
    handleEmail,
    handlePassword,
    handleUserType,
    handleSubmit
  }

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
        <loginForm.LoginForm values={values} functions={functions}/>
      </Paper>
    </div>
  );
}
