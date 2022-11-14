import React from "react";
import { Stack, TextField } from "@mui/material";
import InstructorHomepageServices from "../../services/instructorHomepage";
import StudentHomepageServices from "../../services/studentHomepage";
import Table from "../../components/Table";

// Contract Page / Institution Information Page
export default function ContractOrInsInfoPage(props) {
  // Set Institution Data for Instructor Homepage
  const [institutionData, setInstitutionData] = React.useState({});

  // Table columns and rows for contracts
  // Set Contract Data for Student Homepage
  const [contractData, setContractData] = React.useState([]);
  const contractColumns = [
    { field: "status", headerName: "Status", width: 100 },
    { field: "institution", headerName: "Institution Name", width: 140 },
    { field: "instructor", headerName: "Instructor Name", width: 140 },
    { field: "content", headerName: "Content", width: 100 },
    { field: "updateDateTime", headerName: "Update Time", width: 155 },
  ];

  React.useEffect(() => {
    // get Ins. info
    if (localStorage.userType === "instructor") {
      const instructorId = JSON.parse(localStorage.userInfo).id;
      InstructorHomepageServices.ViewInstitutionInfo(instructorId)
        .then((response) => response.json())
        .then((result) => {
          setInstitutionData(JSON.parse(result.data));
        });
    }
    // get contract info
    else {
      const studentId = JSON.parse(localStorage.userInfo).id;
      StudentHomepageServices.GetContract(studentId)
        .then((response) => response.json())
        .then((result) => {
          setContractData(JSON.parse(result.data));
        });
    }
  }, []);
  console.log(contractData);

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
  } else {
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
