import React from "react";
import SearchCards from "../components/SearchCards";
import BusinessIcon from "@mui/icons-material/Business";
import SchoolIcon from "@mui/icons-material/School";
import Grid from "@mui/material/Grid";

export default function Defualt() {
  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12} sm={3}>
        <SearchCards
          header="Institutions"
          body="click to search intermediate institutions"
          intro="This section collected intermediate institutions. 
                    We'll show you a list of institutions, and each institution
                    with its rating from their enrolled students."
          icon={<BusinessIcon />}
          page="../institutions"
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <SearchCards
          left="35%"
          header="Master Programs"
          body="click to search master programs"
          intro="This section collected master programs. We'll
                    show you a list of master programs, and you can specify 
                    some keywords for mapping."
          icon={<SchoolIcon />}
          page="../programs"
        />
      </Grid>
    </Grid>
  );
}
