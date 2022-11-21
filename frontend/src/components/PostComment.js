import React,  { useState, useEffect }  from "react";

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import InstitutionServices from "../services/institutions";

export default function PostComment(props){
    const setShowAlert = props.setShowAlert;
    const [value, setValue] = useState("")

    const handleValue = (e) => {
        e.preventDefault();
        let comment = e.target.value;
        setValue(comment);
    };
    let studentId = JSON.parse(localStorage.userInfo).id;
    let ratingId = localStorage.ratingId

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowAlert(true);
        let msg = {studentId, ratingId, content: value};
        console.log(msg);
        InstitutionServices.PostComment(msg)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === 1) {
                    props.setSeverity("success");
                    props.setAlertMsg(
                      "Comment posted success. Close the window to see the update."
                    );
                    console.log(result);
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

    React.useEffect(() => {
        setShowAlert(false);
      }, [setShowAlert]);

    return (
        <div>
            <Box
                sx={{
                // width: 500,
                    maxWidth: '100%',
                }}
            >
            <TextField 
                sx={{ width: 350 }}
                value={value}
                fullWidth
                label="Write your review..."
                id="comment" 
                multiline
                rows={4}
                onChange = {handleValue}
            />
        </Box>
        <Box
            sx={{
                // width: 500,
                    maxWidth: '100%',
                    pt: 1.5
            }}
            spacing={2}
            style = {{display: 'flex', justifyContent: 'flex-end'}}>
            <br></br>
            <Button
                size = "small"
                endIcon =  {<SendIcon />}
                variant="outlined"
                onClick = {(e) => {handleSubmit(e)}}>

                Post
            </Button>
        </Box>

    </div>
    )
}