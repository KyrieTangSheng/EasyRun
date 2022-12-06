import React from "react";
import { Box } from "@mui/material";
import InstitutionServices from "../services/institutions";
import CommentGrid from "./CommentGrid";

export default function Commentbox(props) {
  const [Ratings, setRatings] = React.useState([]);
  const [Comments, setComments] = React.useState([]);
  const [update, setUpdate] = React.useState(false);

  // console.log(localStorage)
  const studentId = localStorage.isLoggedIn
    ? JSON.parse(localStorage.userInfo).id
    : 0;

  React.useEffect(() => {
    InstitutionServices.SpecificInstutionInfo(props.name, studentId)
      .then((response) => response.json())
      .then((result) => {
        let allData = JSON.parse(result.data);
        //console.log(allData);
        setRatings(JSON.parse(allData.ratings));
        setComments(JSON.parse(allData.comments));
      });
  }, [props.name, studentId, update]);

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
            type={"rating"}
            setUpdate={setUpdate}
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
                  parentUserName={com.parentUserName}
                  type="comment"
                  setUpdate={setUpdate}
                />
              )
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
