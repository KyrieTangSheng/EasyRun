import React from "react";
import { Box, Stack } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function Table(props) {
  const [pageSize, setPageSize] = React.useState(props.PageSize);
  const [loading, setLoading] = React.useState(true);
  const NoResultMsg = {
    program: "No program here",
    institution: "No institution here",
    enrolledStudent: "No enrolled student here",
    contract: "No contract here"
  };

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  function handleRowDoubleClick(clickedRow) {
    if (props.tableType === "institution") {
      //window.location.href="./institutions/institution"
      console.log(clickedRow);
    }
  }

  function handleCellDoubleClick(clickedCell) {
    if (props.tableType === "program") {
      if (clickedCell.field === "name") {
        console.log(clickedCell.field);
        //window.location.href="./programs/program"
      } else if (clickedCell.field === "universityName") {
        console.log(clickedCell.field);
        //window.location.href= `./programs/university?`
      }
    }
  }

  return (
    <Box sx={{ height: props.height, width: "100%" }}>
      <DataGrid
        sx={{
          m: 1,
          height: props.height,
          boxShadow: 2,
          border: 2,
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
        columns={props.columns}
        rows={props.rows}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        components={{
          Toolbar: GridToolbar,
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              {NoResultMsg[props.tableType]}
            </Stack>
          ),
        }}
        loading={props.rows.length === 0 && loading}
        onRowDoubleClick={(e) => {
          handleRowDoubleClick(e.row);
        }}
        onCellDoubleClick={(e) => {
          handleCellDoubleClick(e);
        }}
      />
    </Box>
  );
}
