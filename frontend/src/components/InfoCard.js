import React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import ExploreIcon from "@mui/icons-material/Explore";
import { Checkbox } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import ProgramServices from "../services/programs";
import Radar from "./Radar";

// student can star program in detailed page
const handleStarChange = (programId, star, object, setObject) => {
  let studentId = JSON.parse(localStorage.userInfo).id;

  ProgramServices.StarProgram(studentId, programId, !star)
    .then((response) => response.json())
    .then((result) => {
      if (result.status !== 1) {
        window.alert("Failed to star / cancel star due to some error.");
      } else {
        setObject({ ...object, star: !star });
      }
    });
};

export default function InfoCard(props) {
  const [object, setObject] = React.useState(
    props.object || { universityName: "", name: "", id: "" }
  );

  return (
    <Card variant="outlined" sx={{ width: 370 }}>
      {/* Title 1 */}
      <Typography level="h1" sx={{ mb: 0.5, fontSize: "18pt" }}>
        {props.cardType === "program"
          ? object.name + " " + object.id
          : object.name}
      </Typography>

      {/* Title 2 */}
      <Typography level="body2">
        {props.cardType === "program"
          ? object.universityName
          : props.cardType === "university"
          ? "rank: " + object.rank
          : "description: " + object.description}
      </Typography>

      {/* Top right Icon */}
      {props.cardType === "program" && localStorage.userType === "student" ? (
        <Checkbox
          sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
          icon={<FavoriteBorderIcon />}
          indeterminateIcon={<LoyaltyIcon />}
          checkedIcon={<FavoriteSharpIcon style={{ color: "pink" }} />}
          checked={object.star}
          onChange={() => {
            handleStarChange(object.id, object.star, object, setObject);
          }}
        />
      ) : (
        <React.Fragment>
          {/* <Typography>test</Typography> */}
          <IconButton
            aria-label="bookmark Bahamas Islands"
            variant="plain"
            color="neutral"
            size="sm"
            sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
          >
            <ExploreIcon size="lg" />
          </IconButton>
        </React.Fragment>
      )}

      {/* Radar or Image */}
      {props.cardType === "institution" ? (
        <Box sx={{ ml: "70px" }}>
          <Radar object={object}></Radar>
        </Box>
      ) : (
        <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
          <img
            src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
            srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      )}

      {/* Body */}
      <Box sx={{ display: "flex" }}>
        <div>
          <Typography level="body3">
            {props.cardType === "university" ? "" : "URL"}
          </Typography>
          <Typography sx={{ fontSize: "10pt" }}>
            {props.cardType === "university"
              ? "Detailed information not available in this version right now. Please wait for the updates."
              : object.url}
          </Typography>
        </div>
      </Box>
    </Card>
  );
}
