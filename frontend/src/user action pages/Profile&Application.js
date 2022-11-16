import React from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import AccountServices from "../services/account";
import editProfileForm from "../forms/editProfileForm";

export default function ProfileApplication(props) {
  // Stepper Functions
  const steps = {
    edit: ["Common Information", "Education Experience"],
    upload: [
      "Choose A Program",
      "Education Experience",
      "Institution Information",
    ],
  };
 
  const [activeStep, setActiveStep] = React.useState(0);

  const setShowAlert = props.setShowAlert
  
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

  // Form information
  const userInfo = JSON.parse(localStorage.userInfo);
  const [PAvalues, setPAvalues] = React.useState(userInfo);

  let formErrors = {
    editError: { status: false, msg: "" },
  };

  const [errors, setErrors] = React.useState(formErrors);

  // common info handles
  const handleEmail = (e) => {
    e.preventDefault();
    let email = e.target.value;
    setPAvalues({ ...PAvalues, email: email });
  };

  const handleUserName = (e) => {
    e.preventDefault();
    let userName = e.target.value;
    setPAvalues({ ...PAvalues, userName: userName });
  };

  const handleFirstName = (e) => {
    e.preventDefault();
    let firstName = e.target.value;
    setPAvalues({ ...PAvalues, firstName: firstName });
  };

  const handleLastName = (e) => {
    e.preventDefault();
    let lastName = e.target.value;
    setPAvalues({ ...PAvalues, lastName: lastName });
  };

  const handledob = (e) => {
    e.preventDefault();
    let dob = e.target.value;
    setPAvalues({ ...PAvalues, dob: dob });
  };

  // education info handles
  //-- instructor type --
  const handleEducationExperience = (e) => {
    e.preventDefault();
    let educationExperience = e.target.value;
    localStorage.userType === "instructor" &&
      setPAvalues({ ...PAvalues, educationExperience: educationExperience });
  };
  //-- student type --
  const handleUndergradSchool = (e) => {
    e.preventDefault();
    let underGradSchool = e.target.value;
    localStorage.userType === "student" &&
      setPAvalues({ ...PAvalues, underGradSchool: underGradSchool });
  };

  const handleMajor = (e) => {
    e.preventDefault();
    let major = e.target.value;
    localStorage.userType === "student" &&
      setPAvalues({ ...PAvalues, major: major });
  };

  const handleOverallGPA = (e) => {
    e.preventDefault();
    let overallGPA = e.target.value;
    localStorage.userType === "student" &&
      setPAvalues({ ...PAvalues, overallGPA: overallGPA });
  };

  const handleMajorGPA = (e) => {
    e.preventDefault();
    let majorGPA = e.target.value;
    localStorage.userType === "student" &&
      setPAvalues({ ...PAvalues, majorGPA: majorGPA });
  };

  const handleGREScore = (e) => {
    e.preventDefault();
    let greScore = e.target.value;
    localStorage.userType === "student" &&
      setPAvalues({ ...PAvalues, greScore: greScore });
  };

  const handleTOEFLScore = (e) => {
    e.preventDefault();
    let toeflScore = e.target.value;
    localStorage.userType === "student" &&
      setPAvalues({ ...PAvalues, toeflScore: toeflScore });
  };

  const handleResearchExperience = (e) => {
    e.preventDefault();
    let researchExperience = e.target.value;
    localStorage.userType === "student" &&
      setPAvalues({ ...PAvalues, researchExperience: researchExperience });
  };

  const handleInternshipExperience = (e) => {
    e.preventDefault();
    let internshipExperience = e.target.value;
    localStorage.userType === "student" &&
      setPAvalues({ ...PAvalues, internshipExperience: internshipExperience });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setShowAlert(true);
    if (localStorage.userType === "instructor") {
      PAvalues["institutionId"] = PAvalues.institution;
      PAvalues.institution = undefined;
      delete PAvalues["institution"];
    }
    console.log(PAvalues);
    AccountServices.updateProfile(PAvalues, localStorage.userType)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 1) {
          props.setSeverity("success");
          props.setAlertMsg(
            "Profile update succeeded. Close the window to see the updates."
          );
          setTimeout(() => {
            localStorage.userInfo = result.data;
          }, 500);
        } else {
          if (result.code === 1) {
            props.setSeverity("error");
            props.setAlertMsg(
              "Profile update failed. The email has been taken."
            );
            setErrors({
              ...errors,
              editError: { status: "error", msg: "Email Already Exist." },
            });
          } else if (result.code === 2) {
            props.setSeverity("error");
            props.setAlertMsg(
              "Profile update failed. The user name has been taken."
            );
            setErrors({
              ...errors,
              editError: { status: "error", msg: "User Name Already Taken." },
            });
          }
        }
      })
      .catch((err) => {
        return err;
      });
  };

  const forms = {
    PAvalues,
    handleEmail,
    handleUserName,
    handleFirstName,
    handleLastName,
    handledob,
    handleEducationExperience,
    handleUndergradSchool,
    handleMajor,
    handleOverallGPA,
    handleMajorGPA,
    handleGREScore,
    handleTOEFLScore,
    handleResearchExperience,
    handleInternshipExperience,
  };

  React.useEffect(() => {
    setShowAlert(false);
  }, [setShowAlert]);

  return (
    <Box sx={{ width: "100%" }}>
      {/* stepper properties */}
      <Stepper activeStep={activeStep}>
        {steps[props.formType].map((label, index) => {
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
      {activeStep === steps[props.formType].length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {props.formType === "edit"
              ? "All steps completed - you can click on Submit button to change your account information, or click Reset Button to refill the form."
              : "All steps completed - you can click on Submit button to upload your application result, or click Reset Button to refill the form. We appreciate your information provide and it would certainly help other students who intent to apply for master studies"}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
            <Button
              onClick={
                props.formType === "edit" ? handleEditSubmit : console.log("hi")
              }
            >
              Submit
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 && props.formType === "edit" ? ( // Edit Profile Page 1
            <editProfileForm.CommonForm forms={forms} />
          ) : activeStep === 1 && localStorage.userType === "student" ? ( // Edit Profile Page for Student
            <editProfileForm.StudentEducationForm forms={forms} />
          ) : activeStep === 1 && localStorage.userType === "instructor" ? ( // Edit Profile Page for Instructor
            <editProfileForm.InstructorEducationForm forms={forms} />
          ) : null}
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
              {activeStep === steps[props.formType].length - 1
                ? "Finish"
                : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
