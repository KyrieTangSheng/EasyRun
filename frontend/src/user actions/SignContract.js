import React from "react";
import { Button, Box } from "@mui/material";
import StudentHomepageServices from "../services/studentHomepage";

export default function SignContract(props) {
  const setShowAlert = props.setShowAlert;
  // use a boolean value to check if the contract status is updated.
  // if updated, need to retrieve the contract data again to show new contract status
  const [updateSuccess, setUpdateSuccess] = React.useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    let contractStatus = e.target.value;
    setShowAlert(true);
    let contractInfo = {
      id: JSON.parse(localStorage.contractInfo).id,
      studentId: JSON.parse(localStorage.contractInfo).studentId,
      status: contractStatus,
    };
    StudentHomepageServices.ChangeContractStatus(contractInfo)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 1) {
          setUpdateSuccess(true);
          props.setSeverity("success");
          props.setAlertMsg(
            `${
              contractStatus === "accepted" ? "Accept" : "Reject"
            } contract success. Refresh the contract page to see the updates`
          );
          delete localStorage.contractInfo;
        }
      })
      .catch((err) => {
        return err;
      });
  };

  // update the contract data table to prevent re-modify 
  React.useEffect(() => {
    delete localStorage.contractData
    if (updateSuccess === true) {
      const studentId = JSON.parse(localStorage.userInfo).id;
      StudentHomepageServices.GetContract(studentId)
        .then((response) => response.json())
        .then((result) => {
          localStorage.setItem("contractData", result.data);
        });
    }
  }, [setShowAlert, updateSuccess]);

  return (
      <Box sx={{ display: "flex", flexDirection: "row", pt: 3 }}>
        <Button
          style={{ backgroundColor: "pink" }}
          size="lg"
          variant="contained"
          value="rejected"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Reject
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button
          style={{ backgroundColor: "green" }}
          variant="contained"
          size="lg"
          value="accepted"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Accept
        </Button>
      </Box>
  );
}
