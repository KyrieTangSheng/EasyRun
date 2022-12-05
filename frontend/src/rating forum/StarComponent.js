import React from "react";
import GradeIcon from "@mui/icons-material/Grade";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import { pink } from "@mui/material/colors";


export default function StarComponent(props) {
    const output = [];
    for (let i = 0; i < props.star; i++) {
      output.push(
        <GradeIcon key={i} fontSize="small" sx={{ color: pink[500] }}></GradeIcon>
      );
    }
  
    return <Grid container>{output}</Grid>;
  }