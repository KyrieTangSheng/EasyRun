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
    "Application Result",
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
  // -------------------------------------------------------------------------------------------------------------------//
  // Form information
  const [PAvalues, setPAvalues] = React.useState({});

  const [program, setProgram] = React.useState(""); // For application upload program id info
  const [university, setUniversity] = React.useState(""); // For application upload university name info
  const [result, setResult] = React.useState("");
  const [institutionData, setInstitutionData] = React.useState(""); // For application upload ins info
  const [allPrograms, setAllPrograms] = React.useState([]); // For select programs
  const [allUniversities, setAllUniversities] = React.useState([]); // For select universities
  const [allInstitutions, setAllInstitutions] = React.useState([]);

  let formErrors = {
    uploadError: {
      status: "success",
      msg: "",
    },
    universityError: { status: false, msg: "" },
    programError: { status: false, msg: "" },
    resultError: { status: false, msg: "" },
  };

  const [errors, setErrors] = React.useState(formErrors);

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

  const checkUniversityEmpty = (e) => {
    e.preventDefault();
    if (university.length === 0) {
      setErrors({
        ...errors,
        universityError: { status: true, msg: "Please select a university." },
      });
    } else {
      handleNext();
    }
  };

  const checkProgramEmpty = (e) => {
    e.preventDefault();
    if (program.length === 0) {
      setErrors({
        ...errors,
        programError: { status: true, msg: "Please select a program." },
      });
    } else {
      handleNext();
    }
  };

  const checkResultEmpty = (e) => {
    e.preventDefault();
    if (result.length === 0) {
      setErrors({
        ...errors,
        resultError: {
          status: true,
          msg: "Please select an application result.",
        },
      });
    } else {
      handleNext();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlert(true);
    const ApplicationResultInfo = {
      programId: program,
      instructorName: institutionData.instructorName || "",
      institutionName: institutionData.institutionName || "",
      underGradSchool: PAvalues.underGradSchool || "",
      overallGPA: PAvalues.overallGPA || "",
      majorGPA: PAvalues.majorGPA || "",
      major: PAvalues.major || "",
      toeflScore: PAvalues.toeflScore || "",
      greScore: PAvalues.greScore || "",
      researchExp: PAvalues.researchExperience || "",
      internExp: PAvalues.internshipExperience || "",
      status: result,
    };

    ApplicationServices.UpLoadApplicationResult(ApplicationResultInfo)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 1) {
          props.setSeverity("success");
          props.setAlertMsg(
            "Upload application result success. Thank you for your contribution."
          );
        } else {
          props.setSeverity("error");
          props.setAlertMsg(
            "Upload application result fail. Some error occurs."
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const forms = {
    PAvalues,
    institutionData,
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

  // get Universities list for selecting
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

  // get Programs list for selecting after a university is selected
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

  // get Education and Contract Info for selecting if user type is student
  // get Institution info for Ins form if user type is instructor
  React.useEffect(() => {
    if (localStorage.userType === "student") {
      setPAvalues(JSON.parse(localStorage.userInfo)); // set education info
      let data = JSON.parse(localStorage.contractData);
      console.log(data)
      let contracts = JSON.parse(data.contracts)
      setAllInstitutions(
        contracts.map((row) => ({
          label: row.institutionName,
          institutionName: row.institutionName,
          instructorName: row.instructorName,
        }))
      );
    } else if (localStorage.userType === "instructor") {
      let data = JSON.parse(localStorage.institutionData);
      let info = JSON.parse(localStorage.userInfo);
      setInstitutionData({
        institutionName: data.name,
        instructorName: info.firstName + " " + info.lastName,
      });
    }
  }, []);

  return (
    <Box sx={{ width: "100%", pt: 2 }}>
      {/* stepper properties */}
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (index === 0) {
            labelProps.error = errors.universityError.status;
          } else if (index === 1) {
            labelProps.error = errors.programError.status;
          } else if (index === 2) {
            labelProps.error = errors.resultError.status;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {/* last page properties */}
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
            <Button
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Submit
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {
            // Upload Application Page
            activeStep === 0 ? ( // Upload Application Page 1 Select university
              <uploadApplicationForm.Selecting
                options={allUniversities}
                setInfo={setUniversity}
                errors={errors}
                setErrors={setErrors}
                type={"university"}
              />
            ) : activeStep === 1 ? ( // Upload Application Page 2 Select program
              <uploadApplicationForm.Selecting
                options={allPrograms}
                setInfo={setProgram}
                errors={errors}
                setErrors={setErrors}
                type={"program"}
              />
            ) : activeStep === 2 ? ( // Upload Application Page 3 Result
              <uploadApplicationForm.Selecting
                options={[{ label: "offer" }, { label: "reject" }]}
                setInfo={setResult}
                errors={errors}
                setErrors={setErrors}
                type={"result"}
              />
            ) : activeStep === 3 ? ( // Upload Application Page 4, use the student education form
              <editProfileForm.StudentEducationForm forms={forms} />
            ) : activeStep === 4 && localStorage.userType === "student" ? ( // Upload Application Page 5 for student select
              <uploadApplicationForm.Selecting
                options={allInstitutions}
                setInfo={setInstitutionData}
                type={"institution"}
              />
            ) : activeStep === 4 && localStorage.userType === "instructor" ? ( // Upload Application Page 5 for instructor auto implemented
              <uploadApplicationForm.InstitutionInfoForm forms={forms} />
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
              onClick={(e) => {
                if (activeStep === 0) {
                  checkUniversityEmpty(e);
                } else if (activeStep === 1) {
                  checkProgramEmpty(e);
                } else if (activeStep === 2) {
                  checkResultEmpty(e);
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
