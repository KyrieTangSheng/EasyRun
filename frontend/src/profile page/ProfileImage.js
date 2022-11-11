import React from 'react'
import {
    Avatar,
    Box,
    IconButton,
    Button,
  } from "@mui/material";

export default function ProfileImage() {
  return (
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
  )
}
