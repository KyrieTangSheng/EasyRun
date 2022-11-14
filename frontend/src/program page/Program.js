import React from "react";
import ProgramServices from "../services/programs";
import StudentHomepageServices from "../services/studentHomepage";
import Table from "../components/Table";
import { Checkbox } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import LoyaltyIcon from "@mui/icons-material/Loyalty";

export default function Program(props) {
  const universityName = "all";
  const programName = "all";
  const checkStar = props.checkStar || false

  // for table init
  const [tableRows, setTableRows] = React.useState([]);
  const tableColumns = [
    {
      field: "star",
      headerName: "Star",
      width: 100,
      // render a Star Icon to star the program
      renderCell: (params) => (
        <Checkbox
          icon={<FavoriteBorderIcon />}
          indeterminateIcon={<LoyaltyIcon />}
          checkedIcon={<FavoriteSharpIcon style={{ color: "pink" }} />}
          checked={params.row?.star}
          onChange={() => {
            handleStarChange(params.row);
          }}
        />
      ),
    },
    { field: "id", headerName: "Program ID", width: 150 },
    { field: "name", headerName: "Program Name", width: 400 },
    { field: "universityName", headerName: "University Name", width: 300 },
  ];

  // for skeleton loading
  const [loading, setLoading] = React.useState(true);

  function handleStarChange(clickedRow) {
    if (localStorage.isLoggedIn) {
      if (localStorage.userType === "student") {
        // only student can star programs
        // Init parameters for the Program Star service
        let studentId = JSON.parse(localStorage.userInfo).id;
        let programId = null;
        let starStatus = null;

        const updatedData = tableRows.map((x) => {
          if (x.rowId === clickedRow.rowId) {
            programId = clickedRow.id;
            starStatus = !clickedRow.star;
            ProgramServices.StarProgram(studentId, programId, starStatus)
              .then((response) => response.json())
              .then((result) => {
                if (result.status!==1){
                  window.alert("Failed to star / cancel star due to some error.")
                }
              });
            return {
              ...x,
              star: !clickedRow.star,
            };
          } else {
            return x;
          }
        });
        setTableRows(updatedData);
      } else {
        // instructor cannot star programs
        window.alert("Instructor cannot star programs");
      }
    } else {
      window.alert("Please login as a student to star the program");
      setTimeout(() => {
        window.location.href = "../login";
      }, 2000);
    }
  }

  React.useEffect(() => {
    let userID = 0;
    if ( // only student can star programs
      Boolean(localStorage.isLoggedIn) === true &&
      localStorage.userType === "student"
    ) {
      userID = JSON.parse(localStorage.userInfo).id;
    } else {
      userID = 0;
    }

    // retrieve programs from back-end

    if (checkStar === false){
      ProgramServices.ListPrograms(universityName, programName, userID)
      .then((response) => response.json())
      .then((result) => {
        const data = JSON.parse(result.data); // program data and school data
        const rows = JSON.parse(data.programs); // set program data to rows
        const starStatus = JSON.parse(data.starStatus); // get star status list
        // map table values with star contribute
        setTableRows(
          rows.map((x, index) => ({
            ...x,
            rowId: index,
            star: starStatus[index],
          }))
        );
        setLoading(false);
      });
    }
    else{
      StudentHomepageServices.ViewStarredPrograms(userID)
      .then((response) => response.json())
      .then((result) => {
        const data = JSON.parse(result.data); // program data and school data
        const rows = JSON.parse(data.programs); // set program data to rows
        const starStatus = JSON.parse(data.starStatus); // get star status list
        // map table values with star contribute
        setTableRows(
          rows.map((x, index) => ({
            ...x,
            rowId: index,
            star: starStatus[index],
          }))
        );
        setLoading(false);
      });
    }
  }, [setTableRows, setLoading, checkStar]);

  return (
    <Table columns={tableColumns} rows={tableRows} loading={loading} height={checkStar? 380 : 575} PageSize={checkStar? 5 : 10}></Table>
  );
}
