import React from "react";
import {
  TextField,
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import AccountServices from "../../services/account";

export default function EditProfile(props) {
  const userInfo = JSON.parse(localStorage.userInfo);
  const [values, setValues] = React.useState(userInfo);

  let formErrors = {
    editError: { status: false, msg: "" },
  };

  const [errors, setErrors] = React.useState(formErrors);

  // common info handles
  const handleEmail = (e) => {
    e.preventDefault();
    let email = e.target.value;
    setValues({ ...values, email: email });
  };

  const handleUserName = (e) => {
    e.preventDefault();
    let userName = e.target.value;
    setValues({ ...values, userName: userName });
  };

  const handleFirstName = (e) => {
    e.preventDefault();
    let firstName = e.target.value;
    setValues({ ...values, firstName: firstName });
  };

  const handleLastName = (e) => {
    e.preventDefault();
    let lastName = e.target.value;
    setValues({ ...values, lastName: lastName });
  };

  const handledob = (e) => {
    e.preventDefault();
    let dob = e.target.value;
    setValues({ ...values, dob: dob });
  };

  // education info handles
  //-- instructor type --
  const handleEducationExperience = (e) => {
    e.preventDefault();
    let educationExperience = e.target.value;
    localStorage.userType === "instructor" &&
      setValues({ ...values, educationExperience: educationExperience });
  };
  //-- student type --
  const handleUndergradSchool = (e) => {
    e.preventDefault();
    let underGradSchool = e.target.value;
    localStorage.userType === "student" &&
      setValues({ ...values, underGradSchool: underGradSchool });
  };

  const handleMajor = (e) => {
    e.preventDefault();
    let major = e.target.value;
    localStorage.userType === "student" &&
      setValues({ ...values, major: major });
  };

  const handleOverallGPA = (e) => {
    e.preventDefault();
    let overallGPA = e.target.value;
    localStorage.userType === "student" &&
      setValues({ ...values, overallGPA: overallGPA });
  };

  const handleMajorGPA = (e) => {
    e.preventDefault();
    let majorGPA = e.target.value;
    localStorage.userType === "student" &&
      setValues({ ...values, majorGPA: majorGPA });
  };

  const handleGREScore = (e) => {
    e.preventDefault();
    let greScore = e.target.value;
    localStorage.userType === "student" &&
      setValues({ ...values, greScore: greScore });
  };

  const handleTOEFLScore = (e) => {
    e.preventDefault();
    let toeflScore = e.target.value;
    localStorage.userType === "student" &&
      setValues({ ...values, toeflScore: toeflScore });
  };

  const handleResearchExperience = (e) => {
    e.preventDefault();
    let researchExperience = e.target.value;
    localStorage.userType === "student" &&
      setValues({ ...values, researchExperience: researchExperience });
  };

  const handleInternshipExperience = (e) => {
    e.preventDefault();
    let internshipExperience = e.target.value;
    localStorage.userType === "student" &&
      setValues({ ...values, internshipExperience: internshipExperience });
  };

  // Stepper Functions
  const steps = ["Common Information", "Education Experience"];
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    props.setShowAlert(false);
    setActiveStep(0);
  };

  const handleSubmit = () => {
    console.log(values);
    AccountServices.updateProfile(values, localStorage.userType)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result.status === 1) {
          props.setShowAlert(true);
          props.setSeverity("success");
          props.setAlertMsg(
            "Profile update succeeded. Close the window to see the updates."
          );
          setTimeout(() => {
            localStorage.userInfo = result.data;
          }, 500);
        } else {
          if (result.code === 1) {
            props.setShowAlert(true);
            props.setSeverity("error");
            props.setAlertMsg(
              "Profile update failed. The email has been taken."
            );
            setErrors({
              ...errors,
              editError: { status: "error", msg: "Email Already Exist." },
            });
            props.setShowAlert(true);
          } else if (result.code === 2) {
            props.setShowAlert(true);
            props.setSeverity("error");
            props.setAlertMsg(
              "Profile update failed. The user name has been taken."
            );
            setErrors({
              ...errors,
              editError: { status: "error", msg: "User Name Already Taken." },
            });
            props.setShowAlert(true);
          }
        }
      })
      .catch((err) => {
        return err;
      });
  };

  React.useEffect(() => {
    props.setShowAlert(false);
  }, []);

  return (
    <React.Fragment>
      <Box sx={{ width: "100%" }}>
        {/* stepper properties */}
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
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
              All steps completed - you can click on Submit button to change
              your account information, or click Reset Button to refill the
              form.
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
                <React.Fragment>
                  {/* common part */}
                  <TextField
                    label="Email"
                    type="email"
                    disabled
                    fullWidth
                    variant="standard"
                    value={values.email}
                    onChange={handleEmail}
                  />
                  <TextField
                    label="User Name"
                    fullWidth
                    variant="standard"
                    value={values.userName}
                    onChange={handleUserName}
                  />
                  <TextField
                    label="First Name"
                    fullWidth
                    variant="standard"
                    value={values.firstName}
                    onChange={handleFirstName}
                  />
                  <TextField
                    label="Last Name"
                    fullWidth
                    variant="standard"
                    value={values.lastName}
                    onChange={handleLastName}
                  />
                  <TextField
                    label="Date of Birth"
                    type="date"
                    fullWidth
                    variant="standard"
                    value={values.dob}
                    onChange={handledob}
                  />
                </React.Fragment>
              ) : // New Password
              activeStep === 1 && localStorage.userType === "student" ? (
                <React.Fragment>
                  {/* Student Education Part1 */}
                  <TextField
                    label="Undergraduate School"
                    fullWidth
                    variant="standard"
                    value={values.underGradSchool}
                    onChange={handleUndergradSchool}
                  />
                  <TextField
                    label="Major"
                    fullWidth
                    variant="standard"
                    value={values.major}
                    onChange={handleMajor}
                  />
                  <TextField
                    label="Overall GPA"
                    fullWidth
                    type="number"
                    variant="standard"
                    value={values.overallGPA}
                    onChange={handleOverallGPA}
                  />
                  <TextField
                    label="Major GPA"
                    fullWidth
                    type="number"
                    variant="standard"
                    value={values.majorGPA}
                    onChange={handleMajorGPA}
                  />
                  <TextField
                    label="GRE Score"
                    fullWidth
                    type="number"
                    variant="standard"
                    value={values.greScore}
                    onChange={handleGREScore}
                  />
                  <TextField
                    label="TOEFL / IELTS Score"
                    fullWidth
                    type="number"
                    variant="standard"
                    value={values.toeflScore}
                    onChange={handleTOEFLScore}
                  />
                  <TextField
                    label="Research Experience"
                    multiline
                    rows={3}
                    fullWidth
                    variant="standard"
                    value={values.researchExperience}
                    onChange={handleResearchExperience}
                  />
                  <TextField
                    label="Internship Experience"
                    multiline
                    rows={3}
                    fullWidth
                    variant="standard"
                    value={values.internshipExperience}
                    onChange={handleInternshipExperience}
                  />
                </React.Fragment>
              ) : activeStep === 1 && localStorage.userType === "instructor" ? (
                <React.Fragment>
                  <TextField
                    label="Education Experience"
                    multiline
                    rows={6}
                    fullWidth
                    variant="standard"
                    value={values.educationExperience}
                    onChange={handleEducationExperience}
                  />
                </React.Fragment>
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
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </React.Fragment>
  );
}
