const rootURL = "http://localhost:8080/programs/";

const ListPrograms = (schoolName, programName, userID) => {
  return fetch(rootURL + schoolName + "/" + programName + "/" + userID, {
    method: "GET",
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

const ViewSpecificUniversity = (universityId) => {
  return fetch(rootURL + "specificSchool/" + universityId, {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
    },
  });
};

const ViewSpecificProgram = (programId, studentId) => {
  return fetch(rootURL + "specificProgram/" + programId + "/" + studentId, {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
    },
  });
};

const ProgramServices = {
  ListPrograms,
  StarProgram,
  ViewSpecificUniversity,
  ViewSpecificProgram
};

export default ProgramServices;
