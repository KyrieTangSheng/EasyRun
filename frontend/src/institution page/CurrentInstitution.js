import React from "react";
import SpecificPageSkeleton from "../layout/SpecificPageSkeleton";
import InfoCard from "../components/InfoCard";
import Table from "../components/Table";
import Typography from "@mui/joy/Typography";

export default function Currentnstitution(props) {
  let specific = props.specific;
  console.log(specific);

  const OfferColumns = [
    {
      field: "status",
      headerName: "Result",
      width: 80,
      renderCell: (params) => (params.row?.status ? "Offer" : "Reject"),
    },
    { field: "universityName", headerName: "University", width: 200 },
    { field: "programName", headerName: "Program", width: 200 },
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

  const StaffColumns = [
    {
      field: "fullName",
      headerName: "Full name",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    { field: "email", headerName: "Email", width: 150 },
    { field: "phoneNumber", headerName: "Phone Number", width: 150 },
    { field: "educationExperience", headerName: "Education", width: 150 },
  ];

  const ProgramInfoCard = () => {
    return <InfoCard object={props.specific} cardType={"institution"} />;
  };

  const StaffTable = () => {
    return (
      <Table
        columns={StaffColumns}
        rows={props.specific.instructors || []}
        height={300}
        PageSize={5}
        tableType={"specificInstitutionStaffs"}
      />
    );
  };

  const OfferTable = () => {
    return (
      <Table
        columns={OfferColumns}
        rows={props.specific.applications || []}
        height={250}
        PageSize={5}
        tableType={"specificInstitutionOffers"}
      />
    );
  };

  const Test = () => {
    return <Typography></Typography>;
  };

  return (
    <SpecificPageSkeleton
      InfoCard={ProgramInfoCard}
      Table1={StaffTable}
      Table2={Test}
      Table3={OfferTable}
      type="institution"
    />
  );
}
