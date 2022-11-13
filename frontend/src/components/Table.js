import React from "react";
import { Skeleton, Box, Stack } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const LoadingSkeleton = () => {
  return (
    <React.Fragment>
      {[...Array(9).keys()].map((key, value) => {
        return (
          <Skeleton
            sx={{ height: "10%", margin: "5px" }}
            animation="wave"
            variant="rectangular"
            key={key}
          />
        );
      })}
    </React.Fragment>
  );
};

export default function Table(props) {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Box sx={{ height: 575, width: "100%" }}>
        <DataGrid
          sx={{ m: 2, height: 575 }}
          columns={props.columns}
          rows={props.rows}
          pageSize={20}
          rowsPerPageOptions={[10, 20]}
          disableSelectionOnClick
          components={{
            LoadingOverlay: LoadingSkeleton,
            Toolbar: GridToolbar,
          }}
          loading={props.loading}
        />
      </Box>
    </Stack>
  );
}
