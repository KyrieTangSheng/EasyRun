import React from "react";
import RateBox from "../components/RateBox";
import { TextField, Box, Button } from "@mui/material";
import InstitutionServices from "../services/institutions";

export default function RateInstitution(props) {
  const setShowAlert = props.setShowAlert;

  const [criteria, setCriteria] = React.useState({
    overallRating: null,
    criteria1Rating: null,
    criteria2Rating: null,
    criteria3Rating: null,
    criteria4Rating: null,
    criteria5Rating: null,
    criteria6Rating: null,
  });
  const [review, setReview] = React.useState("");
  const handleReview = (e) => {
    e.preventDefault();
    let review = e.target.value;
    setReview(review);
  };

  const handleRate = (e) => {
    e.preventDefault();
    setShowAlert(true);
    let contractInfo = JSON.parse(localStorage.contractInfo);
    let rateInfo = { ...criteria, ...contractInfo, review };
    InstitutionServices.RateIns(rateInfo)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 1) {
          props.setSeverity("success");
          props.setAlertMsg(
            "Rate institution success. Close the window to see the update."
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
  };

  React.useEffect(() => {
    setShowAlert(false);
  }, [setShowAlert]);

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
