const rootURL = "http://localhost:8080/applicationResult/";

const GetUniversities = () => {
  return fetch(rootURL + "program/all", {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
    },
  });
};

const GetProgramsByUniversity = (universityName) => {
  return fetch(rootURL + "program/" + universityName + "/all", {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
    },
  });
};

const GetInstitutions = () => {
  return fetch(rootURL + "personalInfo", {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
    },
  });
};

const UpLoadApplicationResult = (resultInfo) => {
  return fetch(rootURL + "personalInfo", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resultInfo),
  });
};

const ApplicationServices = {
  GetUniversities,
  GetProgramsByUniversity,
  GetInstitutions,
  UpLoadApplicationResult,
};

export default ApplicationServices;
