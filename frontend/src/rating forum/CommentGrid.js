import React, { useState } from "react";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import StarComponent from "./StarComponent";
import DialogController from "../components/DialogController";
import Button from "@mui/material/Button";


const imgLink =
  "https://play-lh.googleusercontent.com/EotxkWC4dXajaesh2iVgdIB5-o6pINoas_k-z7nVjRGSu4k9QZwMZIcRNXyUWGn3rg";

export default function CommentGrid(props) {
    const [dialogOpen, setDialogOpen] = React.useState(false);
  
    // dialog functions
    const handleClickOpenDialog = () => {
      setDialogOpen(true);
    };
  
    const handleCloseDialog = () => {
      setDialogOpen(false);
    };
  
    return (
      <Paper style={{ padding: `25px ${props.widthPad}px` }}>
        <Grid container wrap="nowrap" spacing={1}>
          <Grid item key={1}>
            <Avatar alt="Remy Sharp" src={imgLink} />
          </Grid>
          <Grid item key={2}>
            <h4 style={{ margin: 0, textAlign: "left" }}>{props.name}</h4>
            {props.type === "rating" && <StarComponent star={props.star}></StarComponent>}
  
            <p style={{ textAlign: "left" }}>{props.content}</p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted {props.time}
            </p>
              <Button
                size="small"
                style={{
                  maxWidth: "100px",
                  maxHeight: "30px",
                  minWidth: "100px",
                  minHeight: "30px",
                }}
                variant="outlined"
                onClick={(e) => {
                  localStorage.setItem("ratingId", props.rateId);
                  localStorage.setItem("parentId", props.parentId);
                  handleClickOpenDialog(e);
                }}
              >
                Comment
              </Button>
            <DialogController
              open={dialogOpen}
              setOpen={setDialogOpen}
              handleClose={handleCloseDialog}
              dialogType={"Comment Others"}
            />
          </Grid>
        </Grid>
      </Paper>
    );
  }
