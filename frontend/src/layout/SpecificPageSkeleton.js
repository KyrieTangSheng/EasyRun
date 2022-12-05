import React from "react";
import { Box, Typography } from "@mui/material";

export default function PageSkeleton(props) {
  return (
    <React.Fragment>
      {/* Info Card */}
      <Box
        sx={{
          position: "absolute",
          top: props.type === "institution" ? "12%" : "30%",
          left: "7.5%",
          width: 400,
          height: props.type === "institution" ? 300 : 400,
          // backgroundColor: "green"
        }}
      >
        <props.InfoCard />
      </Box>

      {/* Staff Table for institution only */}
      <Box
        sx={{
          position: "absolute",
          top: "60%",
          width: 600,
          height: 250,
          backgroundColor: props.type === "institution" ? undefined : undefined,
        }}
      >
        <Typography>{props.type === "institution" ? "Staffs" : ""}</Typography>
        {props.type === "institution" ? <props.Table1 /> : <React.Fragment />}
      </Box>

      {/* Programs for U || Applications for P || Forum for I */}
      <Box
        sx={{
          position: "absolute",
          top: props.type === "institution" ? "5%" : "10%",
          left: "43%",
          width: 780,
          height: props.type === "institution" ? 450 : 500,
        }}
      >
        <Typography>
          {props.type === "program"
            ? "Program Application Result"
            : props.type === "university"
            ? "Master Programs"
            : "Insitution Rates and Reviews"}
        </Typography>
        {<props.Table2 />}
      </Box>

      {/* Success Application for I */}
      <Box
        sx={{
          position: "absolute",
          left: "45%",
          top: "65%",
          width: 780,
          height: 200,
          backgroundColor: props.type === "institution" ? undefined : undefined,
        }}
      >
        <Typography>{props.type === "institution" ? "Offers" : ""}</Typography>
        {props.type === "institution" && <props.Table3 />}
      </Box>
    </React.Fragment>
  );
}
