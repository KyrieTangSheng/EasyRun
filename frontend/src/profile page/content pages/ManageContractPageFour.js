import React from "react";
import { Button } from "@mui/material";
import StudentHomepageServices from "../../services/studentHomepage";
import Table from "../../components/Table";
import InsInfoPage from "./InsInfoPage";

// Contract Page / Institution Information Page
export default function PageFour(props) {
  // Set Institution Data for Instructor Homepage
  let institutionData = null;

  // Table columns and rows for contracts
  // Set Contract Data for Student Homepage
  let controlContractData = localStorage.contractData // control the data update
  const [contractData, setContractData] = React.useState([]);
  const contractColumns = [
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {
        if (params.row?.status === "inProcess") {
          return (
            <Button
              onClick={() => {
                localStorage.setItem(
                  "contractInfo",
                  JSON.stringify({
                    id: params.row.id,
                    studentId: params.row.studentId,
                  })
                );
                props.handleClickOpenDialog();
                props.handleSetDialogType("Sign Contract");
              }}
            >
              Sign
            </Button>
          );
        }
      },
    },
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
            localStorage.setItem("contractData", result.data);
            setContractData(JSON.parse(result.data));
          });
    }
  }, [setContractData, controlContractData]);

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

  // instructor gets the institution information page
  else {
    institutionData = JSON.parse(localStorage.institutionData);
    return <InsInfoPage institutionData={institutionData} />;
  }
}