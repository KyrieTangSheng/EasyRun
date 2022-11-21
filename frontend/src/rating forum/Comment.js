import React, { useState } from "react";
import ReactDOM from "react-dom";
import { pink } from "@mui/material/colors";

import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import { Box } from "@mui/material";
import InstitutionServices from "../services/institutions";
import Button from "@mui/material/Button";
import DialogController from "../components/DialogController";
import GradeIcon from "@mui/icons-material/Grade";
import SendIcon from "@mui/icons-material/Send";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import RateInstitution from "../user actions/RateInstitution";
import Alerting from "../components/Alerting";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

function StarComponent(props) {
  const output = [];
  for (let i = 0; i < props.star; i++) {
    output.push(
      <GradeIcon key={i} fontSize="small" sx={{ color: pink[500] }}></GradeIcon>
    );
  }

  return <Grid container>{output}</Grid>;
}

function CommentGrid(props) {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  // dialog functions
  const handleClickOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Paper style={{ padding: `25px ${props.widthPad}px` }}>
      <Grid container wrap="nowrap" spacing={1}>
        <Grid item key={1}>
          <Avatar alt="Remy Sharp" src={imgLink} />
        </Grid>

        <Grid item key={2}>
          <h4 style={{ margin: 0, textAlign: "left" }}>{props.name}</h4>
          {props.rateId && <StarComponent star={props.star}></StarComponent>}

          <p style={{ textAlign: "left" }}>{props.content}</p>
          <p style={{ textAlign: "left", color: "gray" }}>
            posted {props.time}
          </p>
          {props.rateId && (
            <Button
              size="small"
              style={{
                maxWidth: "100px",
                maxHeight: "30px",
                minWidth: "100px",
                minHeight: "30px",
              }}
              variant="outlined"
              onClick={(e) => {
                localStorage.setItem("ratingId", props.rateId);
                handleClickOpenDialog(e);
              }}
            >
              Comment
            </Button>
          )}
          <DialogController
            open={dialogOpen}
            setOpen={setDialogOpen}
            handleClose={handleCloseDialog}
            dialogType={"Comment Others"}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}


export default function Commentbox(props) {
  // const [openRateBox, setOpenRateBox] = React.useState(false);
  // const handleOpenRateBox = (e) => {
  //   e.preventDefault();
  //   setOpenRateBox(true);
  //   console.log("yes");
  // }

  const [Ratings, setRatings] = React.useState([]);
  const [Comments, setComments] = React.useState([]);

  // console.log(localStorage)
  const studentId = JSON.parse(localStorage.userInfo).id;
  React.useEffect(() => {
    InstitutionServices.SpecificInstutionInfo(props.name, studentId)
      .then((response) => response.json())
      .then((result) => {
        let allData = JSON.parse(result.data);
        setRatings(JSON.parse(allData.ratings));
        setComments(JSON.parse(allData.comments));
        // allData.ratings = JSON.parse(allData.ratings)
        // allData.comments = JSON.parse(allData.comments)
        // console.log(ratingData);
        // console.log(commentData);
      });
  }, [props.name, studentId]);

  return (
    <Box
      style={{ padding: 14 }}
      className="App"
      sx={{
        mb: 2,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        overflowY: "scroll",
        height: 350,
        // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
      }}
    >
      {Ratings.map((rating) => (
        <Box key={rating.dateTime.toString()}>
          <CommentGrid
            key={rating.dateTime.toString()}
            widthPad="15"
            name={rating.studentUserName}
            content={rating.review}
            time={rating.dateTime}
            rateId={rating.id}
            star={rating.overallRating}
          />

          {Comments.filter((comment) => comment.ratingId === rating.id).map(
            (com) => (
              <CommentGrid
                key={(com.dateTime + com.content).toString()}
                widthPad="100"
                name={com.studentUserName}
                content={com.content}
                time={com.dateTime}
              />
            )
          )}
        </Box>
      ))}
    </Box>
  );
}

{
  /* <Button
        size = "small"
        style={{maxWidth: '220px', maxHeight: '35px', minWidth: '220px', minHeight: '35px'}}
        endIcon =  {<SendIcon />}
        variant="outlined"
        onClick = {(e) => {
          handleOpenRateBox(e);
          }}>
        Post Your Rating
    </Button>
    <RateDialog
        // selectedValue={selectedValue}
        open={openRateBox}
        // onClose={handleClose}
      /> */
}
