import React from "react";
import { Box, Stack } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DialogController from "./DialogController";

export default function Table(props) {
  // dialog initiate to open specific pages
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogType, setDialogType] = React.useState("");

  const handleClickOpenDialog = () => {
    setDialogOpen(true);
  };

  function handleSetDialogType(type) {
    setDialogType(type);
  }

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  //-------------------Special Institution/University/Program Page variable init----------------------
  const [specific, setSpecific] = React.useState({ name: "", id: "" });

  //-------------------Table Init-------------------
  const [pageSize, setPageSize] = React.useState(props.PageSize);
  const [loading, setLoading] = React.useState(true);
  const NoResultMsg = {
    //grouped by tableType
    program: "No program available",
    institution: "No institution available",
    enrolledStudent: "No enrolled student available",
    contract: "No contract available",
    specificUniversityPrograms: "No program available",
    specificProgramApplications: "No application result available",
    staffs: "No staff available",
    specificInstitutionOffers: "No offer available",
  };

  // if no data in 3 sec, then throw error message
  setTimeout(() => {
    setLoading(false);
  }, 3000);

  // On institution row click, specific institution dialog would show up
  function handleRowDoubleClick(clickedRow) {
    if (props.tableType === "institution") {
      //window.location.href="./institutions/institution"
      console.log(clickedRow);
    }
  }

  // On program cell click, specific university / program dialog would show up
  function handleCellDoubleClick(clickedCell) {
    if (props.tableType === "program") {
      if (clickedCell.field === "name") {
        handleSetDialogType("Specific Program");
        handleClickOpenDialog();
        setSpecific(clickedCell.row);
      } else if (clickedCell.field === "universityName") {
        handleSetDialogType("Specific University");
        handleClickOpenDialog();
        setSpecific({
          name: clickedCell.formattedValue,
          id: clickedCell.row.universityId,
        });
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

      {/* Dialog Page For click on events*/}
      <DialogController
        open={dialogOpen}
        setOpen={setDialogOpen}
        handleClose={handleCloseDialog}
        dialogType={dialogType}
        specific={specific}
      />
    </Box>
  );
}
