import React, { useState, useEffect } from "react";
import {
  Paper,
  Avatar,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import AccountServices from "../services/account";
import Alerting from "../components/Alerting";
import registerForm from "../forms/registerForm";

export default function Register() {
  const paperStyle = { padding: 20, width: 400, margin: "150px" };
  const avatarStyle = { backgroundColor: "green" };

  // handle registerValues
  const [registerValues, setRegisterValues] = useState({
    email: "",
    userName: "",
    pwd: "",
    dob: "1953-06-15",
    confirmedPassword: "",
    institutionName: "",
  });

  const [usertype, setUserType] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [showAlert, setShowAlert] = useState(false); // for alert
  const [InsData, setInsData] = useState([]);

  // handle Errors
  let formErrors = {
    emailError: { status: false, msg: "" },
    usernameError: { status: false, msg: "" },
    passwordError: { status: false, msg: "" },
    confirmedPasswordError: { status: false, msg: "" },
    usertypeError: { status: false, msg: "" },
    insError: { status: false, msg: "" },
    registerError: { status: "success", msg: "" },
  };

  const [errors, setErrors] = useState(formErrors);

  const handleEmail = (e) => {
    e.preventDefault();
    let email = e.target.value;
    setErrors({ ...errors, emailError: { status: false, msg: "" } });
    setRegisterValues({ ...registerValues, email: email });
  };

  const handleUsername = (e) => {
    e.preventDefault();
    let username = e.target.value;
    setErrors({ ...errors, usernameError: { status: false, msg: "" } });
    setRegisterValues({ ...registerValues, userName: username });
  };

  const handlePassword = (e) => {
    e.preventDefault();
    let password = e.target.value;
    setErrors({ ...errors, passwordError: { status: false, msg: "" } });
    setRegisterValues({ ...registerValues, pwd: password });
  };

  const handleConfirmedPassword = (e) => {
    e.preventDefault();
    let confirmedPassword = e.target.value;
    setErrors({
      ...errors,
      confirmedPasswordError: { status: false, msg: "" },
    });
    setRegisterValues({ ...registerValues, confirmedPassword: confirmedPassword });
  };

  const handleIns = (e) => {
    e.preventDefault();
    let ins = e.target.value;
    setErrors({ ...errors, insError: { status: false, msg: "" } });
    setRegisterValues({ ...registerValues, institutionName: ins });
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
      emailError: { status: false, msg: "" },
      usernameError: { status: false, msg: "" },
      passwordError: { status: false, msg: "" },
      confirmedPasswordError: { status: false, msg: "" },
      usertypeError: { status: false, msg: "" },
      insError: { status: false, msg: "" },
      registerError: { status: "success", msg: "" },
    };
    if (usertype.length === 0) {
      newErrorInfo.usertypeError = {
        status: true,
        msg: "Please select your user type.",
      };
      validationStatus = validationStatus && usertype.length !== 0;
    }
    //valid email
    if (registerValues.email.length === 0) {
      newErrorInfo.emailError = {
        status: true,
        msg: "Please enter your email address",
      };
      validationStatus = validationStatus && registerValues.email.length !== 0;
    }
    // valid email
    else if (
      /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(registerValues.email) === false
    ) {
      newErrorInfo.emailError = {
        status: true,
        msg: "Please enter a valid email address",
      };
      validationStatus =
        validationStatus &&
        /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(registerValues.email) !== false;
    }

    // valid username
    if (registerValues.userName.length === 0) {
      newErrorInfo.usernameError = {
        status: true,
        msg: "Please enter your username",
      };
      validationStatus = validationStatus && registerValues.userName.length !== 0;
    }
    if (registerValues.pwd.length === 0) {
      newErrorInfo.passwordError = {
        status: true,
        msg: "Please enter your password",
      };
      validationStatus = validationStatus && registerValues.pwd.length !== 0;
    }
    // same confirmed password
    if (registerValues.pwd !== registerValues.confirmedPassword) {
      newErrorInfo.confirmedPasswordError = {
        status: true,
        msg: "Two passwords are inconsistent",
      };
      validationStatus =
        validationStatus && registerValues.pwd === registerValues.confirmedPassword;
    }
    if (usertype === "instructor" && registerValues.institutionName === "") {
      newErrorInfo.insError = {
        status: true,
        msg: "Please choose the institution",
      };
      validationStatus =
        validationStatus &&
        !(usertype === "instructor" && registerValues.institutionName === "");
    }
    !validationStatus && setErrors(newErrorInfo);
    if (validationStatus) {
      setRegisterValues({ ...registerValues, confirmedPassword: "" });
      delete registerValues.confirmedPassword;
      if (usertype === "student") {
        delete registerValues.institutionName;
      }
      let signUpInfo = registerValues;
      console.log(JSON.stringify(signUpInfo));
      AccountServices.signup(signUpInfo, usertype)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === 1) {
            console.log(result.data);
            setErrors({
              ...errors,
              registerError: {
                status: "success",
                msg: "Register success, routing to login page...",
              },
            });
            setShowAlert(true);
            setTimeout(() => {
              window.location.href = "./login";
            }, 3000);
          } else {
            // handle fail register conditions
            if (result.code === 1) {
              setErrors({
                ...errors,
                registerError: {
                  status: "error",
                  msg: "Email already exists. You can directly login.",
                },
              });
              setShowAlert(true);
            } else if (result.code === 2) {
              setErrors({
                ...errors,
                registerError: {
                  status: "error",
                  msg:
                    "Institution does not exist. Please choose a correct one.",
                },
              });
              setShowAlert(true);
            }
          }
          //window.location.href="./";
        });
    }
  };

  const handleNextForm = (e) => {
    e.preventDefault();
    setErrors(formErrors);
    if (usertype.length === 0) {
      setErrors({
        ...errors,
        usertypeError: { status: true, msg: "Please select your user type." },
      });
    } else {
      setShowForm(!showForm);
    }
  };

  const values = {
    registerValues,
    usertype,
    showForm,
    showAlert,
    InsData,
    errors,
  }

  const functions = {
    handleEmail,
    handleUsername,
    handlePassword,
    handleConfirmedPassword,
    handleIns,
    handleUserType,
    handleSubmit,
    handleNextForm,
    setUserType,
    setShowForm,
  }

  useEffect(() => {
    if (usertype === "instructor") {
      AccountServices.GETInstitutions()
        .then((response) => response.json())
        .then((result) => {
          setInsData(JSON.parse(result.data));
        });
    }
  }, [usertype]);

  return (
    <div align="center">
      <Alerting 
      severity={errors.registerError.status} 
      msg={errors.registerError.msg}
      showAlert={showAlert}
      setShowAlert={setShowAlert}/>

      <Paper style={paperStyle} variant="outlined">
        <a href="./home">
          <Avatar style={avatarStyle}>
            <LockIcon />
          </Avatar>
        </a>
        <h2>Let's Run</h2>
        {showForm && ( // Form 1, choose user type
          <registerForm.registerForm1 values={values} functions={functions}/>
        )}

        {!showForm && usertype.length && ( // Form 2, give informations
           <registerForm.registerForm2 values={values} functions={functions}/>
        )}
      </Paper>
    </div>
  );
}
