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
        props.setInfo(newValue.label);
      }}
      isOptionEqualToValue={(option, value) => option.label === value.label}
      renderInput={(params) => (
        <TextField
          variant="standard"
          margin="normal"
          {...params}
          label={
            props.type === "university"
              ? "Select a University"
              : props.type === "program"
              ? "Select a Program"
              : ""
          }
        />
      )}
    />
  );
};

const InstitutionInfoForm = (props) => {
  return <div>InstitutionInfoForm</div>;
};

const uploadApplicationForm = {
  Selecting,
  InstitutionInfoForm,
};

export default uploadApplicationForm;
