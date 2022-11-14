const rootURL = "http://localhost:8080/programs/";

const ListPrograms = (schoolName, programName, userID) => {
  return fetch(rootURL + schoolName + "/" + programName + "/" + userID, {
    method: "get",
    mode: "cors",
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
    },
  });
};

const StarProgram = (studentID, programID, starStatus) => {
  const info = {
    studentId: studentID,
    programId: programID,
  };
  if (starStatus === true) {
    return fetch(rootURL + "specificProgram", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json,text/plain,*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
  } else {
    return fetch(rootURL + "specificProgram/cancel", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json,text/plain,*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
  }
};

const ProgramServices = {
  ListPrograms,
  StarProgram,
};

export default ProgramServices;
