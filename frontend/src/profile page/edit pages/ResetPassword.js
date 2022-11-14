import React from "react";
import {
  Button,
  TextField,
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import AccountServices from "../../services/account";

export default function ResetPassword(props) {
  // Reset Password Business Logic
  const pwd = JSON.parse(localStorage.userInfo).pwd;

  const [values, setValues] = React.useState({
    originalPwd: "",
    newPwd: "",
    confirmedNewPwd: "",
  });

  let formErrors = {
    origianlPwdError: { status: false, msg: "" },
    confirmedNewPwdError: { status: false, msg: "" },
  };

  const [errors, setErrors] = React.useState(formErrors);

  const setShowAlert = props.setShowAlert

  const handleOriginalPassword = (e) => {
    e.preventDefault();
    let password = e.target.value;
    setErrors({
      ...errors,
      origianlPwdError: { status: false, msg: "" },
    });
    setValues({ ...values, originalPwd: password });
  };

  const handleNewPassword = (e) => {
    e.preventDefault();
    let password = e.target.value;
    setErrors({
      ...errors,
      confirmedNewPwdError: { status: false, msg: "" },
    });
    setValues({ ...values, newPwd: password });
  };

  const handleConfirmedPassword = (e) => {
    e.preventDefault();
    let password = e.target.value;
    setErrors({
      ...errors,
      confirmedNewPwdError: { status: false, msg: "" },
    });
    setValues({ ...values, confirmedNewPwd: password });
  };

  function checkOriginalPwd() {
    console.log(values.originalPwd, pwd);
    if (values.originalPwd !== pwd) {
      setErrors({
        ...errors,
        origianlPwdError: { status: true, msg: "Password Incorrect" },
      });
    } else {
      handleNext();
    }
  }

  function checkNewPwd() {
    console.log(values.newPwd, values.confirmedNewPwd);
    if (values.newPwd !== values.confirmedNewPwd) {
      setErrors({
        ...errors,
        confirmedNewPwdError: {
          status: true,
          msg: "New Password and Confirmed Password Unmatch.",
        },
      });
    } else {
      handleNext();
    }
  }

  // Stepper Functions
  const steps = [
    "Enter Original Password",
    "Set New Password",
    "Confirm New Password",
  ];
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  // Submit Function
  const handleSubmit = () => {
    let userInfo = JSON.parse(localStorage.userInfo);
    userInfo.pwd = values.newPwd;
    if (localStorage.userType === "instructor") {
      userInfo["institutionId"] = userInfo.institution;
      userInfo.institution = undefined;
      delete userInfo["institution"];
    }
    console.log(userInfo);
    AccountServices.updateProfile(userInfo, localStorage.userType)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 1) {
          props.setShowAlert(true);
          props.setSeverity("success");
          props.setAlertMsg(
            "Password reset success. To verify, you need to sign in again."
          );
          setTimeout(() => {
            localStorage.clear();
            window.location.href = "../login";
          }, 2000);
        }
      })
      .catch((err) => {
        return err;
      });
  };

  React.useEffect(() => {
    setShowAlert(false);
  }, [setShowAlert]);
  
  return (
    <Box sx={{ width: "100%" }}>
      {/* stepper properties */}
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          // Check label error
          if (index === 0) {
            labelProps.error = errors.origianlPwdError.status;
          } else if (index === 2) {
            labelProps.error = errors.confirmedNewPwdError.status;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {/* form properties */}
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you can click on Submit button to change your
            password, or click Reset Button to refill the form.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
            <Button
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {
            // Original Password Check
            activeStep === 0 ? (
              <TextField
                autoFocus
                label="Original Password"
                type="password"
                fullWidth
                variant="standard"
                onChange={handleOriginalPassword}
                value={values.originalPwd}
                error={errors.origianlPwdError.status}
                helperText={errors.origianlPwdError.msg}
              />
            ) : // New Password
            activeStep === 1 ? (
              <TextField
                autoFocus
                label="New Password"
                type="password"
                fullWidth
                variant="standard"
                onChange={handleNewPassword}
                value={values.newPwd}
              />
            ) : // Confirmed NewPassowrd
            activeStep === 2 ? (
              <TextField
                autoFocus
                label="Confirm New Password"
                type="password"
                fullWidth
                variant="standard"
                onChange={handleConfirmedPassword}
                value={values.confirmedNewPwd}
                error={errors.confirmedNewPwdError.status}
                helperText={errors.confirmedNewPwdError.msg}
              />
            ) : null
          }
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            {/* Step Back Button */}
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {/* Step Next Button */}
            <Button
              onClick={() => {
                if (activeStep === 0) {
                  checkOriginalPwd();
                } else if (activeStep === 2) {
                  checkNewPwd();
                } else {
                  handleNext();
                }
              }}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
