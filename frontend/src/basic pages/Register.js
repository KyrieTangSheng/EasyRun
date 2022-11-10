import React, { useState, useEffect } from "react";
import {
  Paper,
  Avatar,
  Typography,
  Link,
  Box,
  TextField,
  MenuItem,
  Button,
  Collapse,
  IconButton,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import AccountServices from "../services/account";

export default function Register() {
  const paperStyle = { padding: 20, width: 400, margin: "150px" };
  const avatarStyle = { backgroundColor: "green" };

  // handle values
  const [values, setValues] = useState({
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
    setValues({ ...values, email: email });
  };
  const handleUsername = (e) => {
    e.preventDefault();
    let username = e.target.value;
    setErrors({ ...errors, usernameError: { status: false, msg: "" } });
    setValues({ ...values, userName: username });
  };

  const handlePassword = (e) => {
    e.preventDefault();
    let password = e.target.value;
    setErrors({ ...errors, passwordError: { status: false, msg: "" } });
    setValues({ ...values, pwd: password });
  };

  const handleConfirmedPassword = (e) => {
    e.preventDefault();
    let confirmedPassword = e.target.value;
    setErrors({
      ...errors,
      confirmedPasswordError: { status: false, msg: "" },
    });
    setValues({ ...values, confirmedPassword: confirmedPassword });
  };

  const handleIns = (e) => {
    e.preventDefault();
    let ins = e.target.value;
    setErrors({ ...errors, insError: { status: false, msg: "" } });
    setValues({ ...values, institutionName: ins });
  };

  const handleUserType = (e) => {
    e.preventDefault();
    let usertype = e.target.value;
    setErrors({ ...errors, usertypeError: { status: false, msg: "" } });
    setUserType(usertype);
  };

  useEffect(() => {
    if (usertype === "instructor") {
      AccountServices.getInstitutions()
        .then((response) => response.json())
        .then((result) => {
          setInsData(JSON.parse(result.data));
        });
    }
  }, [usertype]);

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
    if (values.email.length === 0) {
      newErrorInfo.emailError = {
        status: true,
        msg: "Please enter your email address",
      };
      validationStatus = validationStatus && values.email.length !== 0;
    }
    // valid email
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

    // valid username
    if (values.userName.length === 0) {
      newErrorInfo.usernameError = {
        status: true,
        msg: "Please enter your username",
      };
      validationStatus = validationStatus && values.userName.length !== 0;
    }
    if (values.pwd.length === 0) {
      newErrorInfo.passwordError = {
        status: true,
        msg: "Please enter your password",
      };
      validationStatus = validationStatus && values.pwd.length !== 0;
    }
    // same confirmed password
    if (values.pwd !== values.confirmedPassword) {
      newErrorInfo.confirmedPasswordError = {
        status: true,
        msg: "Two passwords are inconsistent",
      };
      validationStatus =
        validationStatus && values.pwd === values.confirmedPassword;
    }
    if (usertype === "instructor" && values.institutionName === "") {
      newErrorInfo.insError = {
        status: true,
        msg: "Please choose the institution",
      };
      validationStatus =
        validationStatus &&
        !(usertype === "instructor" && values.institutionName === "");
    }
    !validationStatus && setErrors(newErrorInfo);
    if (validationStatus) {
      setValues({ ...values, confirmedPassword: "" });
      delete values.confirmedPassword;
      if (usertype === "student") {
        delete values.institutionName;
      }
      let signUpInfo = values;
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

  const handleSubmit1 = (e) => {
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

  return (
    <div align="center">
      {showAlert ? (
        <Collapse in={showAlert}>
          <Alert
            severity={errors.registerError.status}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setShowAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {errors.registerError.msg}
          </Alert>
        </Collapse>
      ) : (
        <></>
      )}

      <Paper style={paperStyle} variant="outlined">
        <a href="./home">
          <Avatar style={avatarStyle}>
            <LockIcon />
          </Avatar>
        </a>
        <h2>Let's Run</h2>
        {showForm && (
          <Box
            align="center"
            component="form"
            onSubmit={handleSubmit1}
            sx={{ "& .MuiTextField-root": { m: 1, width: "40ch" } }}
            noValidate
            autoComplete="off"
          >
            <Typography align="center" fontSize="16px">
              {" "}
              Already have an account?
              <br></br>
              <Link href="./login" fontSize="18px">
                Click to log in!
              </Link>
            </Typography>
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

            <Button
              type="submit"
              sx={{ m: 1, width: "40ch" }}
              style={{ backgroundColor: "#328059" }}
              fontSize="25px"
              variant="contained"
            >
              Next
            </Button>
          </Box>
        )}

        {!showForm && usertype.length && (
          <Box
            align="center"
            component="form"
            onSubmit={handleSubmit}
            sx={{ "& .MuiTextField-root": { m: 1, width: "40ch" } }}
            noValidate
            autoComplete="off"
          >
            <Typography align="center" fontSize="16px">
              {" "}
              Already have an account?
              <br></br>
              <Link href="./login" fontSize="18px">
                Click to log in!
              </Link>
            </Typography>

            {/* Email Field */}
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
            {/* UsernameField */}
            <TextField
              required
              id="username"
              label="Username"
              onChange={handleUsername}
              value={values.userName}
              error={errors.usernameError.status}
              helperText={errors.usernameError.msg}
            />

            {/* Password Field */}
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

            {/* confirmed Password Field */}
            <TextField
              required
              type="password"
              id="confirmedPassword"
              label="Confirmed Password"
              onChange={handleConfirmedPassword}
              value={values.confirmedPassword}
              error={errors.confirmedPasswordError.status}
              helperText={errors.confirmedPasswordError.msg}
            />

            {usertype === "instructor" && (
              <TextField
                required
                id="outlined-select-role"
                select
                label="Institutions"
                value={values.institutionName}
                onChange={handleIns}
                error={errors.insError.status}
                helperText={errors.insError.msg}
              >
                {Object.entries(InsData).map(([key, value]) => (
                  <MenuItem key={key} value={value.name}>
                    {value.name}
                  </MenuItem>
                ))}
              </TextField>
            )}

            <Button
              type="submit"
              sx={{ m: 1, width: "20ch" }}
              style={{ backgroundColor: "#328059" }}
              fontSize="25px"
              variant="contained"
              onClick={() => {
                setUserType("");
                setShowForm(!showForm);
              }}
            >
              Last Step
            </Button>

            {/* Button  */}
            <Button
              type="submit"
              sx={{ m: 1, width: "20ch" }}
              style={{ backgroundColor: "black" }}
              fontSize="25px"
              variant="contained"
            >
              Register
            </Button>
          </Box>
        )}
      </Paper>
    </div>
  );
}
