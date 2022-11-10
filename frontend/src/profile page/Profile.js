import React from "react";
import {
  //Avatar,
  Box,
  Button,
  Paper,
} from "@mui/material";
import ProfileImage from "./ProfileImage";
import ProfileNavigator from "./ProfileNavigator";

export default function Profile(props) {

  if (localStorage.isLoggedIn) {
    let userInfo = JSON.parse(localStorage.userInfo);
    let userType = localStorage.userType;
    console.log(localStorage.isLoggedIn);
    console.log(userInfo, userType);
  } else {
    //window.location.href='./'
  }
  const [navigatorValue, setNavigatorValue] = React.useState(0);
  

  return (
    <div>
      {/* profile image */}
      <ProfileImage />

      {/* profile navigator */}
      <ProfileNavigator navigatorValue={navigatorValue} setNavigatorValue={setNavigatorValue}/>
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
          style={{
            height: 400,
            width: 700,
            opacity: 0.9,
            backgroundColor: "#ffe7ba",
          }}
          variant="outlined"
        >
          {/* edit Button */}
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              size="small"
              style={{ backgroundColor: "rgb(19, 115, 134)" }}
            >
              Edit Profile
            </Button>
          </Box>
        </Paper>
      </Box>

    </div>
  );
}
