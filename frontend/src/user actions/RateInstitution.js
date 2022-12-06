import React from "react";
import RateBox from "../components/RateBox";
import { TextField, Box, Button } from "@mui/material";
import InstitutionServices from "../services/institutions";

export default function RateInstitution(props) {
  const setShowAlert = props.setShowAlert;
  // use a boolean value to check if the contract status is updated.
  // if updated, need to retrieve the contract data again to show new contract status
  const [updateSuccess, setUpdateSuccess] = React.useState(false);

  let contractInfo = JSON.parse(localStorage.contractInfo);
  let rating = JSON.parse(localStorage.rating);
  const [criteria, setCriteria] = React.useState({
    overallRating: rating !== -1 ? rating.overallRating : null,
    criteria1Rating: rating !== -1 ? rating.criteria1Rating : null,
    criteria2Rating: rating !== -1 ? rating.criteria2Rating : null,
    criteria3Rating: rating !== -1 ? rating.criteria3Rating : null,
    criteria4Rating: rating !== -1 ? rating.criteria4Rating : null,
    criteria5Rating: rating !== -1 ? rating.criteria5Rating : null,
    criteria6Rating: rating !== -1 ? rating.criteria6Rating : null,
  });

  const [review, setReview] = React.useState(
    rating !== -1 ? rating.review : ""
  );

  const handleReview = (e) => {
    e.preventDefault();
    let review = e.target.value;
    setReview(review);
  };

  const handleRate = (e) => {
    e.preventDefault();
    setShowAlert(true);
    let rateInfo = null;
    let id = rating.id;
    if (rating !== -1) {
      rateInfo = { ...criteria, ...contractInfo, review, id };
    } else {
      rateInfo = { ...criteria, ...contractInfo, review };
    }
    InstitutionServices.RateIns(rateInfo)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 1) {
          setUpdateSuccess(true);
          props.setSeverity("success");
          props.setAlertMsg(
            "Rate institution success. Close the window to see the update."
          );
        } else {
          console.log(result);
          props.setSeverity("error");
          props.setAlertMsg("some error occurs.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    setShowAlert(false);
  }, [setShowAlert]);

  // update the contract data table to prevent re-modify
  React.useEffect(() => {
    if (updateSuccess === true) {
      localStorage.setItem("ratings", "needs to be updated");
    }
  }, [updateSuccess]);

  //console.log(criteria.overallRating);

  return (
    <React.Fragment>
      {/* Rating Part */}
      {Object.entries(criteria).map(([key]) => {
        return (
          <RateBox
            value={criteria}
            setValue={setCriteria}
            key={key}
            type={key}
          />
        );
      })}

      {/* Review Part */}
      <TextField
        fullWidth
        variant="outlined"
        multiline
        rows={3}
        margin="normal"
        label="Review Your Rating"
        value={review}
        onChange={(e) => {
          handleReview(e);
        }}
      />

      {/* Submit Button */}
      <Box sx={{ display: "flex", flexDirection: "row", pt: 3 }}>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button
          size="lg"
          variant="contained"
          onClick={(e) => {
            handleRate(e);
          }}
        >
          Rate
        </Button>
      </Box>
    </React.Fragment>
  );
}
