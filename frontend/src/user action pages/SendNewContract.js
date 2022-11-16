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
import InstructorHomepageServices from "../services/instructorHomepage";

export default function SendNewContract(props) {
  // Stepper Functions
  const steps = ["Give Student Email", "Specify Contract Content"];

  const [activeStep, setActiveStep] = React.useState(0);

  const setShowAlert = props.setShowAlert;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setShowAlert(false);
    setActiveStep(0);
  };

  //---------------------------------------------------------------------------
  // Contract values
  let userInfo = JSON.parse(localStorage.userInfo);
  const [contractInfo, setContractInfo] = React.useState({
    studentEmail: "",
    instructorId: userInfo.id,
    institutionId: userInfo.institution,
    content: "",
  });

  let formErrors = {
    emailError: { status: false, msg: "" },
    contentError: { status: false, msg: "" },
  };
  const [errors, setErrors] = React.useState(formErrors);

  const handleEmail = (e) => {
    e.preventDefault();
    let email = e.target.value;
    setErrors({ ...errors, emailError: { status: false, msg: "" } });
    setContractInfo({ ...contractInfo, studentEmail: email });
  };

  const handleContent = (e) => {
    e.preventDefault();
    let content = e.target.value;
    setErrors({ ...errors, contentError: { status: false, msg: "" } });
    setContractInfo({ ...contractInfo, content: content });
  };

  // check email
  const emailValidationCheck = () => {
    if (contractInfo.studentEmail.length === 0) {
      setErrors({
        ...errors,
        emailError: {
          status: true,
          msg: "Please enter student email address.",
        },
      });
    }
    // valid email
    else if (
      /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(
        contractInfo.studentEmail
      ) === false
    ) {
      setErrors({
        ...errors,
        emailError: {
          status: true,
          msg: "Please enter a valid email address.",
        },
      });
    } else {
      handleNext();
    }
  };

  // check content
  const contentCheck = () => {
    if (contractInfo.content.length === 0) {
      setErrors({
        ...errors,
        contentError: {
          status: true,
          msg: "Please write the contract content.",
        },
      });
    } else {
      handleNext();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(formErrors);
    setShowAlert(true);
    InstructorHomepageServices.SendContract(contractInfo)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 1) {
          props.setSeverity("success");
          props.setAlertMsg(
            "Contract send success. Waiting for student to accept it."
          );
        } else {
          props.setSeverity("error");
          props.setAlertMsg("Student email not exists.");
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
            labelProps.error = errors.emailError.status;
          } else if (index === 1) {
            labelProps.error = errors.contentError.status;
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
            All steps completed - you can click on Send Contract button to send
            a contract to student, or click Reset Button to refill the form.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
            <Button onClick={handleSubmit}>Send Contract</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {
            // Original Password Check
            activeStep === 0 ? (
              <TextField
                autoFocus
                label="Student Email"
                type="email"
                fullWidth
                variant="standard"
                margin="normal"
                onChange={handleEmail}
                error={errors.emailError.status}
                helperText={errors.emailError.msg}
              />
            ) : // New Password
            activeStep === 1 ? (
              <TextField
                autoFocus
                label="Contract Content"
                fullWidth
                multiline
                variant="standard"
                margin="normal"
                onChange={handleContent}
                error={errors.contentError.status}
                helperText={errors.contentError.msg}
              />
            ) : null
          }
          {/* Buttons */}
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
                  emailValidationCheck();
                } else if (activeStep === 1) {
                  contentCheck();
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
