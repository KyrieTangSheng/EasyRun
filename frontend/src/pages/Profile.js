import React from "react";
import {
  Avatar,
  Box,
  IconButton,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import StarIcon from "@mui/icons-material/Star";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";

export default function Profile() {
  localStorage.clear();
  if (localStorage.isLoggedIn) {
    let userInfo = JSON.parse(localStorage.userInfo);
    let userType = localStorage.userType;
    console.log(localStorage.isLoggedIn);
    console.log(userInfo, userType);
  } else {
    //window.location.href='./'
  }
  const [value, setValue] = React.useState(0);

  return (
    <div>
      {/* profile image */}
      <Box
        sx={{
          position: "fixed",
          top: 200,
          left: "8%",
          width: 400,
          height: 400,
        }}
      >
        <Box align="center">
          <IconButton>
            <Avatar alt="Remy Sharp" style={{ height: 350, width: 350 }} />
          </IconButton>
        </Box>
        {/* edit Button */}
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" size="small" style={{ backgroundColor: "rgb(19, 115, 134)" }}>
            Edit Profile Image
          </Button>
        </Box>
      </Box>

      {/* profile navigator */}
      <Box
        sx={{
          borderRadius: "16px",
          position: "fixed",
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
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
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

      {/* profile content */}
      <Box
        sx={{
          position: "fixed",
          top: 220,
          left: "44.9%",
          width: 700,
          height: 400,
        }}
      >
        <Paper
          style={{ height: 400, width: 700, opacity: 0.9, backgroundColor: "#ffe7ba" }}
          variant="outlined"
          elevation={6}
        >
                  {/* edit Button */}
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" size="small" 
          style={{ backgroundColor: "rgb(19, 115, 134)" }}>
            Edit Profile
          </Button>
        </Box>
        </Paper>

      </Box>
    </div>
  );
}
