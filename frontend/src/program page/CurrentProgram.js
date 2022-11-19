import React from "react";
import SpecificPageSkeleton from "../layout/SpecificPageSkeleton";
import InfoCard from "../components/InfoCard";
import Table from "../components/Table";

export default function CurrentProgram(props) {
  const ApplicationResultColumns = [
    {
      field: "status",
      headerName: "Result",
      width: 80,
      renderCell: (params) => (params.row?.status ? "Offer" : "Reject"),
    },
    { field: "institutionName", headerName: "institution", width: 150 },
    { field: "instructorName", headerName: "instructor", width: 150 },
    {
      field: "underGradSchool",
      headerName: "Undergraduate School",
      width: 200,
    },
    { field: "major", headerName: "Major", width: 200 },
    { field: "overallGPA", headerName: "Overall GPA", width: 90 },
    { field: "majorGPA", headerName: "Major GPA", width: 90 },
    { field: "greScore", headerName: "GRE Score", width: 90 },
    { field: "toeflScore", headerName: "TOEFL Score", width: 120 },
    { field: "researchExp", headerName: "Research Experience", width: 200 },
    { field: "internExp", headerName: "Internship Experience", width: 200 },
  ];

  const ProgramInfoCard = () => {
    return <InfoCard object={props.Object} />;
  };

  const ApplicationTable = () => {
    return (
      <Table
        columns={ApplicationResultColumns}
        rows={props.Content || []}
        height={540}
        PageSize={10}
        tableType={"specificProgramApplications"}
      />
    );
  };


  return (
    <SpecificPageSkeleton
      InfoCard={ProgramInfoCard}
      Table2={ApplicationTable}
      type="program"
    />
  );
}
