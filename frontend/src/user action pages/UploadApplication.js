import React from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import editProfileForm from "../forms/editProfileForm";
import uploadApplicationForm from "../forms/uploadApplicationForm";
import ApplicationServices from "../services/application";

export default function UploadApplication(props) {
  // Stepper Functions
  const steps = [
    "Select a University",
    "Select a Program",
    "Education Experience",
    "Institution Information",
  ];

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

  // Form information
  const userInfo = JSON.parse(localStorage.userInfo);
  const [PAvalues, setPAvalues] = React.useState(userInfo); //Application values

  const [program, setProgram] = React.useState(""); // For application upload program id info
  const [university, setUniversity] = React.useState(""); // For application upload university name info
  const [allPrograms, setAllPrograms] = React.useState([]); // For select programs
  const [allUniversities, setAllUniversities] = React.useState([]); // For select universities

  // let formErrors = {
  //   editError: { status: false, msg: "" },
  // };

  // const [errors, setErrors] = React.useState(formErrors);

  // education info handles
  const handleUndergradSchool = (e) => {
    e.preventDefault();
    let underGradSchool = e.target.value;
    setPAvalues({ ...PAvalues, underGradSchool: underGradSchool });
  };

  const handleMajor = (e) => {
    e.preventDefault();
    let major = e.target.value;
    setPAvalues({ ...PAvalues, major: major });
  };

  const handleOverallGPA = (e) => {
    e.preventDefault();
    let overallGPA = e.target.value;
    setPAvalues({ ...PAvalues, overallGPA: overallGPA });
  };

  const handleMajorGPA = (e) => {
    e.preventDefault();
    let majorGPA = e.target.value;
    setPAvalues({ ...PAvalues, majorGPA: majorGPA });
  };

  const handleGREScore = (e) => {
    e.preventDefault();
    let greScore = e.target.value;
    setPAvalues({ ...PAvalues, greScore: greScore });
  };

  const handleTOEFLScore = (e) => {
    e.preventDefault();
    let toeflScore = e.target.value;
    setPAvalues({ ...PAvalues, toeflScore: toeflScore });
  };

  const handleResearchExperience = (e) => {
    e.preventDefault();
    let researchExperience = e.target.value;
    setPAvalues({ ...PAvalues, researchExperience: researchExperience });
  };

  const handleInternshipExperience = (e) => {
    e.preventDefault();
    let internshipExperience = e.target.value;
    setPAvalues({ ...PAvalues, internshipExperience: internshipExperience });
  };

  const forms = {
    PAvalues,
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

  // get Universities list
  React.useEffect(() => {
    ApplicationServices.GetUniversities()
      .then((response) => response.json())
      .then((result) => {
        const universities = JSON.parse(result.data);
        setAllUniversities(universities.map((x, index) => ({ label: x.name })));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // get Programs list after a university is selected
  React.useEffect(() => {
    if (university !== "") {
      ApplicationServices.GetProgramsByUniversity(university, "all", 0)
        .then((response) => response.json())
        .then((result) => {
          const programs = JSON.parse(result.data);
          // map programs to a selection table
          setAllPrograms(
            programs.map((x, index) => ({
              label: x.name + " " + x.id,
              id: x.id,
            }))
          );
        });
    }
  }, [university]);

  return (
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
            All steps completed - you can click on Submit button to upload your
            application result, or click Reset Button to refill the form. We
            appreciate your information provide and it would certainly help
            other students who intent to apply for master studies.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
            <Button onClick={console.log("hi")}>Submit</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {
            // Upload Application Page
            activeStep === 0 ? ( // Upload Application Page 1
              <uploadApplicationForm.Selecting
                options={allUniversities}
                setInfo={setUniversity}
                type = {"university"}
              />
            ) : activeStep === 1 ? ( // Upload Application Page 2
              <uploadApplicationForm.Selecting
                options={allPrograms}
                setInfo={setProgram}
                type={"program"}
              />
            ) : activeStep === 2 ? ( // Upload Application Page 3, use the student education form
              <editProfileForm.StudentEducationForm forms={forms} />
            ) : activeStep === 3 ? ( // Upload Application Page 4
              <uploadApplicationForm.InstitutionInfoForm forms={forms} />
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
  );
}
