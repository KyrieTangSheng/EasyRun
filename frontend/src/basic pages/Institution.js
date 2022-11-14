import React from "react";
import InstitutionServices from "../services/institutions";
import Table from "../components/Table";

export default function Institution() {
  let name = "all";

  const myColumns = [
    { field: "id", headerName: "Institution ID", width: 150 },
    { field: "name", headerName: "Institution Name", width: 400 },
  ];

  const [myRows, setMyRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    InstitutionServices.ListInstitutions(name)
      .then((response) => response.json())
      .then((result) => {
        const data = JSON.parse(result.data);
        setMyRows(data);
        setLoading(false);
      });
  }, [name]);

  return (
    <Table
      columns={myColumns}
      rows={myRows}
      loading={loading}
    ></Table>
  );
}
