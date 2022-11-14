import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function Table(props) {
  const [pageSize, setPageSize] = React.useState(props.PageSize);

  return (
      <Box sx={{ height: props.height, width: "100%" }}>
        <DataGrid
          sx={{ m: 2, height: props.height }}
          columns={props.columns}
          rows={props.rows}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          components={{
            Toolbar: GridToolbar,
          }}
          loading={props.rows.length===0}
        />
      </Box>
  );
}
