import React from "react";
import { TextField, Button, Box } from "@mui/material";
//import InstructorHomepageServices from "../../services/instructorHomepage";

export default function EditInsInfo(props) {
  const [institutionData, setInstitutionData] = React.useState(
    JSON.parse(localStorage.institutionData)
  );
  console.log(institutionData)

  const handleURL = (e) => {
    e.preventDefault();
    let URL = e.target.value;
    setInstitutionData({ ...institutionData, url: URL });
  };

  const handleDescription = (e) => {
    e.preventDefault();
    let description = e.target.value;
    setInstitutionData({ ...institutionData, description: description });
  };

  return (
    <React.Fragment>
      {/* TOEFL/IELTS Field*/}
      <TextField
        fullWidth
        value={institutionData.name || ""}
        disabled
        label="Institution Name"
        variant="standard"
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
      />

      <TextField
        fullWidth
        value={institutionData.url || ""}
        label="Insitution URL"
        variant="standard"
        margin="normal"
        onChange={handleURL}
      />

      <TextField
        fullWidth
        value={institutionData.description || ""}
        label="Insitution URL Description"
        multiline
        rows={6}
        variant="standard"
        margin="normal"
        onChange={handleDescription}
      />

      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button>Submit</Button>
      </Box>
    </React.Fragment>
  );
}
