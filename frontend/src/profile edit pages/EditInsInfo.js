import React from "react";
import { TextField, Button, Box } from "@mui/material";
import InstructorHomepageServices from "../services/instructorHomepage";

export default function EditInsInfo(props) {
  let insData = JSON.parse(localStorage.institutionData);

  const [institutionData, setInstitutionData] = React.useState({
    id: insData.id,
    name: insData.name,
    url: insData.url,
    verificationCode: "",
    description: insData.description,
  });


  const setShowAlert = props.setShowAlert

  const handleURL = (e) => {
    e.preventDefault();
    let URL = e.target.value;
    setInstitutionData({ ...institutionData, url: URL });
  };

  const handleVerificationCode = (e) => {
    e.preventDefault();
    let verificationCode = e.target.value;
    setInstitutionData({
      ...institutionData,
      verificationCode: verificationCode,
    });
  };

  const handleDescription = (e) => {
    e.preventDefault();
    let description = e.target.value;
    setInstitutionData({ ...institutionData, description: description });
  };

  const handleSubmit = (e) => {
    setShowAlert(true);
    InstructorHomepageServices.UpdateInstitutionInfo(institutionData)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 1) {
          localStorage.setItem("institutionData", result.data);
          props.setSeverity("success");
          props.setAlertMsg(
            "Change Institution Information Success. Close the window to see the updates."
          );
        } else {
          props.setSeverity("error");
          props.setAlertMsg(
            "Change Institution Information fail. Verification code inconsistent."
          );
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
    <React.Fragment>
      {/* Ins Info */}
      <React.Fragment>
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
          required
          value={institutionData.verificationCode}
          label="Verification Code"
          variant="standard"
          margin="normal"
          onChange={handleVerificationCode}
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
      </React.Fragment>

      {/* Submit Button */}
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button onClick={handleSubmit}>Submit</Button>
      </Box>
    </React.Fragment>
  );
}
