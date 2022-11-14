import React from "react";
import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Alerting(props) {
  //console.log(props.showAlert)
  return (
    <React.Fragment>
      {props.showAlert ? (
        <Collapse in={props.showAlert}>
          <Alert
            severity={props.severity}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  props.setShowAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {props.msg}
          </Alert>
        </Collapse>
      ) : (
        <React.Fragment />
      )}
    </React.Fragment>
  );
}
