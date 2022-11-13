import React from "react";
import ProgramServices from "../services/programs";
import Table from "../components/Table";
import { Checkbox } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import LoyaltyIcon from "@mui/icons-material/Loyalty";

export default function Program() {
  const universityName = "all";
  const programName = "all";
  const [tableRows, setTableRows] = React.useState([]);

  function handleStarChange(clickedRow) {
    const updatedData = tableRows.map((x) => {
      if (x.rowId === clickedRow.rowId) {
        return {
          ...x,
          star: !clickedRow.star,
        };
      }
      return x;
    });
    setTableRows(updatedData);
  }

  function hi(){
      if (localStorage.isLoggedIn && localStorage.userType === "student"){
        if (JSON.parse(localStorage.userInfo).id){
          return true
        }
        else{
          return false
        }
      }
      else{
        return false
      }
  }

  function getstarStatus(clickedRow){
    return clickedRow.star
  }

  const tableColumns = [
    { field: "id", headerName: "Program ID", width: 150 },
    { field: "name", headerName: "Program Name", width: 400 },
    { field: "universityName", headerName: "University Name", width: 300 },
    {
      field: "star",
      headerName: "Star",
      width: 100,
      // render a Star Icon to star the program
      renderCell: (params) => (
        <Checkbox
          icon={<FavoriteBorderIcon />}
          indeterminateIcon={<LoyaltyIcon />}
          checkedIcon={<FavoriteSharpIcon style={{color:"pink"}}/>}
          checked={params.row?.star}
          onChange={() => {handleStarChange(params.row);}}
        />
      ),
    },
  ];

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    ProgramServices.ListPrograms(universityName, programName)
      .then((response) => response.json())
      .then((result) => {
        const data = JSON.parse(result.data);
        const rows = JSON.parse(data.programs);
        // map table values with star contribute
        setTableRows(
          rows.map((x, index) => ({
            ...x,
            rowId: index,
            star: false
          }))
        );
        setLoading(false);
      });
  }, []);

  return (
    <Table columns={tableColumns} rows={tableRows} loading={loading}></Table>
  );
}
