import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Typography from "@mui/material/Typography";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const labels = {
  0.5: "No No No",
  1: "No No",
  1.5: "No",
  2: "Bad",
  2.5: "Hummm",
  3: "OK...",
  3.5: "Not Bad",
  4: "Good",
  4.5: "Nice",
  5: "Strongly Recommend",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function RateBox(props) {
  const [hover, setHover] = React.useState(-1);
  const classes = {
    "icon-1": { color: "red" },
    "icon-2": { color: "coral" },
    "icon-3": { color: "orange" },
    "icon-4": { color: "skyblue" },
    "icon-5": { color: "green" },
  };

  return (
    <Box className={classes.root}>
      <Typography component="legend">
        {props.type === "overallRating"
          ? "Overall Rating"
          : props.type === "criteria1Rating"
          ? "Service Quality"
          : props.type === "criteria2Rating"
          ? "Service Attitude"
          : props.type === "criteria3Rating"
          ? "Interact Frequency"
          : props.type === "criteria4Rating"
          ? "Instructing Style"
          : props.type === "criteria5Rating"
          ? "Price Set"
          : props.type === "criteria6Rating"
          ? "Result Satisfaction"
          : null}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", mt: 1 }}>
        <StyledRating
          classes={{ iconHover: "green" }}
          value={props.value[props.type]}
          getLabelText={getLabelText}
          precision={0.5}
          icon={<ThumbUpIcon fontSize="inherit" />}
          emptyIcon={<ThumbUpOffAltIcon fontSize="inherit" />}
          onChange={(event, newValue) => {
            event.preventDefault();
            if (props.type === "overallRating") {
              props.setValue({ ...props.value, overallRating: newValue });
            } else if (props.type === "criteria1Rating") {
              props.setValue({ ...props.value, criteria1Rating: newValue });
            } else if (props.type === "criteria2Rating") {
              props.setValue({ ...props.value, criteria2Rating: newValue });
            } else if (props.type === "criteria3Rating") {
              props.setValue({ ...props.value, criteria3Rating: newValue });
            } else if (props.type === "criteria4Rating") {
              props.setValue({ ...props.value, criteria4Rating: newValue });
            } else if (props.type === "criteria5Rating") {
              props.setValue({ ...props.value, criteria5Rating: newValue });
            } else if (props.type === "criteria6Rating") {
              props.setValue({ ...props.value, criteria6Rating: newValue });
            }
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
        {props.value !== null && (
          <Box sx={{ ml: 4, mt: 0.2 }}>
            {labels[hover !== -1 ? hover : props.value[props.type]]}
          </Box>
        )}
      </Box>
    </Box>
  );
}
