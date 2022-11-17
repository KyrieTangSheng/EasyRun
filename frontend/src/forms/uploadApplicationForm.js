import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ProgramServices from "../services/programs";

const SelectPrograms = (props) => {
  const universityName = "University of California Berkeley";
  const [program, setProgram] = React.useState("");
  //const [university, setUniversity] = React.useState(options[0]);
  const [allPrograms, setAllPrograms] = React.useState([{ label: "" }]);
  //const [allUniversities, setAllUniversities] = React.useState([]);

  React.useEffect(() => {
    ProgramServices.ListPrograms(universityName, "all", 0)
      .then((response) => response.json())
      .then((result) => {
        const data = JSON.parse(result.data);
        const programs = JSON.parse(data.programs); // set program data to rows
        // map table values with star contribute
        setAllPrograms(
          programs.map((x, index) => ({ label: x.name + " " + x.id }))
        );
      });
  }, [setAllPrograms]);

  console.log(program);

  return (
    <Autocomplete
      fullWidth
      disablePortal
      options={allPrograms}
      onChange={(event, newValue) => {
        setProgram(newValue);
      }}
      renderInput={(params) => (
        <TextField
          variant="standard"
          margin="normal"
          {...params}
          label="Select a Program"
        />
      )}
    />
  );
};

const InstitutionInfoForm = (props) => {
  return <div>InstitutionInfoForm</div>;
};

const uploadApplicationForm = {
  SelectPrograms,
  InstitutionInfoForm,
};

export default uploadApplicationForm;
