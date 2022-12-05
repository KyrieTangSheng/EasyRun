import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import { Box } from "@mui/material";
import InstitutionServices from "../services/institutions";
import CommentGrid from "./CommentGrid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import RateInstitution from "../user actions/RateInstitution";
import Alerting from "../components/Alerting";


export default function Commentbox(props) {

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
            parentId={null}
            star={rating.overallRating}
            type = {"rating"}

          />
          <Box
            sx={{
              mb: 2,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              overflowY: "scroll",
              width: 740,
              height: 200,
              // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
            }}
          >

          {Comments.filter((comment) => comment.ratingId === rating.id).map(
            (com) => (
              <CommentGrid
                key={(com.dateTime + com.content).toString()}
                widthPad="100"
                name={com.studentUserName}
                content={com.content}
                time={com.dateTime}
                rateId={rating.id}
                parentId={com.id}
                type = "comment"/>
            )
          )}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

