import React from "react";
import ProgramServices from "../services/programs";
import StudentHomepageServices from "../services/studentHomepage";
import Table from "../components/Table";
import { Checkbox, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import LoyaltyIcon from "@mui/icons-material/Loyalty";

export default function Program(props) {
  const programName = "all";
  const universityName = "all";

  // Check if it is for student star page or specific university page
  const checkStar = props.checkStar || false;
  const checkUniversity = props.universityName || false;

  // for table init
  const [tableRows, setTableRows] = React.useState([]);
  const tableColumns = [
    {
      field: "star",
      headerName: "Star",
      width: 100,
      // If not student type user logged in, the user cannot star the program
      hide: !(localStorage.isLoggedIn && localStorage.userType === "student"),
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
    { field: "name", headerName: "Program Name", width: checkStar ? 207 : 400 },
    {
      field: "universityName",
      headerName: "University Name",
      width: checkStar ? 206 : 400,
      hide: checkUniversity,
    },
  ];

  const handleStarChange = (clickedRow) => {
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
            if (result.status !== 1) {
              window.alert("Failed to star / cancel star due to some error.");
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
  };

  React.useEffect(() => {
    let userID = -1;
    if (
      // only student can star programs
      Boolean(localStorage.isLoggedIn) === true &&
      localStorage.userType === "student"
    ) {
      userID = JSON.parse(localStorage.userInfo).id;
    } else {
      userID = -1;
    }

    // retrieve programs from back-end
    if (checkStar === false && checkUniversity === false) {
      console.log('test1')
      // for program view page
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
        });
    } else if (checkStar === true) {
      console.log('test2')
      // for student starred program view page
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
        });
    }
  }, [setTableRows, checkStar, checkUniversity]);

  return (
    <React.Fragment>
      {checkStar ? (
        <React.Fragment />
      ) : checkUniversity ? (
        ""
      ) : (
        <React.Fragment>
          {" "}
          <Typography>
            You can double click on the program name to see specific program
            information,
          </Typography>
          <Typography>
            or double click on the university name to see specific university
            information.
          </Typography>{" "}
        </React.Fragment>
      )}
      <Table
        columns={tableColumns}
        rows={checkUniversity? props.content : tableRows}
        height={checkStar ? 380 : checkUniversity? 540 : 575}
        PageSize={checkStar ? 5 : 10}
        tableType={checkUniversity? "specificUniversityPrograms" : "program"}
      ></Table>
    </React.Fragment>
  );
}
