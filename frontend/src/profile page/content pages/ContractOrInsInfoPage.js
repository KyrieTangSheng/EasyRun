import React from "react";
import { Stack, TextField } from "@mui/material";
import StudentHomepageServices from "../../services/studentHomepage";
import Table from "../../components/Table";

// Contract Page / Institution Information Page
export default function ContractOrInsInfoPage(props) {
  // Set Institution Data for Instructor Homepage
  let institutionData = null;
  if (localStorage.userType === "instructor") {
    institutionData = JSON.parse(localStorage.institutionData);
  }

  // Table columns and rows for contracts
  // Set Contract Data for Student Homepage
  const [contractData, setContractData] = React.useState([]);
  const contractColumns = [
    { field: "status", headerName: "Status", width: 100 },
    { field: "institutionName", headerName: "Institution Name", width: 140 },
    { field: "content", headerName: "Content", width: 100 },
    { field: "instructorName", headerName: "Instructor Name", width: 140 },
    { field: "instructorEmail", headerName: "Instructor Email", width: 240 },
    {
      field: "instructorPhoneNumber",
      headerName: "Instructor Phone",
      width: 130,
    },
    { field: "updateDateTime", headerName: "Update Time", width: 155 },
  ];

  React.useEffect(() => {
    // get contract info
    if (localStorage.userType === "student") {
      const studentId = JSON.parse(localStorage.userInfo).id;
      StudentHomepageServices.GetContract(studentId)
        .then((response) => response.json())
        .then((result) => {
          console.log(result.data);
          setContractData(JSON.parse(result.data));
        });
    }
  }, [setContractData]);

  // student need to render a table for the contract
  if (props.userType === "student") {
    return (
      <Table
        columns={contractColumns}
        rows={contractData}
        height={380}
        PageSize={5}
        tableType="contract"
      />
    );
  }
  // Instructor directly get institution information
  else {
    return (
      <React.Fragment>
        <Stack direction="row" sx={{ position: "flex-start", padding: "5px" }}>
          {/* TOEFL/IELTS Field*/}
          <TextField
            value={institutionData.name || ""}
            label="Institution Name"
            margin="normal"
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
          />
        </Stack>
        <Stack direction="row" sx={{ position: "flex-start", padding: "5px" }}>
          <TextField
            value={institutionData.url || ""}
            label="Insitution URL"
            margin="normal"
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
          />
        </Stack>
        <Stack direction="row" justifyContent="space-around">
          <TextField
            value={institutionData.description || ""}
            label="Insitution URL Description"
            multiline
            rows={6}
            margin="normal"
            variant="filled"
            style={{ width: "98%" }}
          />
        </Stack>
      </React.Fragment>
    );
  }
}
