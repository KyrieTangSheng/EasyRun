import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const Selecting = (props) => {
  return (
    <Autocomplete
      key={props.type}
      fullWidth
      disablePortal
      options={props.options}
      onChange={(event, newValue) => {
        event.preventDefault();
        if (newValue === null) {
          //Just give a value to a value to avoid null
          newValue = "";
          props.setInfo("");
        } else {
          if (props.type === "university") { // return university name
            props.setErrors({
              ...props.errors,
              universityError: { status: false, msg: "" },
            });
            props.setInfo(newValue.label);
          } else if (props.type === "program") { // return program id
            props.setErrors({
              ...props.errors,
              programError: { status: false, msg: "" },
            });
            props.setInfo(newValue.id);
          } else if (props.type === "result") { // return application result
            props.setErrors({
              ...props.errors,
              resultError: { status: false, msg: "" },
            });
            props.setInfo(newValue.label === "offer" ? true : false); 
          } else if (props.type === "institution") {
            props.setInfo({
              institutionName: newValue.institutionName,
              instructorName: newValue.instructorName,
            });
          }
        }
      }}
      isOptionEqualToValue={(option, value) => option.label === value.label}
      renderInput={(params) => (
        <TextField
          variant="standard"
          margin="normal"
          {...params}
          label={
            props.type === "university"
              ? "Select a university"
              : props.type === "program"
              ? "Select a program"
              : props.type === "result"
              ? "Select the application result"
              : "Select your signed institution"
          }
          error={
            props.type === "university"
              ? props.errors.universityError.status
              : props.type === "program"
              ? props.errors.programError.status
              : props.type === "result"
              ? props.errors.resultError.status
              : false
          }
          helperText={
            props.type === "university"
              ? props.errors.universityError.msg
              : props.type === "program"
              ? props.errors.programError.msg
              : props.type === "result"
              ? props.errors.resultError.msg
              : "Optional filed. you can click on Next button to skip this step."
          }
        />
      )}
    />
  );
};

const InstitutionInfoForm = (props) => {
  return (
    <TextField
      fullWidth
      value={props.forms.institutionData.institutionName || ""}
      label="Institution Name"
      variant="standard"
      margin="normal"
      InputProps={{
        readOnly: true,
      }}
    />
  );
};

const uploadApplicationForm = {
  Selecting,
  InstitutionInfoForm,
};

export default uploadApplicationForm;
