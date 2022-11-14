import React from "react";
import InstitutionServices from "../services/institutions";
import Table from "../components/Table";
import { Typography } from "@mui/material";

export default function Institution() {
  let name = "all";

  const myColumns = [
    { field: "id", headerName: "Institution ID", width: 150 },
    { field: "name", headerName: "Institution Name", width: 400 },
  ];

  const [myRows, setMyRows] = React.useState([]);

  React.useEffect(() => {
    InstitutionServices.ListInstitutions(name)
      .then((response) => response.json())
      .then((result) => {
        const data = JSON.parse(result.data);
        setMyRows(data);
      });
  }, [name]);

  return (
    <React.Fragment>
    <Typography>
      You can double click on the institution row to see specific institution
      information.
    </Typography>
    <Table
      columns={myColumns}
      rows={myRows}
      height={575}
      PageSize={10}
      tableType="institution"
    ></Table>
  </React.Fragment>
  );
}
