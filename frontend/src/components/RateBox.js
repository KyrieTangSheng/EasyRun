import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Typography from "@mui/material/Typography";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "red",
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
  return (
    <Box
      sx={{
        "& > legend": {
          mt: 1,
          display: "flex",
          alignItems: "center",
          width: 200,
        },
      }}
    >
      <Typography component="legend">{props.criteria}</Typography>
      <Box sx={{ display: "flex", flexDirection: "row", mt: 1 }}>
        <StyledRating
          name="customized-color"
          value={props.value}
          getLabelText={getLabelText}
          precision={0.5}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          onChange={(event, newValue) => {
            props.setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
        {props.value !== null && (
          <Box sx={{ ml: 4, mt: 0.2 }}>
            {labels[hover !== -1 ? hover : props.value]}
          </Box>
        )}
      </Box>
    </Box>
  );
}
