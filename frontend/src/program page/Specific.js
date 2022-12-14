import React from "react";
import ProgramServices from "../services/programs";
import CurrentProgram from "./CurrentProgram";
import CurrentUniversity from "./CurrentUniversity";

// Specific university Information api call
const GetNewUniversity = (currentId, setSpecificObj, setSpecificContent) => {
  ProgramServices.ViewSpecificUniversity(currentId)
    .then((response) => response.json())
    .then((result) => {
      localStorage.setItem("specificUniversity", result.data);
      let specificUniversity = JSON.parse(result.data).university;
      let programs = JSON.parse(result.data).programs;
      setSpecificObj(JSON.parse(specificUniversity));
      setSpecificContent(JSON.parse(programs));
    })
    .catch((err) => {
      console.log(err);
    });
};

// Specific program Information api call
const GetNewProgram = (
  currentId,
  setSpecificObj,
  setSpecificContent,
  studentId
) => {
  ProgramServices.ViewSpecificProgram(currentId, studentId)
    .then((response) => response.json())
    .then((result) => {
      let data = JSON.parse(result.data);
      let specificProgram = JSON.parse(data.program);
      specificProgram.star = data.starred;
      let applications = specificProgram.applications;
      setSpecificObj(specificProgram);
      setSpecificContent(applications);
      localStorage.setItem("specificProgram", JSON.stringify(specificProgram));
    })
    .catch((err) => {
      console.log(err);
    });
};

export default function Specific(props) {
  // Use localStorage.specificUniversity to store a specific university information
  // If clicked university id equals to localStorage.specificUniversity.id equals to
  // props.specific.id, then just use localstorage information

  const specificType = props.type; // university or program
  const [specificObj, setSpecificObj] = React.useState(); // specific university / program
  const [specificContent, setSpecificContent] = React.useState(); // specific programs of University / specific Applications of program

  const currentId = props.specific.id; // get user current click

  React.useEffect(() => {
    // set the information for specific university
    if (specificType === "university") {
      if (localStorage.specificUniversity) {
        //set Specific Info
        let specificUniversity = JSON.parse(
          localStorage.specificUniversity
        ).university;
        let programs = JSON.parse(localStorage.specificUniversity).programs;
        // check if localstorage university is the university that the user clicked on
        if (JSON.parse(specificUniversity).id === currentId) {
          setSpecificObj(JSON.parse(specificUniversity));
          setSpecificContent(JSON.parse(programs));
        } else {
          GetNewUniversity(currentId, setSpecificObj, setSpecificContent);
        }
      } else {
        // If localstorage no specific university data
        GetNewUniversity(currentId, setSpecificObj, setSpecificContent);
      }
    }

    // set the information for specific Program
    else if (specificType === "program") {
      setSpecificObj(props.specific);
      setSpecificContent(props.specific.applications);
      let studentId =
        localStorage.isLoggedIn && localStorage.userType === "student"
          ? JSON.parse(localStorage.userInfo).id
          : 0;

      if (localStorage.specificProgram) {
        //set Specific Info
        let specificProgram = JSON.parse(localStorage.specificProgram);
        let applications = specificProgram.applications;
        // check if localstorage Program is the Program that the user clicked on
        if (specificProgram.id === currentId) {
          setSpecificObj(specificProgram);
          setSpecificContent(applications);
        } else {
          GetNewProgram(
            currentId,
            setSpecificObj,
            setSpecificContent,
            studentId
          );
        }
      } else {
        // If localstorage no specific university data
        GetNewProgram(currentId, setSpecificObj, setSpecificContent, studentId);
      }
    }
  }, [currentId, specificType, props.specific]);

  return specificType === "university" ? (
    <CurrentUniversity Object={specificObj} Content={specificContent} />
  ) : specificType === "program" ? (
    <CurrentProgram Object={specificObj} Content={specificContent} />
  ) : (
    <React.Fragment />
  );
}
