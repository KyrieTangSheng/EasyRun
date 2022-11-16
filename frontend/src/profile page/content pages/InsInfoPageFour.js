import React from 'react'
import { Stack, TextField } from "@mui/material";

export default function InsInfoPage(props) {
  return (
    <React.Fragment>
    <Stack direction="row" sx={{ position: "flex-start", padding: "5px" }}>
      {/* TOEFL/IELTS Field*/}
      <TextField
        value={props.institutionData.name || ""}
        label="Institution Name"
        margin="normal"
        variant="filled"
        InputProps={{
          readOnly: true,
        }}
      />
    </Stack>
    <Stack direction="row" sx={{ position: "flex-start", padding: "5px" }}>
      <TextField
        value={props.institutionData.url || ""}
        label="Insitution URL"
        margin="normal"
        variant="filled"
        InputProps={{
          readOnly: true,
        }}
      />
    </Stack>
    <Stack direction="row" justifyContent="space-around">
      <TextField
        value={props.institutionData.description || ""}
        label="Insitution URL Description"
        multiline
        rows={6}
        margin="normal"
        variant="filled"
        style={{ width: "98%" }}
      />
    </Stack>
  </React.Fragment>
  )
}
