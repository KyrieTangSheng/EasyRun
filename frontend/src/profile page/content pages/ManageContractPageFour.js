import React from "react";
import { Button } from "@mui/material";
import StudentHomepageServices from "../../services/studentHomepage";
import Table from "../../components/Table";
import InsInfoPage from "./InsInfoPageFour";

// Contract Page / Institution Information Page
export default function PageFour(props) {
  // Set Institution Data for Instructor Homepage
  let institutionData = null;
  let ratings = localStorage.ratings
  let contractD = localStorage.contractData

  // Table columns and rows for contracts
  // Set Contract Data for Student Homepage
  const [contractData, setContractData] = React.useState([]);
  const contractColumns = [
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {
        if (params.row?.status === 2) {
          // choose accept or reject the contract
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
        } else if (params.row?.status === 0) {
          // rate on the institution
          return (
            <Button
              onClick={(e) => {
                e.preventDefault();
                let userName = JSON.parse(localStorage.userInfo).userName;
                localStorage.setItem(
                  "contractInfo",
                  JSON.stringify({
                    institutionId: params.row.institutionId,
                    institutionName: params.row.institutionName,
                    studentId: params.row.studentId,
                    studentUserName: userName,
                  })
                );
                localStorage.setItem(
                  "rating",
                  JSON.stringify(params.row.rating)
                );
                props.handleClickOpenDialog();
                props.handleSetDialogType("Rate Institution");
              }}
            >
              Rate
            </Button>
          );
        } else {
          return "Rejected";
        }
      },
    },
    { field: "rate", headerName: "Your Overall Rate", width: 140 },
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
    // Should keep updating in case of new contract
    // get contract info
    if (localStorage.userType === "student") {
      delete localStorage.ratings;
      const studentId = JSON.parse(localStorage.userInfo).id;
      StudentHomepageServices.GetContract(studentId)
        .then((response) => response.json())
        .then((result) => {
          const data = JSON.parse(result.data);
          const ratings = JSON.parse(data.ratings);
          localStorage.setItem("contractData", data.contracts);
          setContractData(
            JSON.parse(data.contracts).map((x, idx) => ({
              ...x,
              rate:
                x.status === 0
                  ? ratings[idx].overallRating || "Not rated yet"
                  : "Rate Invalid", // check if the institution could be rated
              rating: ratings[idx],
            }))
          );
        });
    }
  }, [setContractData, contractD, ratings]);

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
