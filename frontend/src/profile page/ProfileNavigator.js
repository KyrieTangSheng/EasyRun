import React from "react";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import StarIcon from "@mui/icons-material/Star";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import EmojiPeopleRoundedIcon from "@mui/icons-material/EmojiPeopleRounded";
import RoomPreferencesRoundedIcon from "@mui/icons-material/RoomPreferencesRounded";

export default function ProfileNavigator(props) {
  const userType = localStorage.userType;
  if (userType === "student") {
    return (
      <Box
        sx={{
          borderRadius: "16px",
          position: "absolute",
          top: 120,
          left: "45%",
          width: 700,
          backgroundColor: "orange",
        }}
      >
        <BottomNavigation
          sx={{
            opacity: 0.8,
            height: 70,
          }}
          showLabels
          value={props.navigatorValue}
          onChange={(event, newValue) => {
            props.setNavigatorValue(newValue);
          }}
        >
          <BottomNavigationAction label="Account" icon={<LibraryBooksIcon />} />
          <BottomNavigationAction
            label="Education"
            icon={<CastForEducationIcon />}
          />
          <BottomNavigationAction label="Stars" icon={<StarIcon />} />
          <BottomNavigationAction
            label="Contract"
            icon={<GavelRoundedIcon />}
          />
        </BottomNavigation>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          borderRadius: "16px",
          position: "absolute",
          top: 120,
          left: "45%",
          width: 700,
          backgroundColor: "orange",
        }}
      >
        <BottomNavigation
          sx={{
            opacity: 0.8,
            height: 70,
          }}
          showLabels
          value={props.navigatorValue}
          onChange={(event, newValue) => {
            props.setNavigatorValue(newValue);
          }}
        >
          <BottomNavigationAction label="Account" icon={<LibraryBooksIcon />} />
          <BottomNavigationAction
            label="Education"
            icon={<CastForEducationIcon />}
          />
          <BottomNavigationAction
            label="Enrolled Students"
            icon={<EmojiPeopleRoundedIcon />}
          />
          <BottomNavigationAction
            label="Ins. Infomation"
            icon={<RoomPreferencesRoundedIcon />}
          />
        </BottomNavigation>
      </Box>
    );
  }
}
