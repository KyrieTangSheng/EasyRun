import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import InstitutionServices from "../services/institutions";

export default function PostComment(props) {
  const setShowAlert = props.setShowAlert;
  const setUpdate = props.setUpdate;
  const [value, setValue] = useState("");
  const [error, setError] = useState({ status: false, msg: "" });

  const handleValue = (e) => {
    e.preventDefault();
    let newError = { status: false, msg: "" };
    let comment = e.target.value;
    setError(newError);
    setValue(comment);
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    let studentId = JSON.parse(localStorage.userInfo).id;
    let ratingId = localStorage.ratingId;
    let parentId = localStorage.parentId
    let msg = { studentId, ratingId, parentId, content: value };
    if (value === "") {
      let newError = { status: true, msg: "Comment cannot be empty." };
      setError(newError);
    } else {
      InstitutionServices.PostComment(msg)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === 1) {
            setShowAlert(true);
            setUpdate(true)
            props.setSeverity("success");
            props.setAlertMsg(
              "Comment posted success. Close the window to see the update."
            );
            //console.log(result);
          } else {
            props.setSeverity("error");
            props.setAlertMsg("some error occurs.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setValue("");
    }
  };

  React.useEffect(() => {
    setShowAlert(false);
    setUpdate(false)
  }, [setShowAlert, setUpdate]);

  return (
    <React.Fragment>
      <Box sx={{ width: "100%" }}>
        <TextField
          sx={{ width: 350, mt: "5px" }}
          value={value}
          fullWidth
          label="Write your review here..."
          id="comment"
          multiline
          rows={4}
          onChange={handleValue}
          error={error.status}
          helperText={error.msg}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          pt: 1.5,
        }}
        spacing={2}
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <br></br>
        <Button
          size="small"
          endIcon={<SendIcon />}
          variant="outlined"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Post
        </Button>
      </Box>
    </React.Fragment>
  );
}
