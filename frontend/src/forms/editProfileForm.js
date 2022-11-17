import React from "react";
import { TextField } from "@mui/material";

const CommonForm = (props) => {
  return (
    <React.Fragment>
      <TextField
        label="Email"
        type="email"
        disabled
        fullWidth
        variant="standard"
        margin="normal"
        value={props.forms.PAvalues.email || ""}
        onChange={props.forms.handleEmail}
      />
      <TextField
        type="number"
        label="Phone Number"
        variant="standard"
        fullWidth
        margin="normal"
        value={"12345678910"}
      />
      <TextField
        label="User Name"
        fullWidth
        variant="standard"
        margin="normal"
        value={props.forms.PAvalues.userName || ""}
        onChange={props.forms.handleUserName}
      />
      <TextField
        label="First Name"
        fullWidth
        variant="standard"
        margin="normal"
        value={props.forms.PAvalues.firstName || ""}
        onChange={props.forms.handleFirstName}
      />
      <TextField
        label="Last Name"
        fullWidth
        variant="standard"
        margin="normal"
        value={props.forms.PAvalues.lastName || ""}
        onChange={props.forms.handleLastName}
      />
      <TextField
        label="Date of Birth"
        type="date"
        fullWidth
        variant="standard"
        margin="normal"
        value={props.forms.PAvalues.dob || ""}
        onChange={props.forms.handledob}
      />
    </React.Fragment>
  );
};

const StudentEducationForm = (props) => {
  return (
    <React.Fragment>
      <TextField
        label="Undergraduate School"
        fullWidth
        variant="standard"
        margin="normal"
        value={props.forms.PAvalues.underGradSchool || ""}
        onChange={props.forms.handleUndergradSchool}
      />
      <TextField
        label="Major"
        fullWidth
        variant="standard"
        margin="normal"
        value={props.forms.PAvalues.major || ""}
        onChange={props.forms.handleMajor}
      />
      <TextField
        label="Overall GPA"
        fullWidth
        type="number"
        variant="standard"
        margin="normal"
        value={props.forms.PAvalues.overallGPA || ""}
        onChange={props.forms.handleOverallGPA}
      />
      <TextField
        label="Major GPA"
        fullWidth
        type="number"
        variant="standard"
        margin="normal"
        value={props.forms.PAvalues.majorGPA || ""}
        onChange={props.forms.handleMajorGPA}
      />
      <TextField
        label="GRE Score"
        fullWidth
        type="number"
        variant="standard"
        margin="normal"
        value={props.forms.PAvalues.greScore || ""}
        onChange={props.forms.handleGREScore}
        InputProps={{ inputProps: { min: 260, max: 340 } }}
      />
      <TextField
        label="TOEFL / IELTS Score"
        fullWidth
        type="number"
        variant="standard"
        margin="normal"
        value={props.forms.PAvalues.toeflScore || ""}
        onChange={props.forms.handleTOEFLScore}
        InputProps={{ inputProps: { min: 0, max: 120 } }}
      />
      <TextField
        label="Research Experience"
        multiline
        rows={3}
        fullWidth
        variant="standard"
        margin="normal"
        value={props.forms.PAvalues.researchExperience || ""}
        onChange={props.forms.handleResearchExperience}
      />
      <TextField
        label="Internship Experience"
        multiline
        rows={3}
        fullWidth
        variant="standard"
        margin="normal"
        value={props.forms.PAvalues.internshipExperience || ""}
        onChange={props.forms.handleInternshipExperience}
      />
    </React.Fragment>
  );
};

const InstructorEducationForm = (props) => {
  return (
    <React.Fragment>
      <TextField
        label="Education Experience"
        multiline
        rows={6}
        fullWidth
        variant="standard"
        margin="normal"
        value={props.forms.PAvalues.educationExperience || ""}
        onChange={props.forms.handleEducationExperience}
      />
    </React.Fragment>
  );
};

const editProfileForm = {
  CommonForm,
  StudentEducationForm,
  InstructorEducationForm,
};

export default editProfileForm;
